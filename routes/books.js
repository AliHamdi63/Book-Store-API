const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const {
    getAllBooks,
    getBookByID,
    createNewBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// Method Chaining

//  /api/books
router
    .route("/")
    .get(getAllBooks)
    .post(verifyTokenAndAdmin, createNewBook);


//  /api/books/:id
router
    .route("/:id")
    .get(getBookByID)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin, deleteBook);


module.exports = router;