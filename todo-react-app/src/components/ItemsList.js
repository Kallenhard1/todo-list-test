import React from 'react';

function ItemsList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="items-list">
      <ul className="items">
        {tasks.map((task, index) => (
          <li key={index} className="item">
            <input type="checkbox" />
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(index, e.target.value)}
            />
            <button className="delete-task" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;