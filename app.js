import express from "express";
import { con } from "./connect.js";
import cors from "cors";
//import multer from "multer";
import authRoutes from "./routes/auth.js";
import authUsers from "../backEnd/routes/authUsers.js"
import addProduct from "./routes/addProduct.js";
import cookieParser from "cookie-parser";

const app = express();
const Port = 5000;

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials", true)   
  next()
})
 
app.use(express.json());
app.use(express.static("public"));
app.use(cors({
  origin:"http://localhost:3000"
}));

app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api",addProduct);
app.use("/api/authUsers",authUsers);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connect to db");
});

app.listen(Port, () => {
  console.log("hanna " + 5000);
});
