const bcrypt = require('bcryptjs');
const db = require('../db');

class AuthService {
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

		return {
			status: 200,
			data: {
				message: '✅ Login successful!',
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			},
		};
	}
}

module.exports = new AuthService();
