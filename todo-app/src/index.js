const express = require('express');
const path = require('path');
const dataset = require('./model/tasks.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', dataset.tasks);
});

app.get('/tasks', (req, res) => {
  res.status(200).json({
    succes: true,
    data: dataset.tasks
  })
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = dataset.tasks.filter((obj) => obj.id === Number(id));

  if (task.length > 0) {
    res.status(200).json({
      succes: true,
      data: task[0]
    })
  } else {
    res.status(400).json({
      succes: false,
      message: `Coud not find the task.`
    })
  }
})

app.post('/tasks', (req, res) => {
  const { id, title } = req.body;
  dataset.tasks.push({
    id: Number(id),
    title: title,
    done: false
  });

  res.status(200).json({
    succes: true,
    message: `succes post task!`
  })
})

app.put('/tasks/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const task = dataset.tasks.filter((obj) => obj.id === Number(id));

  if (task.length > 0) {
    task[0].title = title;

    res.status(200).json({
      succes: true,
      message: `succes updated the task!`
    })
  } else {
    res.status(400).json({
      succes: false,
      message: `Coud not update the task.`
    })
  }
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params

  const task = dataset.tasks.filter((obj) => obj.id === Number(id));

  if(task.length > 0) {
      res.status(200).json({
          success: true,
          message: `succes deleted the task!`
      })
  } else {
      res.status(400).json({
          success: false,
          message: `Coud not delete the task: ${id}.`
      })
  }
  const taskId = dataset.tasks.findIndex((obj) => obj.id === Number(id));
  dataset.tasks.splice(taskId, 1);
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})