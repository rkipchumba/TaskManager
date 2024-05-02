import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const CreateTask = ({ modal, toggle, onCreateTask }) => {
  const initialFormData = {
    subject: '',
    description: '',
    task_priority: 'normal',
    due_date: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    try {
      // Make a POST request to create the task
      const response = await axios.post('http://localhost:5000/tasks', formData);
      const createdTask = response.data; // Created task object received from the server
      onCreateTask(createdTask); // Call the onCreateTask function with the created task data
      setFormData(initialFormData); // Reset form data to initial empty values
      toggle(); // Close the modal after submitting
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error (e.g., display error message)
    }
  };
 
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
          Create
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
 
export default CreateTask;
