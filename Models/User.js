const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // required: [true, 'Please add an Email'],
        minlength: 5,
        maxlength: 100,
        // lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        // required: [true, 'Please add a Password'],
        minlength: 8,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// Generate Token 
UserSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "2h"
        }
    );
}


// User Model
const User = mongoose.model("User", UserSchema);


// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(4).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required()
    });
    return schema.validate();
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate();
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(4).max(100),
        email: Joi.string().trim().min(5).max(100).email(),
        password: Joi.string().trim().min(6)
    });
    return schema.validate();
}

// Validate Change Password
function validateChangePassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate();
}


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateChangePassword
};