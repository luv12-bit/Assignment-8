const Task = require('../models/Task');

// This service handles all our database interactions using Mongoose
const getAllTasks = async (searchQuery) => {
  // If there's a search term, we use a regex (regular expression) 
  // to find titles that contain that term. 'i' means case-insensitive.
  let query = {};
  if (searchQuery) {
    query = { title: { $regex: searchQuery, $options: 'i' } };
  }
  
  // We sort by createdAt: -1 to show the newest tasks first
  console.log('Fetching tasks with query:', query);
  return await Task.find(query).sort({ createdAt: -1 });
};

const createTask = async (data) => {
  // Just taking the title and description and saving them
  const newTask = new Task(data);
  return await newTask.save();
};

const updateTaskContent = async (id, data) => {
  // This updates the title or description
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

// NEW: Dedicated function for just updating the status
const updateTaskStatus = async (id, isDone) => {
  console.log(`Updating task ${id} status to: ${isDone}`);
  return await Task.findByIdAndUpdate(
    id, 
    { isDone: isDone }, 
    { new: true } // This returns the updated document instead of the old one
  );
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTaskContent,
  updateTaskStatus,
  deleteTask
};
