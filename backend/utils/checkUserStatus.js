const db = require('../db');

async function checkUserStatus(userId) {
	const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
	if (users.length === 0) {
		throw new Error('User not found');
	}
	const user = users[0];
	if (user.status !== 'active') {
		throw new Error('Account is blocked or inactive');
	}
	return user;
}

module.exports = checkUserStatus;
