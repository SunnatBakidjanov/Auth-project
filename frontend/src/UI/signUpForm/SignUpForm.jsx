import classNames from 'classnames';
import { useSignUpForm } from '../../hooks/useSignUpForm';
import { Button } from '../button/Button';
import styles from './signUpForm.module.scss';

export const SignUpForm = ({ titleText, btnText }) => {
	const { state, setField, onSubmit } = useSignUpForm();
	const { name, email, password, repeatPassword, errors, registratedMessage } = state;

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h2 className={styles.title}>{titleText}</h2>

				<span className={styles.registrated}>{registratedMessage}</span>

				<div className={styles.field}>
					<label htmlFor="name">Name</label>
					<input id="name" value={name} onChange={e => setField('name', e.target.value)} placeholder="Enter your name" required />
				</div>

				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input id="email" value={email} onChange={e => setField('email', e.target.value)} placeholder="Enter your email" required />
					{errors.email && <span className={styles.error}>{errors.email}</span>}
				</div>

				<div className={styles.field}>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" value={password} onChange={e => setField('password', e.target.value)} placeholder="Enter your password" required />
					{errors.password && <span className={styles.error}>{errors.password}</span>}
				</div>

				<div className={styles.field}>
					<label htmlFor="repeatPassword">Repeat password</label>
					<input id="repeatPassword" type="password" value={repeatPassword} onChange={e => setField('repeatPassword', e.target.value)} placeholder="Repeat your password" required />
					{errors.repeatPassword && <span className={styles.error}>{errors.repeatPassword}</span>}
				</div>

				<span className={styles.error}>{errors.message}</span>

				<Button type="submit" text={btnText} styleUsePlace="signForm" />
			</form>
		</div>
	);
};
