import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Box from './layout/Box';
import NumResults from './components/NumResults';
import MoviesList from './components/MoviesList';
import Navbar from './layout/Nabar';
import Search from './components/Search';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMovieList';
import { tempMovieData } from './constants';
import { tempWatchedData } from './constants';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

const KEY = process.env.REACT_APP_API_KEY;

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}
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

			handleCloseMovie();
			fetchMovies();

			/* Cleanup function. Abort the ongoing fetch request if the component is unmounted or if the
			`query` value changes before the fetch request is completed. The `controller.abort()` method is
			called to cancel the fetch request and prevent any further processing of the response. */
			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</Navbar>

			<Main>
				<Box>
					{isLoading && <Loader loadingState={isLoading} />}
					{!isLoading && !error && (
						<MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
