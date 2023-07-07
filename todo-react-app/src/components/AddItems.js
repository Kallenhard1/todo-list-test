import React, { useState } from 'react';
import ItemsList from './ItemsList';

function AddItems() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');

  function addItem() {
    const item = {
      title: query
    };

    setTasks(prevTasks => [...prevTasks, item]);
    console.log(tasks);

    setQuery('');
  }

  return (
    <div className="add-items">
      <ItemsList tasks={tasks} />
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
