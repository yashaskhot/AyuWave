import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  weight:{ type: String},
  height: {type : Number},
  medical_conditions: { type: String},
  allergies: { type: String},
  ongoing_medications: { type: String},
  age: { type: Number},
  history: { type: String}, 
  BMI : {type: Number},
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});



export default mongoose.model("User", UserSchema);