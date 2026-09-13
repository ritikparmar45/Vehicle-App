import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/', authenticateToken, getVehicles);
router.post('/', authenticateToken, addVehicle);
router.put('/:id', authenticateToken, updateVehicle);
router.delete('/:id', authenticateToken, deleteVehicle);

export default router;
