import { Layout } from '../layout/Layout';
import { Login } from '../pages/login/Login';
import './main.scss';
import './reset.scss';

export const App = () => {
	return (
		<Layout>
			<Login />
		</Layout>
	);
};
