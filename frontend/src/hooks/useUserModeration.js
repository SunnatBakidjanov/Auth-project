import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useUserModeration = (dispatch, currentUserEmail, users) => {
	const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');
	const navigate = useNavigate();

	const updateStatus = async (ids, status) => {
		try {
			const token = getToken();
			await Promise.all(
				ids.map(id =>
					axios.put(
						`http://localhost:3000/api/users/${id}/status`,
						{ status },
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					)
				)
			);
			dispatch({ type: 'UPDATE_USER_STATUS', payload: { ids, status } });

			const currentUserBlocked = ids.some(id => users.find(user => user.id === id)?.email === currentUserEmail);
			if (currentUserBlocked && status === 'blocked') {
				navigate('/login');
				localStorage.removeItem('token');
				sessionStorage.removeItem('token');
			}
		} catch (err) {
			console.error(`Error updating status to "${status}"`, err);
		}
	};

	const deleteUsers = async ids => {
		try {
			const token = getToken();
			await Promise.all(
				ids.map(id =>
					axios.delete(`http://localhost:3000/api/users/${id}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
				)
			);
			dispatch({ type: 'DELETE_USERS', payload: ids });

			const currentUserDeleted = ids.some(id => users.find(user => user.id === id)?.email === currentUserEmail);
			if (currentUserDeleted) {
				navigate('/login');
				localStorage.removeItem('token');
				sessionStorage.removeItem('token');
			}
		} catch (err) {
			console.error('Error deleting users', err);
		}
	};

	return {
		blockUsers: ids => updateStatus(ids, 'blocked'),
		unblockUsers: ids => updateStatus(ids, 'active'),
		deleteUsers,
	};
};
