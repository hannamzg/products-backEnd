
import moment from 'moment/moment.js';
import jwt from "jsonwebtoken";
import { con } from "../connect.js";
import multer from "multer";
import { json } from 'express';

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

        const  q  ="INSERT INTO `products`(`photo`,`name`, `price`,`description`,  `adminId`, `createAt`,categories) VALUES (?)" ;

        const values =[
          "/uploads/" + imageName,
            req.body.name, 
            req.body.price,
            req.body.description,
            //req.body.amount,
            req.body.adminId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.categories
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

      const  q  ="SELECT * FROM `products`  ORDER BY createAt DESC" ;

      con.query(q,(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
      })
  })
}


export const deleteProduct=(req,res)=>{
  const token = req.cookies.ProductAccessToken;
  if(!token) return res.status(401).json("not logged in!");
 
  jwt.verify(token,"secretkey", (err)=>{ 

      if(err) return res.status(403).json("Token is not valid")
 
      let id =  req.params.id;
      const  q  =`DELETE FROM products WHERE id=? ` ;

      con.query(q,[id],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Product has been deleted");
      })
  }) 
}




export const editProduct=(req,res)=>{
  const token = req.cookies.ProductAccessToken;
  if(!token) return res.status(401).json("not logged in!");
 
  jwt.verify(token,"secretkey", (err)=>{ 
 
    if(err) return res.status(403).json("Token is not valid")
 
      const q = 'UPDATE `products` SET `name`=?,`description`=?,`price`=?,`photo`=?,`categories`=? WHERE id=?' 

      con.query(q,[
          req.body.name,
          req.body.description,
          req.body.price,
          req.body.photo,
          req.body.categories,
          req.body.id
        ]
        ,(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json("its has been")
        }
      )    
   }) 
}
 

export const getProductToProducts=(req,res)=>{
  const  q  ="SELECT * FROM `products`  ORDER BY createAt DESC" ;

  con.query(q,(err,data)=>{
  if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}



export const selectProductByCategories=(req,res)=>{
    let categories =  req.params.categories;
    
    const q = 'SELECT * FROM `products` WHERE categories =? '

    con.query(q,[categories],(err,data)=>{
        if(err) return res.status(500).json(err);
          return res.status(200).json(data)
        }
    )    
   
}


export const getProductById=(req,res)=>{
    let id =  req.params.id;
    
    const q = 'SELECT * FROM `products` WHERE id=? '

    con.query(q,[id],(err,data)=>{
        if(err) return res.status(500).json(err);
          return res.status(200).json(data)
        }
    )    
   
}




export const AddToCart=(req,res)=>{
  const token = req.cookies.UsersToken;
  if(!token) return res.status(401).json("not logged in!");
 
  jwt.verify(token,"secretkey", (err)=>{ 
 
    if(err) return res.status(403).json("Token is not valid")
 
    const  q  ="INSERT INTO `cart`(`userId`,`productId`) VALUES (?)" ;
    const values = [
      req.body.userId,
      req.body.productId
    ];
      con.query(q,[values],(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json("its has been add to your cart")
        }
      )    
   }) 
}



export const getCartProducts=(req,res)=>{
  const token = req.cookies.UsersToken;
  
  if(!token) return res.status(401).json("not logged in!"); 
 
  jwt.verify(token,"secretkey", (err)=>{ 
 
    if(err) return res.status(403).json("Token is not valid") 
   
    const  q  ="SELECT products.*,cart.id AS cartId FROM `products` INNER JOIN cart ON cart.productId = products.id WHERE cart.userId =?" ; 
    con.query(q,[req.params.userId],(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json(data)
        }
    )    
  })  
} 


export const DeleteCartProduct=(req,res)=>{
  const token = req.cookies.UsersToken;
  
  if(!token) return res.status(401).json("not logged in!"); 
  
  jwt.verify(token,"secretkey", (err)=>{ 
    if(err) return res.status(403).json("Token is not valid") 
   
    const  q  ="DELETE FROM `cart` WHERE id=?" ; 
    con.query(q,[req.params.cartId],(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json(data)
        }
    )    
  })  
}


export const searchInput=(req,res)=>{   

  const  q  =`SELECT * FROM products WHERE name LIKE '${req.params.searchValue}%'` ; 

  con.query(q,(err,data)=>{
      if(err) return res.status(500).json(err);
        return res.status(200).json(data)
      }
  )    
   
}




export const addRating=(req,res)=>{
  const token = req.cookies.UsersToken;
  
  if(!token) return res.status(401).json("not logged in!"); 
  
  jwt.verify(token,"secretkey", (err)=>{ 
    if(err) return res.status(403).json("Token is not valid") 
   
    const  q  ="INSERT INTO `rating`( `userId`, `productId`, `theRating`)  VALUES (?)" ; 

    const values = [
      req.body.userId,
      req.body.productId,
      req.body.theRating
    ];

    con.query(q,[values],(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json("thanks for your rating")
        }
    )    
  })  
}


export const getTheRate=(req,res)=>{
  const token = req.cookies.UsersToken;
  
  if(!token) return res.status(401).json("not logged in!"); 
  
  jwt.verify(token,"secretkey", (err)=>{ 
    if(err) return res.status(403).json("Token is not valid") 
   
    const  q  =`SELECT * FROM rating WHERE productId=${req.params.id}` ; 

    con.query(q,(err,data)=>{
          if(err) return res.status(500).json(err);
          return res.status(200).json(data)
        }
    )    
  })  
}
