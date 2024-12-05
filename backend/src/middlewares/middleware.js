const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies["x-access-token"];
        if (!token) {
            return res.status(401).send({ error: "No token provided" });
        }

        req.token_decrypted = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );
        next();
    } catch (err) {
        return res.status(403).send({ error: "Invalid token" });
    }
};

module.exports = { verifyToken };
