import { MainTitle } from '../../UI/mainTitle/MainTitle';
import styles from './notFound.module.scss';

export const NotFound = () => {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<p className={styles.number}>404</p>
				<MainTitle text="Not Found" styleUsePlace="notFoundPage" />
				<h2 className={styles.title}>The resource requested could not be found on this server</h2>
			</div>
		</section>
	);
};
