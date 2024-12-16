const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSignInController = async(req, res)=> {

        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error("User not found");
            }

            const checkPassword =  bcrypt.compare(password, user.password);

            if (checkPassword) {
                const tokenData = {
                    _id: user._id,
                    email: user.email,
                };

                // Sign the token
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '8h'});

                // Set the cookie options
                const cookieOptions = {
                    httpOnly: true, 
                    secure: true           
                };

                // Send the cookie with the token
                res.cookie("token", token, {httpOnly: true, sameSite: 'None', secure: true}).json({
                    message: "Login Successfully",
                    data: token,
                    success: true,
                    error: false,
                });
            } else {
                throw new Error("Invalid Credentials");
            }
        } catch (err) {
            res.status(500).json({
                message: err.message || "Internal Server Error",
                error: true,
                success: false,
            });
        }
    }


module.exports = userSignInController