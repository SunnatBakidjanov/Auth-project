import classNames from 'classnames';
import styles from './mainTitle.module.scss';

export const MainTitle = ({ text, styleUsePlace }) => {
	return (
		<h1
			className={classNames({
				[styles.loginUse]: styleUsePlace === 'loginUse',
				[styles.notFoundPage]: styleUsePlace === 'notFoundPage',
			})}
		>
			{text}
		</h1>
	);
};
