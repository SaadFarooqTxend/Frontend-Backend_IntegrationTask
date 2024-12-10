// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from '../src/components/TaskForm';
import TaskList from '../src/components/TaskList';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleTaskAdded = (task) => {
        setTasks([...tasks, task]);
    };

    const handleTaskDeleted = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList 
                tasks={tasks} 
                onTaskDeleted={handleTaskDeleted} 
                onTaskUpdated={handleTaskUpdated} 
            />
        </div>
    );
};

export default App;
