import React from 'react';

function ItemsList({ tasks }) {
  return (
      <div className="items-list">
        <ul className="items">
        <div className="items">
          {tasks.map((task, index) => (
            <div key={index} className="item">
              <li>
                <input type="checkbox" />
                <label>{task.title}</label>
                <button className="edit-task">Edit</button>
                <button className="delete-task">Delete</button>
              </li>
            </div>
          ))}
        </div>
        </ul>
      </div>
  );
}

export default ItemsList;