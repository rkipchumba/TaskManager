import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.patch('/:taskId', taskController.updateTask);
router.post('/:taskId/start_progress', taskController.startProgress);
router.post('/:taskId/stop_progress', taskController.stopProgress);
router.post('/:taskId/close', taskController.closeTask);
router.post('/:taskId/reopen', taskController.reopenTask);
router.delete('/:taskId', taskController.deleteTask);

export default router;
