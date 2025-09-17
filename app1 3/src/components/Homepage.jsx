import { useEffect, useMemo, useState } from 'react';
import DisasterPost from './DisasterPost';
import './Homepage.css';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { disasterTypes, disasterPosts } from '../data/staticData';

export default function Homepage() {
  const [posts, setPosts] = useState(disasterPosts);
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Merge Firestore reports with static posts so both show up
        setPosts(data && data.length > 0 ? [...data, ...disasterPosts] : disasterPosts);
      },
      () => {
        // In case of any Firestore error, fall back to static data
        setPosts(disasterPosts);
      }
    );
    return () => unsub();
  }, []);

  const filteredPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) => {
      if (sortBy === 'recent') return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
      if (sortBy === 'severity') {
        const order = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return (order[b.severity] || 0) - (order[a.severity] || 0);
      }
      return 0;
    });
    return sorted.filter(p => filterType === 'All' || p.type === filterType);
  }, [posts, filterType, sortBy]);

  const handleVote = (postId, voteType) => {
    // Optional: Implement Firestore atomic increment here if needed later
    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p,
      upvotes: voteType === 'up' ? (p.upvotes || 0) + 1 : (p.upvotes || 0),
      downvotes: voteType === 'down' ? (p.downvotes || 0) + 1 : (p.downvotes || 0)
    } : p));
  };

  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="controls">
          <div className="filters">
            <label>Filter by Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All Disasters</option>
              {disasterTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="upvotes">Most Upvoted</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>{posts.length}</h3>
            <p>Active Reports</p>
          </div>
          <div className="stat-card">
            <h3>{posts.filter(p => p.severity === 'High' || p.severity === 'Critical').length}</h3>
            <p>High Severity</p>
          </div>
          <div className="stat-card">
            <h3>{posts.filter(p => p.verified).length}</h3>
            <p>Verified Reports</p>
          </div>
        </div>

        <div className="posts-feed">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <DisasterPost key={post.id} post={post} onVote={handleVote} />
            ))
          ) : (
            <div className="no-posts">
              <p>No disaster reports found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}