// GET fetch all ToDos
// POST Create new ToDo
// PATCH Update ToDo given an ID
// DELETE Delete ToDo given an ID (destroy or soft delete)
const { filterObj } = require('../utils/filterObj');

const { Todo } = require('../models/todo.model');

exports.getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        todos: todo
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    const newTodo = await Todo.create({
      content: content
    });

    res.status(201).json({
      status: 'success',
      data: { newTodo }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, 'content');

    const todo = await Todo.findOne({ where: { id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'cant update todo, invalid ID'
      });
      return;
    }
    await todo.update({ ...data });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id: id } });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'cant delete todo, invalid ID'
      });
      return;
    }

    await todo.destroy();

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
