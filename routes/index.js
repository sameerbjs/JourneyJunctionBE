import express from "express";
import { authController } from "../controllers/auth.js";
import { travelController } from "../controllers/travel.js";
import { authenticateToken } from "../middleware/authenticateUser.js";

export const router = express.Router();

// testing
router.get("/test", (req, res) => res.json({ msg: "Welcome to our website" }));

// for user login, register, logout
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/update-password/:id", authenticateToken, authController.updatePassword);
router.put("/update-profile-image/:id", authenticateToken, authController.updateProfileImage);
router.put("/update-profile/:id", authenticateToken, authController.updateProfile);

//for travel
router.post("/create-travel", authenticateToken, travelController.createTravel);
router.get("/user-travels/:userId", authenticateToken, travelController.getUserTravel);