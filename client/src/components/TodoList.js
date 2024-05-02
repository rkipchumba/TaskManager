import React, { useState, useEffect } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card'; 
import axios from 'axios';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const toggle = () => setModal(!modal); 

    useEffect(() => {
        // Fetch tasks from the API when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setTasks(response.data.data); // Assuming the tasks array is nested under 'data' in the response
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const handleCreateTask = (newTask) => {
        setTasks([...tasks, newTask]);
        toggle();
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const updateListArray = (obj, index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = obj;
        setTasks(updatedTasks);
    };

    // Paginate tasks
    const tasksPerPage = 8;
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="header text-center">
                <h1>Task Manager</h1>
                <button className="btn btn-primary mt-2" onClick={toggle}>Create Task</button>
            </div>
            <CreateTask toggle={toggle} modal={modal} onCreateTask={handleCreateTask} />
            <div className="task-container">
                
                {currentTasks.map((task, index) => (
                    <Card
                        key={index}
                        index={index + indexOfFirstTask} // Calculate the task index based on the current page and task index
                        taskObj={task}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                    />
                ))}
            </div>
            <div className="pagination">
                <button className="btn btn-primary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
                <span className="page-number">Page {currentPage} of {totalPages}</span>
                <button className="btn btn-primary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next Page</button>
            </div>
        </>
    );
};

export default TodoList;
