import React, { useState, useEffect } from 'react';
import ItemsList from './ItemsList';

function AddItems() {
  const storedTasks = localStorage.getItem('taskList');
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);

  function addItem() {
    const item = {
      title: query
    };

    setTasks(prevTasks => [...prevTasks, item]);
    setQuery('');
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  }

  function updateTask(index, updatedTitle) {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = updatedTitle;
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  }

  return (
    <div className="add-items">
      <ItemsList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        name="taskText"
        className="input-text"
        placeholder="Enter a new task"
      />
      <button className="input-button" type="submit" onClick={addItem}>
        + Add
      </button>
    </div>
  );
}

export default AddItems;
