import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    message: {
        type: String,
        require: true,
    }
});

const MessageModel = mongoose.model("message", MessageSchema);

export default MessageModel;