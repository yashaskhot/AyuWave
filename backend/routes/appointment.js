import { bookAppointment } from "../controllers/appointmentContoller.js";
import { authenticate,restrict } from "../auth/verifyToken.js";
import express from "express";

const router = express.Router({ mergeParams: true })

router
    .route('/')
    .post(authenticate,restrict(['patient']),bookAppointment);

export default router;