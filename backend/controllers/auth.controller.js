import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(req.body);

        //check user exist with given mail
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User Alredy Exists" });

        //Hash Password
        const hashPass = await bcrypt.hash(password, 12);

        //create user
        const newuser = await User.create({
            name,
            email,
            password: hashPass
        });

        // console.log(newuser);
        res.status(201).json({ message: "User Created Successfully!!!" })

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error })
    }
}