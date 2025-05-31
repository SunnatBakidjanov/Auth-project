import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useUserEmail = () => {
	const [currentUserEmail, setCurrentUserEmail] = useState(null);

	useEffect(() => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			setCurrentUserEmail(decoded.email);
		} else {
			setCurrentUserEmail(null);
		}
	}, []);

	return currentUserEmail;
};
