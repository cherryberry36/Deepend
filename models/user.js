import mongoose from "mongoose"

const user = mongoose.Schema({
     fullname:{
         type: String,
         required: true,
    
     },
     email:{
        type: String,
        required: true,
        unique: true,
    },
    phonenumber:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }, 
    Date:{
        type:Date,
        default:Date.now,
    } ,
    verified: Boolean
})

export default mongoose.model("user", user)