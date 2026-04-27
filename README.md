# Assignment 8: Full-Stack To-Do List Application

A modern, full-stack To-Do List application built with Node.js, Express, MongoDB, and React.

## Features
- **CRUD Operations**: Add, view, complete, and delete tasks.
- **Search**: Real-time search functionality.
- **Modern UI**: Responsive design with glassmorphism aesthetics.
- **API Integration**: Frontend integrated with backend using Axios.
- **Database**: MongoDB integration for persistent storage.

## Project Structure
- `backend/`: Node.js/Express server with Mongoose.
- `frontend/`: React application built with Vite.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one has been provided for you) with your MongoDB URI.
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

## Decisions and Challenges
- **Architecture**: Used the Controller-Service-Routes pattern for clean code separation and maintainability.
- **State Management**: Used React hooks (`useState`, `useEffect`) for simple and effective state handling.
- **UI Design**: Implemented a "Task Master" theme with a premium look and feel to enhance user experience.
- **Challenge**: Integrating the search functionality efficiently. Addressed this by implementing a search query parameter in the backend API.
