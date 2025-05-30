import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './userTable.module.scss';
import axios from 'axios';

export const UserTable = () => {
	const [users, setUsers] = useState([]);
	const [currentUserEmail, setCurrentUserEmail] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token') || sessionStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			setCurrentUserEmail(decoded.email);
		} else {
			setCurrentUserEmail(null);
		}
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem('token') || sessionStorage.getItem('token');
				const res = await axios.get('http://localhost:3000/api/users', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(res.data.users);
			} catch (err) {
				console.error('Error fetching users:', err);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<button>Block</button>
				<button>🔓</button>
				<button>🗑️</button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>
							<input type="checkbox" />
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Last Active</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(users) &&
						users.map(user => {
							const isCurrent = user.email === currentUserEmail;

							return (
								<tr key={user.id} className={isCurrent ? styles.currentUserRow : ''}>
									<td>
										<input type="checkbox" className={isCurrent ? styles.currentUserCheckbox : ''} />
									</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>
										{user.lastActive
											? new Date(user.lastActive).toLocaleString('default', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
												})
											: '—'}
									</td>
									<td>{user.status}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};
