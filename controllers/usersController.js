const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../Models/User');


/**
 * @desc    Get All Users
 * @route   /api/users
 * @method  GET
 * @access  private (only admins)
*/
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select("-password");
    res.status(200).json(users);

});


/**
 * @desc    Get User By Id
 * @route   /api/users/:id
 * @method  GET
 * @access  private (only admins & user himself)
*/
const getUserByID = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" })
    }
});


/**
 * @desc    Update User
 * @route   /api/users/:id
 * @method  PUT
 * @access  private
*/
const updateUser = asyncHandler(async (req, res) => {

    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        }
    }, { new: true }).select("-password");

    res.status(200).json(updateUser);

});


/**
 * @desc    Delete User 
 * @route   /api/users
 * @method  DELETE
 * @access  private (only admins & user himself)
*/
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been Deleted" });
    } else {
        res.status(400).json({ message: "User not found" })
    }
});


module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
}