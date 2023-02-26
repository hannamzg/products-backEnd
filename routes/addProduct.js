import express  from "express";
import {addProduct,upload,getProduct,deleteProduct,editProduct,selectProductByCategories,getCategories} from "../controllers/addProduct.js";

const router = express.Router();


router.post("/addProduct",upload.single("image"),addProduct);
router.get("/getProduct",getProduct);
router.delete("/deleteProduct/:id",deleteProduct);
router.put("/editProduct",editProduct)
router.get('/selectProductByCategories/:categories',selectProductByCategories)

export default router;