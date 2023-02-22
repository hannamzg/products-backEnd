
import moment from 'moment/moment.js';
import jwt from "jsonwebtoken";
import { con } from "../connect.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
});
  
export const upload = multer({ storage });


export const addProduct=(req,res)=>{
    const token = req.cookies.ProductAccessToken;
    if(!token) return res.status(401).json("not logged in!");

    jwt.verify(token,"secretkey", (err)=>{

        if(err) return res.status(403).json("Token is not valid")

        let imageName;
        if (!req.file) {
         imageName = "1610652621462.jpg";
       }
       else{
         imageName = req.file.filename
       }

        const  q  ="INSERT INTO `products`(`photo`,`name`, `price`,`description`,  `adminId`, `createAt`) VALUES (?)" ;

        const values =[
          "/uploads/" + imageName,
            req.body.name, 
            req.body.price,
            req.body.description,
            //req.body.amount,
            req.body.adminId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]

        con.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("post created")
        })
    })
}























export const getProduct=(req,res)=>{
  const token = req.cookies.ProductAccessToken;
  if(!token) return res.status(401).json("not logged in!");

  jwt.verify(token,"secretkey", (err)=>{

      if(err) return res.status(403).json("Token is not valid")

      const  q  ="SELECT * FROM `products`" ;

      con.query(q,(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
      })

     
  })
}