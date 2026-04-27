import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const todoApi = {
  getAllTasks: async (search = '') => {
    const response = await axios.get(`${API_URL}?search=${search}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  },

  updateTask: async (id, updateData) => {
    const response = await axios.patch(`${API_URL}/${id}`, updateData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

export default todoApi;
