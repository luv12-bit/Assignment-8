const Task = require('../models/Task');

class TaskService {
  async getAllTasks(search = '') {
    const query = search 
      ? { title: { $regex: search, $options: 'i' } } 
      : {};
    return await Task.find(query).sort({ createdAt: -1 });
  }

  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async updateTask(id, updateData) {
    return await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new TaskService();
