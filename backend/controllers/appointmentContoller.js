import Appointment from '../models/AppointmentSchema.js';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const bookAppointment = async (req, res) => {
  const userId = req.userId;

  const doctorId = req.params.doctorId;

  const doctor = await Doctor.findById(doctorId);
  const ticketPrice = doctor.ticketPrice;

  const { appointmentDate, startTime, endTime } = req.body;

  try {
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      $or: [
        { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gte: startTime } }] },
        { $and: [{ startTime: { $lte: endTime } }, { endTime: { $gte: endTime } }] },
      ],
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'Time slot is already booked. Choose another time slot.' });
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      user: userId,
      ticketPrice,
      appointmentDate,
      startTime,
      endTime,
      status: 'pending',
      isPaid: false,
    });

    const savedAppointment = await newAppointment.save();
    await User.findByIdAndUpdate(userId, { $push: { appointments: savedAppointment._id } });
    await Doctor.findByIdAndUpdate(doctorId, { $push: { appointments: savedAppointment._id } });

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: savedAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to book appointment. Please try again later.' });
  }
};
