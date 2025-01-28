
import { triggerAsyncId } from "async_hooks";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                sucess: false,
                message: "Email id is in use."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);




        await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: "Account created Successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password is wrong"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "incorrect Password"
            })
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });




        return res.status(200).cookie("token", token,
            {
                httpOnly: true,
                sameSite: "strict", 
                maxAge: 24 * 60 * 60 * 1000,

            }).json({
                success: true,
                message: `welcome back ${user?.fullName}`
            })


    } catch (error) {
        console.log(error)

    }
}

export const logout = async (_ , res) => {
    try {
        return res.status(200)
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        })
        .json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while logging out"
        });
        
    }
}