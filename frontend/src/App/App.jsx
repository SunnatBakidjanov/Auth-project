import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import { UserTable } from '../pages/userTable/UserTable';
import './main.scss';
import './reset.scss';

export const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/user-table" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/user-table" element={<UserTable />} />
				</Routes>
			</Layout>
		</Router>
	);
};
