const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        //! getting token from header
        const authHeader = req.headers.authorization;

        // 2. check if header exists
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 3. extract token (remove 'Bearer ')
        const token = authHeader.split(" ")[1];

        // 4. verify token
        const decoded = jwt.verify(token, "SECRET_KEY")

        // 5. attach user info to request
        req.userId = decoded.userId;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;