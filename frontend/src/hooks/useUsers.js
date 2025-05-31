import { useEffect, useState } from 'react';
import axios from 'axios';

export const useUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem('token') || sessionStorage.getItem('token');

				if (!token) return;

				const res = await axios.get('http://localhost:3000/api/users', {
					headers: { Authorization: `Bearer ${token}` },
				});

				const sortedUsers = res.data.users.sort((a, b) => a.name.localeCompare(b.name));
				setUsers(sortedUsers);
			} catch (err) {
				console.error('Error fetching users:', err);
			}
		};

		fetchUsers();
	}, []);

	return { users, setUsers };
};
