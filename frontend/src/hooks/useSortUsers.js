import { useState, useEffect } from 'react';

export const useSortUsers = initialUsers => {
	const [sortedUsers, setSortedUsers] = useState([]);
	const [sortField, setSortField] = useState('lastActive');
	const [sortDirection, setSortDirection] = useState('asc');

	useEffect(() => {
		if (!initialUsers?.length) return;
		sortBy('lastActive', 'asc');
	}, [initialUsers]);

	const sortBy = (field, direction = null) => {
		const dir = direction || (sortDirection === 'asc' ? 'desc' : 'asc');

		const sorted = initialUsers?.sort((a, b) => {
			if (field === 'lastActive') {
				const dateA = new Date(a.lastActive || 0);
				const dateB = new Date(b.lastActive || 0);
				return dir === 'asc' ? dateB - dateA : dateA - dateB;
			}
			return dir === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
		});

		setSortField(field);
		setSortDirection(dir);
		setSortedUsers(sorted);
	};

	return { sortedUsers, sortBy, sortField, sortDirection };
};
