import classNames from 'classnames';
import styles from './mainTitle.module.scss';

export const MainTitle = ({ text, styleUsePlace }) => {
	return (
		<h1
			className={classNames(styles.text, {
				[styles.loginUse]: styleUsePlace === 'loginUse',
			})}
		>
			{text}
		</h1>
	);
};
