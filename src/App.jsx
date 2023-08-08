import { useState } from 'react';
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

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);

	return (
		<>
			<Navbar>
				<Logo />
				<Search />
				<NumResults movies={movies} />
			</Navbar>

			<Main>
				<Box>
					<MoviesList movies={movies} />
				</Box>
				<Box>
					<>
						<WatchedSummary watched={watched} />
						<WatchedMoviesList watched={watched} />
					</>
				</Box>
			</Main>
		</>
	);
}
