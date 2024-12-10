// src/components/TaskList.js
import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            onTaskDeleted(id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const task = tasks.find(t => t._id === id);
            const updatedTask = { ...task, status: 'complete' };
            await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <span>{task.title}</span> - {task.status}
                    <button onClick={() => handleComplete(task._id)}>Complete</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
