import { string } from "joi";
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        require: true,
    },
    roomId: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
  
}, {timestamps: true});

const MessageModel = mongoose.model("message", MessageSchema);

export default MessageModel;