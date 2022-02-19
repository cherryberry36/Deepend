import mongoose from "mongoose"

const userVerification = mongoose.Schema({
    userId:{
         type: String,
    
     },
     uniqueString:{
        type: String,
        unique: true,
    },
    createdAt:{
        type: Date,   
    },
    expiresAt:{
        type: Date,
    
    }, 
    
})

export default mongoose.model("userVerification", userVerification)