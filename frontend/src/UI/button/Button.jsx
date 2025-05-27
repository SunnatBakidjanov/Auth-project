import classNames from 'classnames';
import styles from './button.module.scss';

export const Button = ({ type, text, styleUsePlace }) => {
	return (
		<button
			type={type}
			className={classNames({
				[styles.signInForm]: styleUsePlace === 'signInForm',
			})}
		>
			{text}
		</button>
	);
};
