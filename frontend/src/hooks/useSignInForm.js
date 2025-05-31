import { useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValue = {
	email: '',
	password: '',
	rememberMe: false,
	errors: {},
};

const ACTIONS = {
	SET_FIELD: 'SET_FIELD',
	SET_ERRORS: 'SET_ERRORS',
	CLEAR_FORM: 'CLEAR_FORM',
	TOGGLE_REMEMBER: 'TOGGLE_REMEMBER',
};

function reducer(state, { type, field, payload }) {
	switch (type) {
		case ACTIONS.SET_FIELD:
			return {
				...state,
				[field]: payload,
				errors: { ...state.errors, [field]: '' },
			};
		case ACTIONS.TOGGLE_REMEMBER:
			return {
				...state,
				rememberMe: !state.rememberMe ? true : false,
			};
		case ACTIONS.SET_ERRORS:
			return {
				...state,
				errors: payload,
			};
		case ACTIONS.CLEAR_FORM:
			return initialValue;
		default:
			return state;
	}
}

export const useSignInForm = () => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	const navigate = useNavigate();

	const setField = (field, value) => {
		dispatch({ type: ACTIONS.SET_FIELD, field, payload: value });
	};

	const toggleRemember = () => {
		dispatch({ type: ACTIONS.TOGGLE_REMEMBER });
	};

	const handleSubmit = async () => {
		try {
			const res = await axios.post('http://localhost:3000/api/auth/login', {
				email: state.email,
				password: state.password,
			});

			localStorage.removeItem('token');
			sessionStorage.removeItem('token');

			if (state.rememberMe) {
				localStorage.setItem('token', res.data.token);
			} else {
				sessionStorage.removeItem('token');
				sessionStorage.setItem('token', res.data.token);
			}

			dispatch({ type: ACTIONS.CLEAR_FORM });

			navigate('/user-table');
			return { success: true };
		} catch (err) {
			const serverErrors = err.response?.data?.errors || {
				message: 'Incorrect email or password',
			};

			dispatch({ type: ACTIONS.SET_ERRORS, payload: serverErrors });

			return { success: false };
		}
	};

	const onSubmit = async e => {
		e.preventDefault();
		await handleSubmit();
	};

	return {
		state,
		setField,
		toggleRemember,
		onSubmit,
	};
};
