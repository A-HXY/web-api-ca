import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

// Register (Create) / Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else if (req.query.action === 'login') {
            await authenticateUser(req, res);
        } else {
            res.status(400).json({ success: false, msg: 'Invalid action. Use ?action=register or ?action=login.' });    
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ code: 400, msg: 'Bad Request', error: error.message });
    }
});

async function registerUser(req, res) {
    const existingUser = await User.findByUserName(req.body.username);
    if (existingUser) {
        return res.status(400).json({ success: false, msg: 'Username is already taken.' });
    }

    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET,{ expiresIn: '1h' });
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

// Get current user's profile
router.get('/profile', asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, msg: 'No authorization header provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found.' });
        }
        res.status(200).json({ success: true, user: { username: user.username, id: user._id } });
    } catch (error) {
        res.status(403).json({ success: false, msg: 'Invalid or expired token.', error: error.message });
    }
}));
export default router;
