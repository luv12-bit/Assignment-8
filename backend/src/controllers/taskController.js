const taskService = require('../services/taskService');

// Get all tasks - we check if there's a search query in the URL
const getAllTasks = async (req, res) => {
  try {
    const search = req.query.search || '';
    const tasks = await taskService.getAllTasks(search);
    res.status(200).json(tasks);
  } catch (err) {
    // Keeping error messages simple and direct
    res.status(500).json({ message: 'Could not get tasks from the database' });
  }
};

// Add a new task
const createTask = async (req, res) => {
  try {
    // Basic check: we need at least a title
    if (!req.body.title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create the task' });
  }
};

// Update a task's title or description
const updateTask = async (req, res) => {
  try {
    const updated = await taskService.updateTaskContent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

// NEW: Dedicated function for updating ONLY the status (isDone)
const updateStatus = async (req, res) => {
  try {
    const { isDone } = req.body;
    
    // We expect a boolean value for isDone
    if (typeof isDone !== 'boolean') {
      return res.status(400).json({ message: 'isDone must be true or false' });
    }

    const updated = await taskService.updateTaskStatus(req.params.id, isDone);
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update task status' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete operation failed' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  updateStatus,
  deleteTask
};
