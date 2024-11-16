import User from '../models/UserSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, messgae: "Successfully updated user", data:updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, messgae: "Failed to updated" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, messgae: "Successfully deleted user" });
    } catch (err) {
        res.status(500).json({ success: false, messgae: "Failed to delete" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id,).select("-password" );
        res.status(200).json({ success: true, messgae: "User found",data:user });
    } catch (err) {
        res.status(404).json({ success: false, messgae: "User does not exist" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, messgae: "Users found",data:users });
    } catch (err) {
        res.status(404).json({ success: false, messgae: "Not found" });
    }
};