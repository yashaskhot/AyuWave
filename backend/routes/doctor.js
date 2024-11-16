import express from 'express';
import { updateDoctor,deleteDoctor,getAllDoctors,getSingleDoctor, setTimeSlots } from "../controllers/doctorController.js";
import { authenticate,restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js';
import appointmentRouter from './appointment.js';

const router = express.Router();

router.use('/:doctorId/reviews',reviewRouter);
router.use('/:doctorId/book',appointmentRouter);
router.get('/:id',getSingleDoctor);
router.get('/',getAllDoctors);
router.put('/:id',authenticate,restrict(["doctor"]),updateDoctor);
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor);
router.put('/settime/:id',authenticate,restrict(["doctor"]),setTimeSlots);

export default router;