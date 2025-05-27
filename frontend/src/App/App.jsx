import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import './main.scss';
import './reset.scss';

export const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Layout>
		</Router>
	);
};
