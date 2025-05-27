import { AuthForm } from '../../UI/authForm/AuthForm';
import { MainTitle } from '../../UI/mainTitle/MainTitle';
import { SignLink } from '../../UI/signUpLink/SignLink';
import styles from './login.module.scss';

export const Login = () => {
	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.wrapper}>
					<MainTitle text="THE APP" styleUsePlace={'loginUse'} />
					<AuthForm showRememberCheckbox={true} titleText="Sign in to the App" />
					<SignLink text="Don't have an account?" linkText="Sign Up" />
				</div>
			</div>
		</section>
	);
};
