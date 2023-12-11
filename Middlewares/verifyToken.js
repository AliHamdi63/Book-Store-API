const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token" })

        }
    }
    else {
        res.status(401).json({ message: "No Token Provided" })
    }
}


// Verify Token & Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).send({ message: "You are not allowed" });
        }
    });
}


// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).send({ message: "You are not allowed, only admin allowed" });
        }
    });
}




module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};