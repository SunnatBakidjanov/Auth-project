import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	password: '',
	repeatPassword: '',
	errors: {},
	registratedMessage: '',
	isRegistered: false,
};

const ACTIONS = {
	SET_FIELD: 'SET_FIELD',
	SET_ERRORS: 'SET_ERRORS',
	CLEAR_FORM: 'CLEAR_FORM',
};

const REDIRECT_TIMER = 3000;

function reducer(state, { type, field, payload }) {
	switch (type) {
		case ACTIONS.SET_FIELD:
			return {
				...state,
				[field]: payload,
				errors: { ...state.errors, [field]: '' },
			};
		case ACTIONS.SET_ERRORS:
			return {
				...state,
				errors: payload,
			};
		case ACTIONS.CLEAR_FORM:
			return {
				...initialState,
				registratedMessage: payload,
				isRegistered: true,
			};

		default:
			return state;
	}
}

export const useSignUpForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	const setField = (field, value) => {
		dispatch({ type: ACTIONS.SET_FIELD, field, payload: value });
	};

	useEffect(() => {
		if (state.isRegistered) {
			const timer = setTimeout(() => {
				navigate('/login');
			}, REDIRECT_TIMER);

			return () => clearTimeout(timer);
		}
	}, [state.isRegistered, navigate]);

	const validate = () => {
		const errors = {};
		if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = 'Invalid email format';
		if (state.password !== state.repeatPassword) errors.repeatPassword = 'Passwords do not match';

		return errors;
	};

	const handleSubmit = async () => {
		const errors = validate();

		if (Object.keys(errors).length > 0) {
			dispatch({ type: ACTIONS.SET_ERRORS, payload: errors });
			return { success: false };
		}

		try {
			const res = await axios.post('http://localhost:3000/api/auth/register', {
				name: state.name,
				email: state.email,
				password: state.password,
			});

			dispatch({ type: ACTIONS.CLEAR_FORM, payload: res.data.message });
			return { success: true, message: res.data.message };
		} catch (err) {
			const serverErrors = err.response?.data?.errors || { message: 'Registration failed' };

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
		onSubmit,
	};
};
