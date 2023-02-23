import express  from "express";
import {addProduct,upload,getProduct,deleteProduct} from "../controllers/addProduct.js";

const router = express.Router();


router.post("/addProduct",upload.single("image"),addProduct);
router.get("/getProduct",getProduct);
router.delete("/deleteProduct/:id",deleteProduct);

export default router;