import classNames from 'classnames';
import styles from './button.module.scss';

export const Button = ({ type, text, styleUsePlace, onClick }) => {
	return (
		<button
			type={type}
			className={classNames({
				[styles.signForm]: styleUsePlace === 'signForm',
				[styles.link]: styleUsePlace === 'link',
			})}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
