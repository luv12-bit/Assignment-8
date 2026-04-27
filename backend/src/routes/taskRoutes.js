const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Standard CRUD routes
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// NEW: Dedicated route for updating task status
// Using /:id/status makes it RESTful and specific
router.patch('/:id/status', taskController.updateStatus);

module.exports = router;
