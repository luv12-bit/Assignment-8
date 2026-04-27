import axios from 'axios';

// The base URL for our backend API
const API_URL = 'http://localhost:5000/api/tasks';

const todoApi = {
  // Get all tasks, optionally with a search term
  getAllTasks: async (search = '') => {
    try {
      const response = await axios.get(`${API_URL}?search=${search}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      // We throw a more readable error message
      throw new Error(err.response?.data?.message || 'Server is not responding');
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (err) {
      console.error('Error creating task:', err);
      throw new Error(err.response?.data?.message || 'Could not save the task');
    }
  },

  // Update a task's details (title/description)
  updateTask: async (id, updateData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updateData);
      return response.data;
    } catch (err) {
      console.error('Error updating task:', err);
      throw new Error(err.response?.data?.message || 'Update failed');
    }
  },

  // NEW: Specifically update ONLY the task status
  updateStatus: async (id, isDone) => {
    try {
      // Using the new dedicated endpoint: /api/tasks/:id/status
      const response = await axios.patch(`${API_URL}/${id}/status`, { isDone });
      return response.data;
    } catch (err) {
      console.error('Error updating status:', err);
      throw new Error(err.response?.data?.message || 'Status update failed');
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error deleting task:', err);
      throw new Error(err.response?.data?.message || 'Could not delete the task');
    }
  },
};

export default todoApi;
