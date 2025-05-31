import classNames from 'classnames';
import styles from './button.module.scss';

export const Button = ({ type, text, styleUsePlace, onClick, children }) => {
	return (
		<button
			type={type}
			className={classNames({
				[styles.signForm]: styleUsePlace === 'signForm',
				[styles.link]: styleUsePlace === 'link',
				[styles.tdHeadBtn]: styleUsePlace === 'tdHeadBtn',
				[styles.blockBtn]: styleUsePlace === 'blockBtn',
				[styles.bascketBtn]: styleUsePlace === 'bascketBtn',
			})}
			onClick={onClick}
		>
			{text} {children}
		</button>
	);
};
