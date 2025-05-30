import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import { UserTable } from '../pages/userTable/UserTable';
import './main.scss';
import './reset.scss';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { NotFound } from '../pages/404/NotFound';

export const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route
						path="/user-table"
						element={
							<ProtectedRoute>
								<UserTable />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Layout>
		</Router>
	);
};
