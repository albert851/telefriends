import mongoose from "mongoose";
import Joi from "joi";

const RoomSchema = new mongoose.Schema({
    // roomUsers: {
    //     type: Array,
    //     require: true,
    // }
    userA: String, //user_id
    userB: String //user_id

});

const RoomModel = mongoose.model("room", RoomSchema);

export default RoomModel;