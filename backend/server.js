const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth.routes');
const loginRouter = require('./routes/login.routes');

const app = express();

app.use(cors());
app.use(express.json());

db.query('SELECT 1')
	.then(() => console.log('Connected to MySQL'))
	.catch(err => console.error('DB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/login', loginRouter);

app.get('/', (req, res) => {
	res.json({ message: 'Server is working and connected to DB!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
