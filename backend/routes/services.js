import express from 'express';
import { body } from 'express-validator';
import Service from '../models/Service.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import ErrorResponse from '../utils/errorResponse.js';

const router = express.Router();

/**
 * @desc    Get all active services
 * @route   GET /api/services
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, vehicleType } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (vehicleType && vehicleType !== 'both') filter.vehicleType = { $in: [vehicleType, 'both'] };

    const services = await Service.find(filter).sort({ createdAt: -1 })
    
    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
  
    if (!service) {
      return next(new ErrorResponse('Specified service catalog entry not found', 404));
    }
    
    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Private (Admin)
 */
router.post(
  '/', 
  authenticateToken, 
  authorizeRoles('admin'), 
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Valid protocol name is required'),
    body('price').isNumeric().withMessage('Payload cost must be a numerical value'),
    body('duration').isNumeric().withMessage('Operational duration must be a numerical value'),
    validate
  ], 
  async (req, res, next) => {
    try {
      const service = await Service.create(req.body);

      res.status(201).json({
        success: true,
        message: 'New service protocol established successfully',
        service
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Update existing service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
router.put(
  '/:id', 
  authenticateToken, 
  authorizeRoles('admin'), 
  async (req, res, next) => {
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
          new: true,
          runValidators: true 
        }
      );

      if (!service) {
        return next(new ErrorResponse('Target protocol not found for synchronization', 404));
      }

      res.status(200).json({
        success: true,
        message: 'Protocol synchronization complete',
        service
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Delete service protocol
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
router.delete(
  '/:id', 
  authenticateToken, 
  authorizeRoles('admin'), 
  async (req, res, next) => {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);
      
      if (!service) {
        return next(new ErrorResponse('Target protocol not found for deletion', 404));
      }

      res.status(200).json({ 
        success: true, 
        message: 'Service protocol purged successfully' 
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;