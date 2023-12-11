const asyncHandler = require('express-async-handler');
const { User, validateChangePassword } = require('../Models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


/**
 * @desc    Get forgot password View
 * @route   /password/forgot-password
 * @method  GET
 * @access  public
*/
module.exports.getForgotPasswordView = asyncHandler((req, res) => {
    res.render('forgot-password');
});


/**
 * @desc    Send Forgot Password Link
 * @route   /password/forgot-password
 * @method  POST
 * @access  public
*/
module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign(
        { email: user.email, id: user.id },
        secret,
        { expiresIn: '10m' }
    );

    const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;


    // Send Email to User to Reset Password  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: "Reset Password",
        // text: `Hello ${user.name}, Please click on the following link to reset your password.\n\n ${link}`
        html: `<div>
                    <h4>Please click on the following link to reset your password.</h4>
                    <p>${link}</p>
                </div>`
    }

    transporter.sendMail(mailOptions, function (error, success) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong." })
        }
        else {
            console.log("Email sent: " + success.response);
            res.render("link-send");
        }
    });
});


/**
 * @desc    Get Reset Password Link
 * @route   /password/reset-password/:userId/:token
 * @method  GET
 * @access  public
*/
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);
        res.render('reset-password', { email: user.email });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error" });
    }
});


/**
 * @desc    Reset The Password 
 * @route   /password/reset-password/:userId/:token
 * @method  POST
 * @access  public
*/
module.exports.resetThePassword = asyncHandler(async (req, res) => {
    // Validate Password
    const { error } = validateChangePassword(req.body);
    if (error) {
        return res.status(400).json({ message: error })
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user.password = req.body.password;
        await user.save();
        res.render("success-password");

    } catch (error) {
        console.log(error);
        res.json({ message: "Error" });
    }
});