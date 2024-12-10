// src/taskModel.js
const mongoose = require('mongoose');

// Task schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'incomplete' },
    createdAt: { type: Date, default: Date.now }
});

// Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
