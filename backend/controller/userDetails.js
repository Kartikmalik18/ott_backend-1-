const userModel = require("../models/userModel");
const mongodb = require('mongodb')

const userDetailsController = async(req, res) => {
    try {
        // console.log("UserId", req.userId)

        const user = await userModel.findById(req.userId) 

        // console.log(user)

        res.status(200).json({
            data: user,
            erro: false,
            success: true,
            message: "User details"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};


//Function to update the user
const updateUserDetails = async (req, res) => {
    try {
        const { name, email, profilePic } = req.body;

        if (!name && !email && !profilePic) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already in use!" });
            }
        }

        // Prepare the update object dynamically
        const updatedFields = {};
        if (name) updatedFields.name = name;  
        if (email) updatedFields.email = email;  
        if (profilePic) updatedFields.profilePic = profilePic;  

        const updatedUser = await userModel.findByIdAndUpdate(
            req.userId, 
            { $set: updatedFields },
            { new: true, runValidators: true }              
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Failed to update user' });
        }

        res.status(200).json({ message: 'Data updated successfully', success: true, error: false, user: updatedUser });

    } catch (err) {
        res.status(500).json({ 
            message: err.message || 'An error occurred',
            error: true,
            success: false
        });
    }
};



// Function to delete the user
const deleteUser = async(req, res)=> {

    try {
        // const {userId} = req.body;

        const user = await userModel.findByIdAndDelete(req.userId);
    
        if (user) {
            res.status(200).json({Message: "Account Deleted Successfully"})
        }
    } catch (error) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


module.exports = { userDetailsController, updateUserDetails, deleteUser };