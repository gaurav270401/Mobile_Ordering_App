// db.js
import mongoose from "mongoose";

const connection=async (URL)=>{
    
    try {
        await mongoose.connect(URL);
        console.log("Database Connected Succesfully");
    } catch (error) {
        console.log("Error while connecting database",error);
    }
}

export default connection;