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
    task_priority: '',
    dueDate: ''
  });

  useEffect(() => {
    setFormData({
      subject: taskObj.subject,
      description: taskObj.description,
      task_priority: taskObj.task_priority,
      dueDate: taskObj.due_date
    });
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const updateTaskStatus = async (actionType) => {
    try {
      let updatedTask = taskObj;
      switch (actionType) {
        case 'start':
          await startTaskProgress(taskObj.id);
          updatedTask = { ...taskObj, status_id: 'in_progress' };
          break;
        case 'stop':
          await stopTaskProgress(taskObj.id);
          updatedTask = { ...taskObj, status_id: 'open' };
          break;
        case 'close':
          await closeTask(taskObj.id);
          updatedTask = { ...taskObj, status_id: 'closed' };
          break;
        case 'reopen':
          await reopenTask(taskObj.id);
          updatedTask = { ...taskObj, status_id: 'open' };
          break;
        default:
          break;
      }
      onUpdateTask(updatedTask);
      toggle();
    } catch (error) {
      console.error(`Error ${actionType}ing task:`, error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/tasks/${taskObj.id}`, formData);
      const updatedTask = response.data;
      onUpdateTask(updatedTask);
      toggle();
    } catch (error) {
      console.error('Error updating task:', error);
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
            <label htmlFor='task_priority'>Priority:</label>
            <select
              id='task_priority'
              className='form-control'
              name='task_priority'
              value={formData.task_priority}
              onChange={handleChange}
            >
              <option value='high'>High</option>
              <option value='normal'>Normal</option>
              <option value='low'>Low</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='due_date'>Due Date:</label>
            <input
              type='date'
              id='due_date'
              className='form-control'
              name='due_date'
              value={formData.due_date}
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
        <Button color={taskObj.status_id === 'in_progress' ? 'danger' : 'success'} onClick={() => updateTaskStatus(taskObj.status_id === 'in_progress' ? 'stop' : 'start')}>
          {taskObj.status_id === 'in_progress' ? 'Stop Progress' : 'Start Progress'}
        </Button>
        {taskObj.status_id !== 'closed' && (
          <Button color='warning' onClick={() => updateTaskStatus('close')}>
            Close Task
          </Button>
        )}
        {taskObj.status_id === 'closed' && (
          <Button color='info' onClick={() => updateTaskStatus('reopen')}>
            Reopen Task
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};


export default EditTask;
 