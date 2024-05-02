import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import axios from 'axios';
import '../App.css';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = async (updatedTaskData) => {
        try {
            // Make a PATCH request to update the task
            const response = await axios.patch(`http://localhost:5000/tasks/${taskObj.id}`, updatedTaskData);
            const updatedTask = response.data; // Updated task object received from the server
            updateListArray(updatedTask, index); // Update the task in the list
        } catch (error) {
            console.error('Error updating task:', error);
            
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            try {
                // Make a DELETE request to delete the task
                await axios.delete(`http://localhost:5000/tasks/${taskObj.id}`);
                deleteTask(index); // Remove the task from the list
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
            <div className="task-holder">
                <span className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px" }}>{taskObj.subject}</span>
                <p className="mt-3">Status: {taskObj.status_id}</p>
                <p>Priority: {taskObj.task_priority}</p>
                {taskObj.due_date && <p>Due Date: {formatDate(taskObj.due_date)}</p>}
                <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
                    <i className="far fa-edit mr-3" style={{ color: colors[index % 5].primaryColor, cursor: "pointer", marginRight: "10px" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={handleDelete}></i>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} onUpdateTask={updateTask} taskObj={taskObj} />
        </div>
    );
};

export default Card;
