import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },],
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: {type: String}
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);