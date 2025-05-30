const registerService = require('../services/RegisterService');
const loginService = require('../services/LoginService');

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const result = await registerService.register({ name, email, password });

		if (result.errors) {
			return res.status(result.status).json({ errors: result.errors });
		}

		return res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ errors: { message: 'Server error' } });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const result = await loginService.login({ email, password });

		if (result.errors) {
			return res.status(result.status).json({ errors: result.errors });
		}

		return res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ errors: { message: 'Server error' } });
	}
};

module.exports = { register, login };
