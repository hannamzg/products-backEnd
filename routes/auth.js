import express  from "express";
import { singUp,upload} from "../controllers/auth.js";
import multer from "multer";





const router = express.Router();


/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
});

const upload = multer({ storage }); */





router.post("/singUp",upload.single("image"),singUp);

export default router