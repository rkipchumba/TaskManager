import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000; 

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend application
  optionsSuccessStatus: 200 
}));

const BASE_URL = "https://task.quatrixglobal.com"

// Middleware to parse request body as JSON
app.use(express.json());

// Route to forward GET requests to fetch tasks from the Task API
app.get('/tasks', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      params: req.query // Pass along query parameters from the frontend request
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
});

// Route to handle POST requests to create tasks
app.post('/tasks', async (req, res) => {
  const taskData = req.body; // Task data sent from the client

  try {
    // Make a POST request to create the task on the external API
    const response = await axios.post(`${BASE_URL}/tasks`, taskData);
    const createdTask = response.data; // Created task object from the external API
    res.json(createdTask); // Send the created task object back to the client
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'An error occurred while creating the task' });
  }
});

//  route to handle PATCH requests to update tasks
app.patch('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const taskData = req.body; // Task data sent from the client
  
    try {
      // Make a PATCH request to update the task on the external API
      const response = await axios.patch(`${BASE_URL}/tasks/${taskId}`, taskData);
      const updatedTask = response.data; // Updated task object from the external API
      res.json(updatedTask); // Send the updated task object back to the client
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'An error occurred while updating the task' });
    } 
});

// Route to start a task progress
app.post('/tasks/:taskId/start_progress', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Make a POST request to start the task progress
    const response = await axios.post(`${BASE_URL}/tasks/${taskId}/start_progress`);
    const updatedTask = response.data; // Updated task object from the external API
    res.json(updatedTask); // Send the updated task object back to the client
  } catch (error) {
    console.error('Error starting task progress:', error);
    res.status(500).json({ error: 'An error occurred while starting task progress' });
  }
});

// Route to handle POST requests to stop task progress
app.post('/tasks/:taskId/stop_progress', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Make a POST request to stop the progress of the task on the external API
    const response = await axios.post(`${BASE_URL}/tasks/${taskId}/stop_progress`);
    const updatedTask = response.data; // Updated task object from the external API
    res.json(updatedTask); // Send the updated task object back to the client
  } catch (error) {
    console.error('Error stopping task progress:', error);
    res.status(500).json({ error: 'An error occurred while stopping task progress' });
  }
});

// Route to handle POST requests to close a task
app.post('/tasks/:taskId/close', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Make a POST request to close the task on the external API
    const response = await axios.post(`${BASE_URL}/tasks/${taskId}/close`);
    const updatedTask = response.data; // Updated task object from the external API
    res.json(updatedTask); // Send the updated task object back to the client
  } catch (error) {
    console.error('Error closing task:', error);
    res.status(500).json({ error: 'An error occurred while closing the task' });
  }
});

// Route to handle POST requests to reopen a closed task
app.post('/tasks/:taskId/reopen', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Make a POST request to reopen the closed task on the external API
    const response = await axios.post(`${BASE_URL}/tasks/${taskId}/reopen`);
    const updatedTask = response.data; // Updated task object from the external API
    res.json(updatedTask); // Send the updated task object back to the client
  } catch (error) {
    console.error('Error reopening task:', error);
    res.status(500).json({ error: 'An error occurred while reopening the task' });
  }
}); 

app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    // Make a DELETE request to delete the task on the external API
    const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
    const deletedTask = response.data; // Deleted task object from the external API
    res.json(deletedTask); // Send the deleted task object back to the client
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
});
;';,'

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  