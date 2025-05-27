import { Button } from '../button/Button';
import styles from './authForm.module.scss';

export const AuthForm = ({ showRememberCheckbox, titleText }) => {
	return (
		<div className={styles.wrapper}>
			<form className={styles.form}>
				<h2 className={styles.title}>{titleText}</h2>

				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" placeholder="Enter your email" required />
				</div>

				<div className={styles.field}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" placeholder="Enter your password" required />
				</div>

				{showRememberCheckbox && (
					<div className={styles.rememberMe}>
						<input type="checkbox" id="remember" />
						<label htmlFor="remember">Remember me</label>
					</div>
				)}

				<Button type="submit" text="Sign In" styleUsePlace="signInForm" />
			</form>
		</div>
	);
};
