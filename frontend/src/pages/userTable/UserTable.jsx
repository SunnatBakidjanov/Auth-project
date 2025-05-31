import classNames from 'classnames';
import styles from './userTable.module.scss';
import { useUsers } from '../../hooks/useUsers';
import { useUserEmail } from '../../hooks/useUserEmail';
import { Button } from '../../UI/button/Button';
import { useSortUsers } from '../../hooks/useSortUsers';
import { useUserModeration } from '../../hooks/useUserModeration';
import { getTimeAgo } from './gitTimeAgo';
import lockIcon from '../../../public/assets/imgs/lock.svg';
import openLock from '../../../public/assets/imgs/open-lock.svg';
import basket from '../../../public/assets/imgs/basket.svg';

export const UserTable = () => {
	const { users, selectedUserIds, selectAll, dispatch } = useUsers();
	const currentUserEmail = useUserEmail();
	const { sortBy, sortDirection, sortField } = useSortUsers(users);
	const { blockUsers, unblockUsers, deleteUsers } = useUserModeration(dispatch, currentUserEmail, users);

	const toggleSelectAll = () => {
		dispatch({ type: 'TOGGLE_SELECT_ALL' });
	};

	const toggleUserSelection = userId => {
		dispatch({ type: 'TOGGLE_SELECT_ONE', payload: { id: userId } });
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<Button text="Block" styleUsePlace="blockBtn" onClick={() => blockUsers(selectedUserIds)} disabled={selectedUserIds.length === 0}>
					<img src={lockIcon} alt="Block" />
				</Button>
				<Button styleUsePlace="blockBtn" onClick={() => unblockUsers(selectedUserIds)} disabled={selectedUserIds.length === 0}>
					<img src={openLock} alt="Unlock" />
				</Button>
				<Button styleUsePlace="bascketBtn" onClick={() => deleteUsers(selectedUserIds)} disabled={selectedUserIds.length === 0}>
					<img src={basket} alt="Delete" />
				</Button>
			</div>

			<table className={styles.table}>
				<thead>
					<tr className={styles.trContent}>
						<th className={styles.thCheckbox}>
							<label className={styles.mainLabel} htmlFor="mainInput"></label>
							<input id="mainInput" type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
						</th>
						<th>
							<div className={styles.thContent}>
								<Button text={`Name`} onClick={() => sortBy('name')} styleUsePlace="tdHeadBtn" />
								<p className={styles.tdHeadArrow}>{sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
							</div>
						</th>
						<th>
							<div className={styles.thContent}>
								<Button text={`Email`} onClick={() => sortBy('email')} styleUsePlace="tdHeadBtn" />
								<p className={styles.tdHeadArrow}>{sortField === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
							</div>
						</th>
						<th className={styles.thLastActive}>
							<div className={styles.thContent}>
								<Button text={`Last Active`} onClick={() => sortBy('lastActive')} styleUsePlace="tdHeadBtn" />
								<p className={styles.tdHeadArrow}>{sortField === 'lastActive' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
							</div>
						</th>
						<th className={styles.thStatus}>
							<div className={styles.thContent}>
								<Button text={`Status`} styleUsePlace="tdHeadBtn" onClick={() => sortBy('status')} />
								<p className={styles.tdHeadArrow}>{sortField === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(users) &&
						users.map(user => (
							<tr
								key={user.id}
								className={classNames({
									[styles.currentUserRow]: user.email === currentUserEmail,
								})}
							>
								<td className={styles.thCheckbox}>
									<label className={styles.mainLabel} htmlFor={user.id}></label>
									<input id={user.id} type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleUserSelection(user.id)} />
								</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td className={styles.tdLastActive}>{user.lastActive ? getTimeAgo(user.lastActive) : '—'}</td>
								<td className={styles.tdStatus}>{user.status}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
