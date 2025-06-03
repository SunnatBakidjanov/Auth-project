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

router.put('/:id/status', authMiddleware, async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		await db.execute('UPDATE users SET status = ? WHERE id = ?', [status, id]);
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ error: 'Database error', details: err });
	}
});

router.delete('/:id', authMiddleware, async (req, res) => {
	try {
		const { id } = req.params;
		await db.execute('DELETE FROM users WHERE id = ?', [id]);
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ error: 'Database error', details: err });
	}
});

module.exports = router;
