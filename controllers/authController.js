const asyncHandler = require('express-async-handler');
const { User, validateRegisterUser, validateLoginUser } = require('../Models/User')
const bcrypt = require('bcryptjs');


// Methods
/**
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
*/
const register = asyncHandler(async (req, res) => {
    // Validate user data
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "Email already registered" })
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    const result = await user.save();
    const token = user.generateToken();


    const { password, ...other } = result._doc;
    res.status(201).json({ ...other, token });
});


/**
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
*/
const login = asyncHandler(async (req, res) => {
    // Validate user data
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Invalid Email or Password" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid Email or Password" })
    }

    const token = user.generateToken();


    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });

});


module.exports = {
    register,
    login
}