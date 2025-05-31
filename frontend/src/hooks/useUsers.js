import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
	users: [],
	selectedUserIds: [],
	selectAll: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USERS':
			return { ...state, users: action.payload };
		case 'TOGGLE_SELECT_ALL':
			const allSelected = !state.selectAll;
			return {
				...state,
				selectAll: allSelected,
				selectedUserIds: allSelected ? state.users.map(user => user.id) : [],
			};
		case 'TOGGLE_SELECT_ONE':
			const { id } = action.payload;
			const isSelected = state.selectedUserIds.includes(id);
			const updatedSelected = isSelected ? state.selectedUserIds.filter(uid => uid !== id) : [...state.selectedUserIds, id];
			return {
				...state,
				selectedUserIds: updatedSelected,
				selectAll: updatedSelected.length === state.users.length,
			};
		case 'UPDATE_USER_STATUS':
			const { ids, status } = action.payload;
			return {
				...state,
				users: state.users.map(user => (ids.includes(user.id) ? { ...user, status } : user)),
				selectedUserIds: [],
				selectAll: false,
			};
		case 'DELETE_USERS':
			return {
				...state,
				users: state.users.filter(user => !action.payload.includes(user.id)),
				selectedUserIds: state.selectedUserIds.filter(id => !action.payload.includes(id)),
				selectedUserIds: [],
				selectAll: false,
			};
		default:
			return state;
	}
};

export const useUsers = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem('token') || sessionStorage.getItem('token');
				if (!token) return;

				const res = await axios.get('http://localhost:3000/api/users', {
					headers: { Authorization: `Bearer ${token}` },
				});

				const sorted = res.data.users.sort((a, b) => a.name.localeCompare(b.name));
				dispatch({ type: 'SET_USERS', payload: sorted });
			} catch (err) {
				console.error('Error fetching users:', err);
				navigate('/not-found');
			}
		};

		fetchUsers();
	}, []);

	return {
		users: state.users,
		selectedUserIds: state.selectedUserIds,
		selectAll: state.selectAll,
		dispatch,
	};
};
