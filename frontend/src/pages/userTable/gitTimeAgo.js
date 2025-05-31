export const getTimeAgo = dateString => {
	const now = new Date();
	const past = new Date(dateString);
	const diffMs = now - past;

	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMinutes < 1) return 'less than a minute ago';
	if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
	if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
	return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
};
