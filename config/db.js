import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

function connectDatabase(){
return mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},(err,connection) => {
if (err){
    console.log("Database cannot be connected")
    console.log(err)
        } else{
    console.log("Database connected")
              }
    })
}

connectDatabase()
export default connectDatabase