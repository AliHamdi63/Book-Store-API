require('dotenv').config();
const { Book } = require("./Models/Book");
const { Author } = require("./Models/Author");
const { books, authors } = require("./data");
const connectToDB = require("./config/db");


// Connection to DB
connectToDB();


// Import Books  (Seeding DB)
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books Imported Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
// Remove Books
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books removed Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
if (process.argv[2] === "-import-books") {
    importBooks();
}
else if (process.argv[2] === "-remove-books") {
    removeBooks();
}



// Import Authors  (Seeding DB)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors Imported Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
// Remove Authors
const removeAuthors = async () => {
    try {
        await Author.deleteMany();
        console.log("Authors removed Successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
if (process.argv[2] === "-import-authors") {
    importAuthors();
}
else if (process.argv[2] === "-remove-authors") {
    removeAuthors();

}

// node seeder -import-books
// node seeder -import-authors