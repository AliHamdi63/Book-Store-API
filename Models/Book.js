const Joi = require('joi');
const mongoose = require('mongoose');

// Book Schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true

    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    },
    price: {
        type: Number,
        required: true,
        min: 0,

    }
}, { timestamps: true });



// Validate Create Book
function ValidateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().required(),
        price: Joi.number().integer().positive().greater(9).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required()
    });

    return schema.validate(obj);
}

// Validate Update Book
function ValidateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string(),
        description: Joi.string().trim(),
        price: Joi.number().integer().positive().greater(9),
        cover: Joi.string().valid("soft cover", "hard cover")
    });

    return schema.validate(obj);
}

// Book Model
const Book = mongoose.model("Book", BookSchema);

module.exports = { Book, ValidateCreateBook, ValidateUpdateBook }