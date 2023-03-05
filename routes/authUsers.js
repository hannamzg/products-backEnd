import express from "express";
import { singUp, login, logout } from "../controllers/authUsers.js";
import { upload } from "../controllers/auth.js";

const router = express.Router();

router.post("/singUp", upload.single("image"), singUp);
router.post("/login", login);
router.post("/logOut", logout);

export default router;
