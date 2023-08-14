import { useCallback, useEffect, useState } from 'react';

export function useMovies(query, setSelectedId) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const KEY = process.env.REACT_APP_API_KEY;

	// eslint-disable-next-line no-unused-vars
	const handleCloseMovie = useCallback(
		() => setSelectedId(null),
		[setSelectedId]
	);

	// Fetch movie details from api endpoint
	useEffect(
		function () {
			/* Cancel an ongoing fetch request. It
			allows us to cancel the request if needed, for example, if the component is unmounted or if the
			dependency array of the `useEffect` hook changes. */
			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');

					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						{ signal: controller.signal }
					);

					if (!res.ok)
						throw new Error('Something went wrong with fetching movies');

					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found');

					setMovies(data.Search);
					setError('');
				} catch (err) {
					if (err.name !== 'AbortError') {
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			fetchMovies();

			/* Cleanup function. Abort the ongoing fetch request if the component is unmounted or if the
			`query` value changes before the fetch request is completed. The `controller.abort()` method is
			called to cancel the fetch request and prevent any further processing of the response. */
			return function () {
				controller.abort();
			};
		},
		[query, KEY]
	);

	return { movies, isLoading, error };
}
