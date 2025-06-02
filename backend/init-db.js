require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT || 3306,
		});

		const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        status ENUM('active', 'blocked') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      );
    `;

		await connection.query(createTableSQL);

		console.log('✅ Таблица users успешно создана или уже существует.');

		await connection.end();
	} catch (error) {
		console.error('❌ Ошибка при создании таблицы:', error.message);
	}
})();
