export function formatDate(date) {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

export const maskEmail = (email) => {
	const [name, domain] = email.split('@');
	return name.slice(0, 15) + "...";
}
