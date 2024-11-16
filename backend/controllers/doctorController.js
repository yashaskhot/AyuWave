import Doctor from '../models/DoctorSchema.js';

export const updateDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, messgae: "Successfully updated Doctor", data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, messgae: "Failed to updated" });
    }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id
    try {
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, messgae: "Successfully deleted Doctor" });
    } catch (err) {
        res.status(500).json({ success: false, messgae: "Failed to delete" });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const doctor = await Doctor.findById(id,)
            .populate("reviews")
            .select("-password");
        res.status(200).json({ success: true, messgae: "Doctor found", data: doctor });
    } catch (err) {
        res.status(404).json({ success: false, messgae: "Doctor does not exist" });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const { query } = req.query
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [{ name: { $regex: query, $options: "i" } },
                { specialization: { $regex: query, $options: "i" } }
                ],
            }).select("-password");
        }
        else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select("-password");
        }
        res.status(200).json({ success: true, messgae: "Doctors found", data: doctors });
    } catch (err) {
        res.status(404).json({ success: false, messgae: "Not found" });
    }
};

export const setTimeSlots = async (req, res) => {
    const { id } = req.params;
    const { timeSlots } = req.body;
  
    try {
      const doctor = await Doctor.findByIdAndUpdate(
        id,
        { $set: { timeSlots } },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Time slots set successfully",
        data: doctor,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to set time slots" });
    }
  };