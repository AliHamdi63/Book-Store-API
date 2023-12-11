const asyncHandler = require("express-async-handler");
const { Book, ValidateCreateBook, ValidateUpdateBook } = require('../Models/Book');


/**
 * @desc    Get all books
 * @route   /api/books
 * @method  GET
 * @access  public
*/
const getAllBooks = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let books;
    if (minPrice && maxPrice) {
        books = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } })
            .populate("author", [
                "_id",
                "firstName",
                "lastName"
            ]);
    }
    else {
        books = await Book.find()
            .populate("author", [
                "_id",
                "firstName",
                "lastName"
            ]);
    }
    res.status(200).json(books);
});


/**
 * @desc    Get book by id
 * @route   /api/books/:id
 * @method  GET
 * @access  public
*/
const getBookByID = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id).populate("author", ["_id", "firstName", "lastName"]);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
);


/**
 * @desc    Create new book
 * @route   /api/books
 * @method  POST
 * @access  Private (only admins)
*/
const createNewBook = asyncHandler(
    async (req, res) => {
        const { error } = ValidateCreateBook(req.body);

        if (error) {
            return res.status(400).send(`Invalid request ${error}`);
        }
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        })

        const result = await book.save();
        res.status(201).json(result);

    }
);


/**
 * @desc    Update book
 * @route   /api/books/:id
 * @method  PUT
 * @access  private (only admins)
*/
const updateBook = asyncHandler(
    async (req, res) => {
        const { error } = ValidateUpdateBook(req.body);
        if (error) {
            return res.status(400).send(`Invalid request ${error}`);
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }
        }, { new: true });
        res.status(200).json(updatedBook)
    }
);


/**
 * @desc    Delete book
 * @route   /api/books/:id
 * @method  DELETE
 * @access  private (only admins)
*/
const deleteBook = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id);
        if (book) {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Book has been deleted' })
        }
        else {
            res.status(404).json({ message: 'Book Not Found!' });
        }
    }
);


module.exports = {
    getAllBooks,
    getBookByID,
    createNewBook,
    updateBook,
    deleteBook
}