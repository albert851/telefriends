import express from "express";
import {
  getAllUsers,
  login,
  register,
  getUser,
  logout,
  getUserById,
  updateConnectionStatus,
} from "./userCtrl";

const router = express.Router();

router
  .get("", getAllUsers)
  .get("/get-user-by-cookie", getUser)
  .get("/logout", logout)
  .get("/:id", getUserById)
  .post("/login", login)
  .post("/register", register)
  .patch("/login/:id", updateConnectionStatus)

export default router;
