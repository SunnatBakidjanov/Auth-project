const authService = require('../services/AuthService');

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const result = await authService.register({ name, email, password });

		if (result.errors) {
			return res.status(result.status).json({ errors: result.errors });
		}

		return res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ errors: { message: 'Server error' } });
	}
};

module.exports = { register };
