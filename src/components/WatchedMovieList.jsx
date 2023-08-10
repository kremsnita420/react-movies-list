import WatchedMovie from './WatchedMovie';

function WatchedMoviesList({ watched, onDeleteWatched }) {
	return (
		<ul className='list'>
			{watched.length === 0 ? (
				<p>Your list is empty.</p>
			) : (
				watched.map((movie) => (
					<WatchedMovie
						movie={movie}
						key={movie.imdbID}
						onDeleteWatched={onDeleteWatched}
					/>
				))
			)}
		</ul>
	);
}

export default WatchedMoviesList;
