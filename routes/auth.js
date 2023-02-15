import express  from "express";
import { singUp,upload,login} from "../controllers/auth.js";

const router = express.Router();


router.post("/singUp",upload.single("image"),singUp);
router.post("/login",upload.single("image"),login);

export default router