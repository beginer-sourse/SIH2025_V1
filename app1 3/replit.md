# Overview

**DisasterAlert** is a Reddit-like disaster reporting platform for India built with React and Vite. Citizens can view, filter, and interact with disaster reports across the country. The application currently features a fully functional homepage feed displaying static disaster data, with filtering by disaster type, sorting options, and voting capabilities. The platform covers floods, earthquakes, landslides, cyclones, droughts, forest fires, and tsunamis with plans for real-time reporting and interactive mapping.

# Recent Changes (September 14, 2025)

- ✅ **Implemented complete homepage feed** with Reddit-like disaster post display
- ✅ **Added filtering and sorting** functionality (by type, recency, upvotes, severity) 
- ✅ **Created interactive voting system** with upvote/downvote capabilities
- ✅ **Built responsive navigation** with Header component and React Router
- ✅ **Designed disaster post cards** with severity badges, verification status, and media placeholders
- ✅ **Added static disaster data** covering 6 realistic disaster scenarios across India
- ✅ **Configured development server** to run on port 5000 for Replit compatibility

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18.2.0 with functional components and hooks
- **Build Tool**: Vite 5.0.0 for fast development and optimized builds
- **Language**: TypeScript with JSX support for type safety
- **Routing**: React Router DOM 7.9.1 for client-side navigation
- **Styling**: CSS modules with component-specific stylesheets

## Component Structure
- **Header Component**: Navigation bar with logo and main navigation links
- **Homepage Component**: Main dashboard displaying disaster posts with filtering and sorting
- **DisasterPost Component**: Individual post cards showing disaster information
- **MapView Component**: Placeholder for interactive map functionality
- **CreatePost Component**: Form component for user submissions (under development)

## Data Management
- **Static Data**: Currently uses hardcoded disaster data stored in `/src/data/staticData.js`
- **State Management**: Local React state with hooks (useState, useEffect)
- **Data Structure**: Posts include metadata like type, location, severity, coordinates, media attachments, and community engagement metrics

## Design Patterns
- **Component-based Architecture**: Modular components with single responsibilities
- **CSS-in-Files**: Separate CSS files for each component for maintainability
- **Responsive Design**: Mobile-first approach with flexible grid layouts
- **Progressive Enhancement**: Core functionality works without JavaScript

## Development Configuration
- **Hot Module Replacement**: Enabled through Vite for instant updates
- **TypeScript Configuration**: Strict mode enabled with ESNext target
- **Server Configuration**: Development server runs on host 0.0.0.0 port 5000 for Replit compatibility

# External Dependencies

## Core Dependencies
- **react**: ^18.2.0 - Main UI library
- **react-dom**: ^18.2.0 - DOM rendering for React
- **react-router-dom**: ^7.9.1 - Client-side routing and navigation

## Development Dependencies
- **@vitejs/plugin-react**: ^4.2.0 - Vite plugin for React support
- **@types/react**: ^18.2.37 - TypeScript definitions for React
- **@types/react-dom**: ^18.2.15 - TypeScript definitions for React DOM
- **typescript**: ^5.2.2 - TypeScript compiler and language support
- **vite**: ^5.0.0 - Build tool and development server

## Future Integration Points
- **Database**: Prepared for backend integration to replace static data
- **Authentication**: Component structure supports user authentication features
- **Real-time Updates**: Architecture ready for WebSocket or polling integration
- **Geolocation Services**: Coordinate system in place for mapping services
- **Media Upload**: Data structure supports image and video attachments
- **API Integration**: Ready for REST API or GraphQL backend connection