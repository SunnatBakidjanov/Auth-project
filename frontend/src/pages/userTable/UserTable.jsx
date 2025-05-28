import { useEffect, useState } from 'react';
import styles from './userTable.module.scss';
import axios from 'axios';

export const UserTable = ({ currentUserId }) => {
	const [users, setUsers] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get('/api/users', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			setUsers(data);
		};

		fetchUsers();
	}, []);

	const toggleSelect = id => {
		setSelectedIds(prev => (prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]));
	};

	const toggleAll = () => {
		if (selectedIds.length === users.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(users.map(user => user.id));
		}
	};

	const updateStatus = async status => {
		await axios.post('/api/users/update-status', {
			userIds: selectedIds,
			status,
		});
		setUsers(prev => prev.map(user => (selectedIds.includes(user.id) ? { ...user, status } : user)));
		setSelectedIds([]);
	};

	const deleteUsers = async () => {
		await axios.post('/api/users/delete', { userIds: selectedIds });
		setUsers(prev => prev.filter(user => !selectedIds.includes(user.id)));
		setSelectedIds([]);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<button onClick={() => updateStatus('blocked')}>Block</button>
				<button onClick={() => updateStatus('active')}>🔓</button>
				<button onClick={deleteUsers}>🗑️</button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>
							<input type="checkbox" checked={selectedIds.length === users.length} onChange={toggleAll} />
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Last Active</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(users) &&
						users.map(user => (
							<tr key={user.id} className={user.id === currentUserId ? styles.ownerRow : ''}>
								<td>
									<input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelect(user.id)} />
								</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.lastActive}</td>
								<td>{user.status}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
