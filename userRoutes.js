import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/MCOO275',)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// User login
router.post('/login', async (req, res) => {
    const { username, confCode } = req.body;
    const user = await findUserByName(username);
    if (user && confCode == user.confCode ) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

async function findUserByName(name) {
    return await users.findOne({ name });
}




export default router;