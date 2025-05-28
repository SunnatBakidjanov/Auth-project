const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email и пароль обязательны' });
	}

	try {
		const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
		if (rows.length === 0) {
			return res.status(401).json({ error: 'Неверный email или пароль' });
		}

		const user = rows[0];
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: 'Неверный email или пароль' });
		}

		await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

		res.json({ message: 'Успешный вход', userId: user.id, name: user.name });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

module.exports = router;
