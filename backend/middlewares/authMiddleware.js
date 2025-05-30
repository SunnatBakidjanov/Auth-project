const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ errors: { message: 'Authorization header missing or malformed' } });
		}

		const token = authHeader.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

		if (users.length === 0) {
			return res.status(401).json({ errors: { message: 'User not found' } });
		}

		const user = users[0];

		if (user.status !== 'active') {
			return res.status(403).json({ errors: { message: 'Account is blocked or inactive' } });
		}

		req.user = { id: user.id, email: user.email };

		next();
	} catch (err) {
		console.error('Auth middleware error:', err);
		return res.status(401).json({ errors: { message: 'Invalid or expired token' } });
	}
};

module.exports = authMiddleware;
