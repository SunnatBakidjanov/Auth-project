import { useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import styles from './signLink.module.scss';

export const SignLink = ({ text, linkText, navigatePlace }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<span className={styles.text}>{text}</span>
			<Button type="button" text={linkText} styleUsePlace="link" onClick={() => navigate(navigatePlace)} />
		</div>
	);
};
