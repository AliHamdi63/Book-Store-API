const Joi = require('joi');
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    image: {
        type: String,
        default: "default-avatar.png"
    }
}, {
    timestamps: true
});


// Validate Create Author
function ValidateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        nationality: Joi.string().trim().min(3).max(100).required(),
        image: Joi.string()
    });

    return schema.validate(obj);
}

// Validate Update Author
function ValidateUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        nationality: Joi.string().trim().min(3).max(100),
        image: Joi.string()
    });

    return schema.validate(obj);
}

const Author = mongoose.model("Author", AuthorSchema);
module.exports = { Author, ValidateCreateAuthor, ValidateUpdateAuthor };