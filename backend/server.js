const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
	res.send('Auth microservice is running');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, db };
