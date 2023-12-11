const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB... ");

    } catch (error) {
        console.log("Connection Failed to MongoDB", error);
    }

    // mongoose
    // .connect(MONGO_URI)
    // .then(() => console.log("Connected to MongoDB... "))
    // .catch((error) => console.log("Connection Failed to MongoDB", error));
}

module.exports = connectToDB;