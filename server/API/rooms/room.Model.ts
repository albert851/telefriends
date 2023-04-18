import mongoose from "mongoose";
import Joi from "joi";

const RoomSchema = new mongoose.Schema({
    roomUsers: {
        type: Array,
        require: true,
    }
});

const RoomModel = mongoose.model("room", RoomSchema);

export default RoomModel;