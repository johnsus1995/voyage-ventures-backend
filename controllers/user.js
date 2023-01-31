import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      name: `${first_name} ${last_name}`,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong with signup" });
    //console.log()
    console.log(error);
  }
};
