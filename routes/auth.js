import express  from "express";
import { singUp,upload,login,logout} from "../controllers/auth.js";

const router = express.Router();


router.post("/singUp",upload.single("image"),singUp);
router.post("/login",upload.single("image"),login);
router.post("/logout",logout);

export default router