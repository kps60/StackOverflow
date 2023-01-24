import express from "express";
import { login, signup } from "../controlers/auth.js";
import { getAllUsers, updateProfile } from "../controlers/Users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

router.get('/getAllUsers', getAllUsers);
router.patch('/update/:id', auth, updateProfile)

export default router;