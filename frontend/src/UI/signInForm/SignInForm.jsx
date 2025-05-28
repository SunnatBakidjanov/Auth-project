import { Button } from '../button/Button';
import styles from './signInForm.module.scss';

export const SignInForm = ({ titleText, btnText }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<form className={styles.form}>
					<h2 className={styles.title}>{titleText}</h2>

					<div className={styles.field}>
						<label htmlFor="email">Email</label>
						<input id="email" placeholder="Enter your email" required />
					</div>

					<div className={styles.field}>
						<label htmlFor="password">Password</label>
						<input id="password" type="password" placeholder="Enter your password" required />
					</div>

					<label className={styles.rememberMe} htmlFor="remember">
						<input type="checkbox" id="remember" />
						Remember me
					</label>

					<Button type="submit" text={btnText} styleUsePlace="signForm" />
				</form>
			</div>
		</>
	);
};
