import express  from "express";
import {addProduct,upload} from "../controllers/addProduct.js";

const router = express.Router();


router.post("/addProduct",upload.single("image"),addProduct);

export default router