import { useState, useEffect } from 'react';
import todoApi from './api/todoApi';
import './App.css';

function App() {
  // 1. State management - keeping it simple with basic hooks
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  
  // States for feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // 2. Fetching tasks from the backend
  const fetchTasks = async (query = '') => {
    setLoading(true);
    console.log('--- Fetching Tasks ---');
    try {
      const data = await todoApi.getAllTasks(query);
      console.log('Received data from backend:', data);
      setTasks(data);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // 3. Handling form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation check
    if (title.length < 3) {
      setValidationError('Task title must be at least 3 characters long');
      return;
    }

    console.log('--- Creating New Task ---');
    console.log('Task Data:', { title, description });

    try {
      const newTask = await todoApi.createTask({ title, description });
      console.log('Task created successfully:', newTask);
      
      // Update local state without fetching everything again
      setTasks([newTask, ...tasks]);
      
      // Reset form
      setTitle('');
      setDescription('');
      setValidationError('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // 4. Updating status using the new dedicated API
  const handleToggleStatus = async (id, currentStatus) => {
    console.log(`--- Toggling Status for Task ID: ${id} ---`);
    try {
      const updatedTask = await todoApi.updateStatus(id, !currentStatus);
      console.log('Status updated:', updatedTask);
      
      // Update our local array to reflect the change
      const newTasks = tasks.map(t => t._id === id ? updatedTask : t);
      setTasks(newTasks);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // 5. Deleting a task
  const handleDelete = async (id) => {
    console.log(`--- Deleting Task ID: ${id} ---`);
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await todoApi.deleteTask(id);
      console.log('Task deleted from server');
      
      // Remove from local list
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // 6. Handling search input
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log('Searching for:', value);
    fetchTasks(value); // Trigger search on every keystroke
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      
      {/* Search Section */}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search your tasks..." 
          value={search}
          onChange={onSearchChange}
        />
      </div>

      {/* Form Section */}
      <div className="form-card">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {validationError && <p className="validation-text">{validationError}</p>}
          
          <textarea 
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <button type="submit">Add Task</button>
        </form>
      </div>

      {/* List Section */}
      <div className="list-section">
        {errorMessage && <p className="error-box">{errorMessage}</p>}
        {loading && <p>Loading your tasks...</p>}
        
        {!loading && tasks.length === 0 && <p>No tasks found. Try adding one!</p>}

        <div className="task-items">
          {tasks.map(task => (
            <div key={task._id} className={`task-card ${task.isDone ? 'done' : ''}`}>
              <div className="task-content">
                <input 
                  type="checkbox" 
                  checked={task.isDone} 
                  onChange={() => handleToggleStatus(task._id, task.isDone)}
                />
                <div className="text">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>
              </div>
              <button className="del-btn" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
