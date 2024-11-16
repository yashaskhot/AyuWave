import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const generateToken = user =>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn:"15d",
    })
}

export const signup = async(req,res) =>{
    
    const {email,password,name,role,photo,gender} = req.body
    console.log(req.body)
    try {
        let user = null;

        if(role==='patient'){
            user = await User.findOne({email})
        }
        else if(role==='doctor'){
            user = await Doctor.findOne({email})
        }
        if(user){
            return res.status(400).json({message:'User already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        console.log("hashpassword", hashPassword);
        if(role==='patient'){
            user = new User({
                name,
                email,
                password:hashPassword,
                // photo:req.file.buffer,
                // gender,
                role
            }); 
            if (req.file) {
                user.photo = req.file.path;
              }
        }
        if(role==='doctor'){
            user = new Doctor({
                name,
                email,  
                password:hashPassword,
                photo:req.file.buffer,
                gender,
                role
            })
        }
        console.log(user)
        await user.save()
        res.status(200).json({success:true,message:'User successfully created'})
    } 
    catch (err) {
        res.status(500).json({success:false,message:'Internal Server error, Try again'})
    }
};

export const login = async(req,res) =>{

    const {email,password} = req.body

    try {
        let user = null
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})
        
        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }
        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }
        const isPasswordMatch = await bcrypt.compare(
            req.body.password, 
            user.password
            );
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalide credentials"});
        }

        const token = generateToken(user);
        res.cookie('authToken', token, { httpOnly: true, sameSite: 'none' });
        const {password,role,appointments, ...rest} = user._doc

        res
            .status(200)
            .json({status:true, message:"Successfully loged in",token,data:{...rest},role});

    } catch (err) {
        return res.status(500).json({message:"Failed to login"});
    }
};
