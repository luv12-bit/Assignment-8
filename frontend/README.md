# To-Do List Frontend (React)

Welcome to the frontend of our To-Do List app! This part of the project is built with **React** (using Vite) and handles all the user interactions.

## Prerequisites
Before you start, make sure you have:
- **Node.js** installed on your computer.
- The **Backend server** running (see the backend folder for instructions).

## Setup Instructions

1. **Install Dependencies**:
   Open your terminal in this folder and run:
   ```bash
   npm install
   ```
   This installs React, Axios (for API calls), and other needed tools.

2. **Backend Connection**:
   The app is configured to look for the backend at `http://localhost:5000`. Make sure your backend is running on that port!

3. **How to Run**:
   Start the development server with:
   ```bash
   npm run dev
   ```
   The terminal will give you a link (like `http://localhost:5173`). Open it in your browser!

## Expected Features
- **Add Tasks**: Type a title and description and click "Add Task".
- **Validation**: You must enter at least 3 characters for the title.
- **View List**: All your tasks are fetched from the MongoDB database.
- **Search**: Use the search bar to filter your tasks by title in real-time.
- **Toggle Status**: Click the checkbox to mark a task as done. This uses our dedicated `/status` API.
- **Delete**: Click the "Delete" button to remove a task forever.

## How it Works (Data Flow)
1. **App.jsx**: This is our main component. It holds the "state" (the list of tasks).
2. **todoApi.js**: This is a helper file that uses **Axios** to talk to our Node.js server.
3. **Fetching**: When the page loads, `useEffect` triggers `fetchTasks()`, which calls the backend and updates the state.
4. **Console Logs**: I've added `console.log` statements throughout the code. Open your browser's "Developer Tools" (F12) and check the "Console" tab to see the data moving!

## Troubleshooting
- **List is empty?** Check if your backend is running and connected to MongoDB.
- **API Errors?** Make sure you haven't changed the port in the backend without updating it in `todoApi.js`.
