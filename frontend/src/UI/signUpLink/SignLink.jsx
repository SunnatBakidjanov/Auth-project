import styles from './signLink.module.scss';

export const SignLink = ({ text, linkText }) => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.text}>{text}</span>
			<span className={styles.linkText}>{linkText}</span>
		</div>
	);
};
