import express from "express";
import { con } from "./connect.js";
import cors from "cors";
import multer from "multer";
import authRoutes from "./routes/auth.js";

const app = express();
const Port = 5000;



/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});

const upload = multer({ storage });
  */


app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api/auth",authRoutes);

/* app.post("/upload", upload.single("image"), (req, res) => {
  const imageName = req.file.filename;
  const q ="INSERT INTO `admins` ( `name`, `email`, `password`, `photo`) VALUES (?)";
  const values = ["hanna", "email@gmail.com", "1233", "/uploads/" + imageName];

  con.query(q, [values], (err, data) => {
    if (err) return res.status(502).json(err);
    return res.status(200).json("http://localhost:5000/uploads/" + imageName);
  });
});  */
 




con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connect to db");
});

app.listen(Port, () => {
  console.log("hanna " + 5000);
});
