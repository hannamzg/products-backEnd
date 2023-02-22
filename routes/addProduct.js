import express  from "express";
import {addProduct,upload,getProduct} from "../controllers/addProduct.js";

const router = express.Router();


router.post("/addProduct",upload.single("image"),addProduct);
router.get("/getProduct",getProduct);
export default router