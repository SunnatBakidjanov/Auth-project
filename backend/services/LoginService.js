const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

class LoginService {
	async login({ email, password }) {
		if (!email || !password) {
			return { status: 400, errors: { message: 'Email and password are required' } };
		}

		const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
		if (users.length === 0) {
			return { status: 401, errors: { message: 'Invalid email or password' } };
		}

		const user = users[0];

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return { status: 401, errors: { message: 'Invalid email or password' } };
		}

		await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

		const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

		return {
			status: 200,
			data: {
				message: '✅ Login successful!',
				token,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			},
		};
	}
}

module.exports = new LoginService();
