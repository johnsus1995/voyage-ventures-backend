import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const isExistingUser = await userModel.findOne({ email });
    if (isExistingUser) {
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
    console.log(error);
  }
};

export const signin = async (req, res) => {
  // const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email:req.body.email });
    if (!existingUser) {
      return res.status(404).json({ message: "user does not exist" });
    }
    const isPasswordOk = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordOk) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const {password,...rest} = existingUser._doc

    res.status(200).json({ success:true,data: rest, token,  });
  } catch (error) {
    res.status(500).json({ message: "something went wrong with signin" });
    console.log(error);
  }
};
