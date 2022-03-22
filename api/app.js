const express = require('express');

const cors = require('cors');
// router
const { todosRouter } = require('./routes/todo.routes');

// db conexion
const { sequelize } = require('./utils/database');

const app = express();

app.use(express.json());

app.use(cors());

// Endpoints
app.use('/api/v1/todos', todosRouter);

sequelize
  .authenticate()
  .then(() => console.log('database authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running');
});

// Create server Express

// Define endpoint for ToDos
// GET fetch all ToDos
// POST Create new ToDo
// PATCH Update ToDo given an ID
// DELETE Delete ToDo given an ID (destroy or soft delete)

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (utils)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
