import asyncHandler from "express-async-handler";
import Message from "../models/MessageSchema.js";
import User from "../models/UserSchema.js";
import Chat from "../models/ChatModel.js";
import Doctor from "../models/DoctorSchema.js";
import * as mongoose from 'mongoose';

export const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, data } = req.body;
    console.log(req.body);
  if (!content || !chatId || !data) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.userId,
    content: content,
    chat: chatId,
    image: data,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    const userOrDoctor = req.userId === User._id ? User : Doctor;

    message = await userOrDoctor.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
