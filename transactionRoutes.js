import express from "express";
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate and add user information to the request
async function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
}


router.get("/", authenticate, async (req, res) => {
    const userId = req.user.userId;  // Extracted from token
    try {
        const results = await transactions.find({ userId }).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;