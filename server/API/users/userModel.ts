import mongoose from "mongoose";
import Joi, { boolean } from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    requierd: [true, "user must have email"],
  },
  userName: {
    type: String,
    required: true,
  },
  password: String,
  connected: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string(),
  password: joiPassword
    .string()
    .min(4)
    .max(16)
    .minOfSpecialCharacters(1)
    // .minOfLowercase(1)
    // .minOfUppercase(1)
    // .minOfNumeric(1)
    // .noWhiteSpaces()
    .required(),
  repeatPassword: Joi.ref("password"),
});
