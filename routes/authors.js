const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require("../Middlewares/verifyToken");
const {
    getAllAuthors,
    getAuthorByID,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorsController');

// Method Chaining

//  /api/authors
router.route("/")
    .get(getAllAuthors)
    .post(verifyTokenAndAdmin, createNewAuthor);


//  /api/authors/:id
router.route("/:id")
    .get(getAuthorByID)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor);


module.exports = router;