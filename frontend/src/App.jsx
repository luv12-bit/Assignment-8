import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Search, Loader2 } from 'lucide-react';
import todoApi from './api/todoApi';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (query = '') => {
    setLoading(true);
    try {
      const data = await todoApi.getAllTasks(query);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchTasks(val);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await todoApi.createTask({ title, description });
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updated = await todoApi.updateTask(id, { isDone: !currentStatus });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await todoApi.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Master</h1>
        <p>Stay organized, stay productive.</p>
      </header>

      <main className="app-content">
        <section className="task-form-card">
          <form onSubmit={addTask}>
            <div className="input-group">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="add-btn">
              <Plus size={20} /> Add Task
            </button>
          </form>
        </section>

        <section className="task-list-section">
          <div className="list-controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="task-count">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loader">
              <Loader2 className="spin" size={40} />
              <p>Loading tasks...</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <p>No tasks found. Start by adding one above!</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div key={task._id} className={`task-item ${task.isDone ? 'completed' : ''}`}>
                    <div className="task-info">
                      <button 
                        className="status-btn"
                        onClick={() => toggleStatus(task._id, task.isDone)}
                      >
                        {task.isDone ? <CheckCircle size={24} className="done-icon" /> : <Circle size={24} />}
                      </button>
                      <div className="text-content">
                        <h3>{task.title}</h3>
                        {task.description && <p>{task.description}</p>}
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
