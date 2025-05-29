import { useSignInForm } from '../../hooks/useSignInForm';
import { Button } from '../button/Button';
import styles from './signInForm.module.scss';

export const SignInForm = ({ titleText, btnText }) => {
	const { state, setField, toggleRemember, onSubmit } = useSignInForm();
	const { email, password, rememberMe, errors } = state;

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles.title}>{titleText}</h2>

				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input id="email" placeholder="Enter your email" value={email} onChange={e => setField('email', e.target.value)} required />
				</div>

				<div className={styles.field}>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setField('password', e.target.value)} required />
				</div>

				<label className={styles.rememberMe} htmlFor="remember">
					<input type="checkbox" id="remember" checked={rememberMe} onChange={toggleRemember} />
					Remember me
				</label>

				{errors?.message && <span className={styles.error}>{errors.message}</span>}

				<Button type="submit" text={btnText} styleUsePlace="signForm" />
			</form>
		</div>
	);
};
