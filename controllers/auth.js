import { con } from "../connect.js";
import bcrypt from "bcryptjs";
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

export const singUp = (req, res) => {
  const q = "SELECT * FROM  admins WHERE email = ?";

  con.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("user already exists!");
    

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('12121221', salt);
    
    const imageName = req.file.filename ? req.file.filename:"1610652621462.jpg";
    const q = "INSERT INTO `admins` ( `name`, `email`, `password`, `photo`) VALUES (?)";

      const values = [
      "hanna",
      "eliasa@xsa.com",
      hashedPassword,
      "/uploads/" + imageName,
      ];
      con.query(q, [values], (err, data) => {
          if (err) return res.status(502).json(err);
          return res.status(200).json("done");
      });
    
  });
};
