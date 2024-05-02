import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const createTask = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/start_progress`);
    return response.data;
  } catch (error) {
    console.error('Error starting task progress:', error);
    throw error;
  }
};

export const startTaskProgress = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/start_progress`);
    return response.data;
  } catch (error) {
    console.error('Error starting task progress:', error);
    throw error;
  }
};

export const stopTaskProgress = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/stop_progress`);
    return response.data;
  } catch (error) {
    console.error('Error stopping task progress:', error);
    throw error;
  }
};

export const closeTask = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/close`);
    return response.data;
  } catch (error) {
    console.error('Error closing task:', error);
    throw error;
  }
};


export const reopenTask = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/reopen`);
    return response.data;
  } catch (error) {
    console.error('Error reopening task:', error);
    throw error;
  }
};
