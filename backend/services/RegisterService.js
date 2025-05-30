const bcrypt = require('bcryptjs');
const db = require('../db');

class RegisterService {
	async validateRequired({ name, email, password }) {
		if (!name || !email || !password) {
			return { status: 400, errors: { message: 'All fields are required' } };
		}
		return null;
	}

	async validateEmail(email) {
		if (!/\S+@\S+\.\S+/.test(email)) {
			return { status: 400, errors: { message: 'Invalid email format' } };
		}

		const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
		if (existing.length > 0) {
			return { status: 409, errors: { email: 'A user with this email already exists' } };
		}

		return null;
	}

	async register({ name, email, password }) {
		const requiredError = await this.validateRequired({ name, email, password });
		if (requiredError) return requiredError;

		const emailError = await this.validateEmail(email);
		if (emailError) return emailError;

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

		return {
			status: 201,
			data: {
				message: '✅ You have successfully registered! You will now be redirected to the login page.',
			},
		};
	}
}

module.exports = new RegisterService();
