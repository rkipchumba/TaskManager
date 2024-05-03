import axios from 'axios';

const BASE_URL = "https://task.quatrixglobal.com";
 
const taskController = {
  async getTasks(req, res) {   
    try {
      const response = await axios.get(`${BASE_URL}/tasks`, {
        params: req.query
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
  },
  async createTask(req, res) {
    const taskData = req.body;

    try {
      const response = await axios.post(`${BASE_URL}/tasks`, taskData);
      const createdTask = response.data;
      res.json(createdTask);
    } catch (error) { 
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'An error occurred while creating the task' });
    }
  },
  async updateTask(req, res) {
    const { taskId } = req.params;
    const taskData = req.body;

    try {
      const response = await axios.patch(`${BASE_URL}/tasks/${taskId}`, taskData);
      const updatedTask = response.data;
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'An error occurred while updating the task' });
    }
  },
  async startProgress(req, res) {
    const { taskId } = req.params;

    try {
      const response = await axios.post(`${BASE_URL}/tasks/${taskId}/start_progress`);
      const updatedTask = response.data;
      res.json(updatedTask);
    } catch (error) {
      console.error('Error starting task progress:', error);
      res.status(500).json({ error: 'An error occurred while starting task progress' });
    }
  },
  async stopProgress(req, res) {
    const { taskId } = req.params;

    try {
      const response = await axios.post(`${BASE_URL}/tasks/${taskId}/stop_progress`);
      const updatedTask = response.data;
      res.json(updatedTask);
    } catch (error) {
      console.error('Error stopping task progress:', error);
      res.status(500).json({ error: 'An error occurred while stopping task progress' });
    }
  },
  async closeTask(req, res) {
    const { taskId } = req.params;

    try {
      const response = await axios.post(`${BASE_URL}/tasks/${taskId}/close`);
      const updatedTask = response.data;
      res.json(updatedTask);
    } catch (error) {
      console.error('Error closing task:', error);
      res.status(500).json({ error: 'An error occurred while closing the task' });
    }
  },
  async reopenTask(req, res) {
    const { taskId } = req.params;

    try {
      const response = await axios.post(`${BASE_URL}/tasks/${taskId}/reopen`);
      const updatedTask = response.data;
      res.json(updatedTask);
    } catch (error) {
      console.error('Error reopening task:', error);
      res.status(500).json({ error: 'An error occurred while reopening the task' });
    }
  },
  async deleteTask(req, res) {
    const { taskId } = req.params;

    try {
      const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
      const deletedTask = response.data;
      res.json(deletedTask);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'An error occurred while deleting the task' });
    }
  }
};

export default taskController;
