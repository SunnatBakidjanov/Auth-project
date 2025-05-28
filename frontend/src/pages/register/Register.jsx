import { SignUpForm } from '../../UI/signUpForm/SignUpForm';
import { MainTitle } from '../../UI/mainTitle/MainTitle';
import { SignLink } from '../../UI/signLink/SignLink';
import styles from './register.module.scss';

export const Register = () => {
	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.wrapper}>
					<MainTitle text="THE APP" styleUsePlace={'loginUse'} />
					<SignUpForm titleText="Sign Up for the App" btnText="Sign Up" />
					<SignLink text="Do you already have an account?" linkText="Sign In" navigatePlace="/login" />
				</div>
			</div>
		</section>
	);
};
