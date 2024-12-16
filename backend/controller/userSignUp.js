const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')

const userSignUpController =async(req, res)=> {
    try {
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})

        if (user) {
            throw new Error("User already Exists.")
        }

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        if (!name) {
            throw new Error("Please provide name")
        }


        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (!hashPassword) {
            throw new Error("Something went Wrong")
        }

        const payload = {
            ...req.body,
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "Registration Successfull!"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController;  