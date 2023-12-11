const asyncHandler = require('express-async-handler');
const { Author, ValidateCreateAuthor, ValidateUpdateAuthor } = require('../Models/Author')


/**
 * @desc    Get all authors
 * @route   /api/authors
 * @method  GET
 * @access  public
*/
const getAllAuthors = asyncHandler(async (req, res) => {
    const { pageNumber } = req.query;
    const authorsPerPage = 2;
    const authors = await Author.find()
        .skip((pageNumber - 1) * authorsPerPage)
        .limit(authorsPerPage);
    res.status(200).json(authors);
}
);


/**
 * @desc    Get author by id
 * @route   /api/authors/:id
 * @method  GET
 * @access  public
*/
const getAuthorByID = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id)
    if (author) {
        res.status(200).json(author);
    }
    else {
        res.status(404).json({ message: 'Author not found.' });
    }
});


/**
 * @desc    Create new author
 * @route   /api/authors
 * @method  POST
 * @access  private (only admins)
*/
const createNewAuthor = asyncHandler(async (req, res) => {
    const { error } = ValidateCreateAuthor(req.body);

    if (error) {
        return res.status(400).send(`Invalid request ${error}`);
    }
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    })

    const result = await author.save();
    res.status(201).json(result);
});


/**
 * @desc    Update author
 * @route   /api/authors/:id
 * @method  PUT
 * @access  private (only admins)
*/
const updateAuthor = asyncHandler(async (req, res) => {
    const { error } = ValidateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).send(`Invalid request ${error}`);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        }
    }, { new: true });
    res.status(200).json(updatedAuthor);
});

/**
 * @desc    Delete author
 * @route   /api/authors/:id
 * @method  DELETE
 * @access  private (only admins)
*/
const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id, { new: true });
        res.status(200).json({ message: "Author has been Deleted Successfully." })
    }
    else {
        res.status(404).json({ message: "Author not found" });
    }
});


module.exports = {
    getAllAuthors,
    getAuthorByID,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
};