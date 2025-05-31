const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

const corsOptions = {
	origin: 'https://auth-project-production-9c35.up.railway.app',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

db.query('SELECT 1')
	.then(() => console.log('Connected to MySQL'))
	.catch(err => console.error('DB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
	res.json({ message: 'Server is working and connected to DB!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
