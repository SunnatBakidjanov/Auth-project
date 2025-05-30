import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token');

	if (!token) {
		return <Navigate to="/not-found" replace />;
	}

	return children;
};
