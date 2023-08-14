import { useEffect, useState } from 'react';

export function useLocalStorageState(key) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);

		// Check if stored value exists in local storage otherwise return initial value of empty array
		return JSON.parse(storedValue) || [];
	});

	// Add added watched movies to local storage
	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}
