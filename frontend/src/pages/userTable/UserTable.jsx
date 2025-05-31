import classNames from 'classnames';
import styles from './userTable.module.scss';
import { useUsers } from '../../hooks/useUsers';
import { useUserEmail } from '../../hooks/useUserEmail';
import { Button } from '../../UI/button/Button';
import { useSortUsers } from '../../hooks/useSortUsers';
import lockIcon from '../../../public/assets/imgs/lock.svg';
import openLock from '../../../public/assets/imgs/open-lock.svg';
import basket from '../../../public/assets/imgs/basket.svg';
import { useState } from 'react';
import axios from 'axios';

export const UserTable = () => {
	const { users, setUsers } = useUsers();
	const currentUserEmail = useUserEmail();
	const { sortBy, sortDirection, sortField } = useSortUsers(users);
	const [selectedUserIds, setSelectedUserIds] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const updateUsers = async () => {
		const response = await fetch('/users');
		const updatedUsers = await response.json();
		setUsers(updatedUsers);
	};

	const handleBlockUsers = async () => {
		for (const userId of selectedUserIds) {
			await axios.put(`http://localhost:3000/api/users/${userId}/status`, {
				status: 'blocked',
			});
		}
		await updateUsers();
		setSelectedUserIds([]);
	};

	const handleUnlockUsers = async () => {
		for (const userId of selectedUserIds) {
			await axios.put(`http://localhost:3000/api/users/${userId}/status`, {
				status: 'active',
			});
		}
		await updateUsers();
		setSelectedUserIds([]);
	};

	const handleDeleteUsers = async () => {
		for (const userId of selectedUserIds) {
			await axios.delete(`http://localhost:3000/api/users/${userId}`);
		}
		await updateUsers();
		setSelectedUserIds([]);
	};

	const toggleUserSelection = userId => {
		setSelectedUserIds(prev => (prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]));
	};

	const toggleSelectAll = () => {
		if (selectAll) {
			setSelectedUserIds([]);
		} else {
			setSelectedUserIds(users.map(user => user.id));
		}
		setSelectAll(!selectAll);
	};

	const getTimeAgo = dateString => {
		const now = new Date();
		const past = new Date(dateString);
		const diffMs = now - past;

		const diffMinutes = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMinutes < 1) return 'less then a minute ago';
		if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
		if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
		return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<Button text="Block" styleUsePlace="blockBtn" onClick={handleBlockUsers}>
					<img src={lockIcon} alt="" />
				</Button>
				<Button styleUsePlace="blockBtn" onClick={handleUnlockUsers}>
					<img src={openLock} alt="" />
				</Button>
				<Button styleUsePlace="bascketBtn" onClick={handleDeleteUsers}>
					<img src={basket} alt="" />
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
