import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Homepage from './components/Homepage'
import CreatePost from './components/CreatePost'
import MapView from './components/MapView'
import DisasterInfo from './components/DisasterInfo'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={
                <>
                  <Header />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/create" element={<CreatePost />} />
                      <Route path="/map" element={<MapView />} />
                      <Route path="/info" element={<DisasterInfo />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
