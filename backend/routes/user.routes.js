const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const db = require('../db');

router.get('/', authMiddleware, async (req, res) => {
	try {
		const [users] = await db.query('SELECT id, name, email, status, last_login AS lastActive FROM users ORDER BY last_login DESC');
		res.json({ users });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;
