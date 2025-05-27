import { Button } from '../button/Button';
import styles from './authForm.module.scss';

export const AuthForm = ({ showRememberCheckbox, showRepeatpassword, titleText, btnText }) => {
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

				{showRepeatpassword && (
					<div className={styles.field}>
						<label htmlFor="repeat-password">Repeat password</label>
						<input type="password" id="repeat-password" placeholder="Repeat your password" />
					</div>
				)}

				{showRememberCheckbox && (
					<label className={styles.rememberMe} htmlFor="remember">
						<input type="checkbox" id="remember" />
						Remember me
					</label>
				)}

				<Button type="submit" text={btnText} styleUsePlace="signForm" />
			</form>
		</div>
	);
};
