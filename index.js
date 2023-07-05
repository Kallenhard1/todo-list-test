const taskList = document.querySelector('.items-list');
const taskInput = document.querySelector('.input-text');
const addTaskBtn = document.querySelector('.input-button');
const items = JSON.parse(localStorage.getItem('taskList')) || [];

function generateId() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

function addItem(e) {
  e.preventDefault();
  const taskText = taskInput.value;
  const id = generateId();

  const item = {
    done: false,
    id: id,
    title: taskText
  };

  items.push(item);
  localStorage.setItem('taskList', JSON.stringify(items));
  displayItems(items, taskList);
  taskInput.value = '';
}

function editItem(id, title) {
  const newTitle = prompt('Edit the task:', title);
  
  if (newTitle && newTitle.trim() !== '') {
    const taskIndex = items.findIndex((item) => item.id === id);
    if (taskIndex !== -1) {
      items[taskIndex].title = newTitle.trim();
      localStorage.setItem('taskList', JSON.stringify(items));
      displayItems(items, taskList);
    }
  }
}

function deleteItem(id) {
  const taskIndex = items.findIndex((item) => item.id === id);

  if (taskIndex !== -1) {
    items.splice(taskIndex, 1);
    localStorage.setItem('taskList', JSON.stringify(items));
    displayItems(items, taskList);
  }
}

function markCompleted(id) {
  const taskIndex = items.findIndex((item) => item.id === id);

  if (taskIndex !== -1) {
    items[taskIndex].done = !items[taskIndex].done;
    localStorage.setItem('taskList', JSON.stringify(items));
    displayItems(items, taskList);
  }
}

function displayItems(items = [], taskList) {
  taskList.innerHTML = items
    .map(
      (task) => `
    <li>
      <input type="checkbox" data-id="${task.id}" id="habit-${task.id}" ${
        task.done ? 'checked' : ''
      } onchange="markCompleted('${task.id}')"/>
      <label for="habit-${task.id}" ${
        task.done ? 'class="completed"' : ''
      }>${task.title}</label>
      <button onClick="editItem('${task.id}', '${task.title}')" class="edit-task" data-id="${task.id}">Edit</button>
      <button onClick="deleteItem('${task.id}')" class="delete-task" data-id="${task.id}">Delete</button>
    </li>
    `
    )
    .join('');
}

addTaskBtn.addEventListener('click', addItem);
displayItems(items, taskList);