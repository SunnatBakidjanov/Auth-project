import { MainTitle } from '../../UI/mainTitle/MainTitle';
import { SignLink } from '../../UI/signLink/SignLink';
import styles from './login.module.scss';
import { SignInForm } from '../../UI/signInForm/signInForm';

export const Login = () => {
	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.wrapper}>
					<MainTitle text="THE APP" styleUsePlace={'loginUse'} />
					<SignInForm titleText="Sign in to the App" btnText="Sign In" />
					<SignLink text="Don't have an account?" linkText="Sign Up" navigatePlace="/register" />
				</div>
			</div>
		</section>
	);
};
