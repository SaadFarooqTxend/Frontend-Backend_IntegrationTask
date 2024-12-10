// src/taskRoutes.js
const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

// POST /api/tasks: Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/tasks: Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/tasks/:id: Update task by ID
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/tasks/:id: Delete task by ID
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
