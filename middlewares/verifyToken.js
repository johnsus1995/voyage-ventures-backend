import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers["authorization"])
    let headers = req.headers["authorization"]
    let token = headers.split(" ")[1];
    // return

    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
