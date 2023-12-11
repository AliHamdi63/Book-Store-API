const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../Middlewares/verifyToken");
const {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
} = require('../controllers/usersController');


//  /api/users
router.get("/", verifyTokenAndAdmin, getAllUsers);

// Method Chaining
//  /api/users/:id
router.route("/:id")
    .get(verifyTokenAndAuthorization, getUserByID)
    .put(verifyTokenAndAuthorization, updateUser)
    .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;