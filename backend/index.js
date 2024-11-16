import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";  // Import the cors middleware
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import appointmentRoute from './routes/appointment.js';
import nodemailer from "nodemailer";
import axios from "axios";
import chatRoute from "./routes/chatRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
// import { OpenAIApi, Configuration } from "openai";
// import { Configuration, OpenAIApi } from "openai";
dotenv.config();


const app = express();
const port = process.env.PORT || 8000;


const corsOptions = {
    origin: 'http://localhost:5173',  // Update with your frontend origin
    credentials: true,  // Enable credentials (cookies, authorization headers)
};

app.get('/', (req, res) => {
    res.send("Hello World!");
});

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB connection failed');
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));  // Use the cors middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/book',appointmentRoute);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);

app.get("/api/nearby-hospitals", async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=hospital&key=${process.env.MAPS_KEY}`
        );
        const hospitalResults = response.data.results;
        res.json(hospitalResults);
    } catch (error) {
        console.error("Error fetching nearby hospitals:", error);
        res.status(500).json({ error: "Failed to fetch nearby hospitals" });
    }
});

// Add new routes for fetching nearby pharmacy and schools for disabled
app.get("/api/nearby-pharmacy", async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=garden&key=${process.env.MAPS_KEY}`
        );
        const gardenResults = response.data.results;
        res.json(gardenResults);
    } catch (error) {
        console.error("Error fetching nearby pharmacy:", error);
        res.status(500).json({ error: "Failed to fetch nearby pharmacy" });
    }
});

app.get("/api/nearby-schools-for-disabled", async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=school|university&keyword=disabled&key=${process.env.MAPS_KEY}`
        );
        const schoolResults = response.data.results;
        res.json(schoolResults);
    } catch (error) {
        console.error("Error fetching nearby schools for disabled:", error);
        res.status(500).json({ error: "Failed to fetch nearby schools for disabled" });
    }
});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

app.post('/api/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: 'kaustubh.h.mhatre@gmail.com', // Sender's email address
        to: 'drraren245@gmail.com', // Admin's email address
        subject: subject,
        text: `Email: ${email}\n\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port : ${port}`);
});

