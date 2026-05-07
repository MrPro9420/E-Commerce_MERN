import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//signup user
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

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        //check user exist with given mail
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found!!" });

        //Compare Password
        const matchPass = await bcrypt.compare(password,user.password);
        if(!matchPass) return res.status(400).json({message:"Invalid User and Password!!"})

        //Generate JWT Tocken
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn : "1d"});

        res.json({
            message : "Login successfully",
            token,
            user:{
                id : user._id,
                name : user.name,
                email : user.email
            }

        })

    } catch (error) {
        res.status(500).json({message : "Server error", error});
    }
}