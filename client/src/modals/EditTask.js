import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { 
  startTaskProgress, 
  stopTaskProgress, 
  closeTask, 
  reopenTask 
} from '../services/TaskService';

const EditTask = ({ modal, toggle, onUpdateTask, taskObj }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: '',
    dueDate: ''
  });

  // Update formData whenever taskObj changes
  useEffect(() => {
    setFormData({
      subject: taskObj.subject,
      description: taskObj.description,
      priority: taskObj.priority,
      dueDate: taskObj.dueDate
    });
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async () => {
    try {
      // Make a PATCH request to update the task
      const response = await axios.patch(`http://localhost:5000/tasks/${taskObj.id}`, formData);
      const updatedTask = response.data; // Updated task object received from the server
      onUpdateTask(updatedTask); // Call the onUpdateTask function with the updated task data
      toggle(); // Close the modal after submitting
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error
    }
  };

  const handleStartProgress = async () => {
    try {
      await startTaskProgress(taskObj.id);
      // Call onUpdateTask to refresh task data after starting progress
      onUpdateTask({ ...taskObj, status_id: 'in_progress' });
      toggle(); // Close the modal after starting progress
    } catch (error) {
      console.error('Error starting task progress:', error);
      // Handle error
    }
  };

  const handleStopProgress = async () => {
    try {
      await stopTaskProgress(taskObj.id);
      // Call onUpdateTask to refresh task data after stopping progress
      onUpdateTask({ ...taskObj, status_id: 'open' });
      toggle(); // Close the modal after stopping progress
    } catch (error) {
      console.error('Error stopping task progress:', error);
      // Handle error
    }
  };

  const handleCloseTask = async () => {
    try {
      await closeTask(taskObj.id);
      // Call onUpdateTask to refresh task data after closing the task
      onUpdateTask({ ...taskObj, status_id: 'closed' });
      toggle(); // Close the modal after updating the task
    } catch (error) {
      console.error('Error closing task:', error);
      // Handle error
    }
  };

  const handleReopenTask = async () => {
    try {
      await reopenTask(taskObj.id);
      // Call onUpdateTask to refresh task data after reopening the task
      onUpdateTask({ ...taskObj, status_id: 'open' });
      toggle(); // Close the modal after updating the task
    } catch (error) {
      console.error('Error reopening task:', error);
      // Handle error
    }
  }; 

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <form>
          <div className='form-group'>
            <label htmlFor='subject'>Subject:</label>
            <input
              type='text'
              id='subject'
              className='form-control'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              className='form-control'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='priority'>Priority:</label>
            <select
              id='priority'
              className='form-control'
              name='priority'
              value={formData.priority}
              onChange={handleChange}
            >
              <option value='high'>High</option>
              <option value='normal'>Normal</option>
              <option value='low'>Low</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='dueDate'>Due Date:</label>
            <input
              type='date'
              id='dueDate'
              className='form-control'
              name='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Update
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancel
        </Button>
        {taskObj.status_id === 'in_progress' ? (
          <Button color='danger' onClick={handleStopProgress}>
            Stop Progress
          </Button>
        ) : (
          <Button color='success' onClick={handleStartProgress}>
            Start Progress
          </Button>
        )}
        {taskObj.status_id !== 'closed' && (
          <Button color='warning' onClick={handleCloseTask}>
            Close Task
          </Button>
        )}
        {taskObj.status_id === 'closed' && (
          <Button color='info' onClick={handleReopenTask}>
            Reopen Task
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default EditTask;
 