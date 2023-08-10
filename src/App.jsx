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

	useEffect(() => {
		async function fetchMovies() {
			setIsLoading(true);
			setError('');
			try {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
				);

				if (!res.ok) {
					throw new Error('Something went wrong with fetching query!');
				}

				const data = await res.json();

				if (data.Response === 'False') {
					throw new Error('Movie not found!');
				}

				setMovies(data.Search);
			} catch (err) {
				setError(err.message);
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
	}, [query]);

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
