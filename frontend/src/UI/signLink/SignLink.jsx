import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import styles from './signLink.module.scss';
import { useChangeText } from './hooks/useChangeText';
import classNames from 'classnames';

export const SignLink = ({ text, linkText, navigatePlace, styleUsePlace, forgotPawsswordText = false, isForogtPassword = false }) => {
	const navigate = useNavigate();
	const { state, changeText } = useChangeText(forgotPawsswordText);

	return (
		<div
			className={classNames({
				[styles.signInWrapper]: styleUsePlace === 'signInWrapper',
				[styles.signUpWrapper]: styleUsePlace === 'signUpWrapper',
			})}
		>
			<div className={styles.inner}>
				<span className={styles.text}>{text}</span>
				<Button type="button" text={linkText} styleUsePlace="link" onClick={() => navigate(navigatePlace)} />
			</div>

			{isForogtPassword && <Button type="button" text={state} styleUsePlace="forgotPassword" onClick={changeText} />}
		</div>
	);
};
