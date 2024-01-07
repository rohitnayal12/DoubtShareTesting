const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { studentId: decoded.userId }
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = { authMiddleware };