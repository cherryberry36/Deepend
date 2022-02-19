import bcrypt from "bcrypt";
import dotenv from "dotenv";
import user from "../models/user.js";
import userverification from "../models/userverification.js";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import pkg from "uuidv4";

dotenv.config()

// let transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS,
//     }
// })

// transporter.verify((error,success)=>{
//     if (error){
//         console.log(error);
//     } else{
//        console.log("Ready for messages") 
//     }
// })
export const signup = async(req,res)=>{
let {fullname, email, phonenumber, password} = req.body;
console.log(req.body)

 fullname = fullname.trim();
 email = email.trim();
 password = password.trim();
 phonenumber = phonenumber.trim();

 if (fullname == "" || email == "" || password == "" || phonenumber == "") {
     res.json({
         status: "failed",
         message: "Empty input fields!"
     });
} else if (!/^[a-zA-Z ]*$/.test(fullname)) {
    res.json({
        status: "failed",
        message: "Invalid name details!"
    });
} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
        status: "failed",
        message: "Invalid email entered!"
    });
} else if (password.length < 8) {
    res.json({
        status: "failed",
        message: "password is too short!"
    });
} else {

    try{
        const existingUser = await user.findOne({email});
        console.log(existingUser)
           if(existingUser) return res.status(404).json({message: "user already exists"})

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await user.create({email, password: hashPassword, fullname, phonenumber});

        res.status(200).json({status: true, message: "user created successfully"});

      } catch(err){
          console.log(err)
        res.status(500).json({message: "something went wrong"})
    }
 }
}


export const login = async(req,res)=>{
    let {email,  password} = req.body;
    console.log(req.body)
    
     email = email.trim();
     password = password.trim();
     
     if (email == "" || password == "") {
         res.json({
             status: "failed",
             message: "Empty input fields!"
         });
} else{
    try{
    const existingUser = await user.findOne({email});
     console.log(existingUser)
    if(!existingUser) return res.status(404).json({message: "user doesn't exist"})

   const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if(!isPasswordCorrect) return res.status(404).json({message: "invalid password"})

   const payload = { id: existingUser._id, email: existingUser.email};

   const token = jwt.sign(payload, process.env.SECRETKEY, {expiresIn:"1h"});

   res.status(200).json({status: true,
                        message: "login successful",
                        details: existingUser,
                        data: {
                            tokens: {
                                token_type:'Bearer ',
                                expiresIn: "3600s",
                                token: token
                            }
                        }
                        });
} catch(err){
    console.log(err)
    res.status(500).json({message: "something  went wrong"})
}
}
}