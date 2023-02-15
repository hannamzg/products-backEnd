import { con } from "../connect.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import joi from "joi";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});

export const upload = multer({ storage });

function validateUser(user){
   
  const schema =joi.object({
      name:joi.string().min(2).max(255).required(),
      email:joi.string().min(6).max(1777).required(),
      password:joi.string().min(6).max(1777).required(),
  });

  return schema.validate(user);
}

export const singUp = (req, res) => {
  const q = "SELECT * FROM  admins WHERE email = ?";

  con.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("user already exists!");
    

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let imageName;
     if (!req.file) {
      imageName = "1610652621462.jpg";
    }
    else{
      imageName = req.file.filename
    }
    
    const q = "INSERT INTO `admins` ( `name`, `email`, `password`, `photo`) VALUES (?)";
   
    const values = [
      req.body.name,
      req.body.email,
      hashedPassword,
      "/uploads/" + imageName,
    ];
      
    const {error} = validateUser(req.body);
   

    con.query(q, [values], (err, data) => {
        if (err) return res.status(502).json(err);
        if (error) return res.status(502).json(error.details[0].massage);
        return res.status(200).json("done");
    });
    
  });
};




export const login = (req,res)=>{
  const q = "SELECT * FROM  admins WHERE id = ?";

  con.query(q,[req.body.id],(err,data)=>{

      if(err) return res.status(500).json(err);
      if(data.length=== 0) return res.status(409).json("user not found");

      const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);

      if (!checkPassword)  return res.status(400).json("wrong password username");

      const token  =jwt.sign({id:data[0].id},"secretkey");

     // const {password, ...others} = data[0]

     return res.status(200).json(token);
  })
}