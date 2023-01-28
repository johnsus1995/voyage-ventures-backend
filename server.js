import express from "express";
import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors"
import morgan from "morgan";


dotenv.config()

const app = express();

app.use(morgan("dev"))
app.use(express.json({limit:"30mb",extender:true}))
app.use(express.urlencoded({limit:"30mb",extender:true}))

const connectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
  } catch (error) {
    console.log(error)
  }
}

mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB ");
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB connection lost");
  });


app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(process.env.PORT, () => {
    mongoose.set("strictQuery", false); //bypassed warning
    connectToDb();
  console.log(`Server running on port ${process.env.PORT}`);
});
