import React, { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';
import { images } from '../constants';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
const KEY = process.env.REACT_APP_API_KEY;

export default function MovieDetails({
	selectedId,
	onCloseMovie,
	onAddWatched,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Year: year,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}
	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				try {
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
					);

					if (!res.ok) {
						throw new Error('Something went wrong with fetching movie!');
					}

					const data = await res.json();
					if (!data) {
						throw new Error('Movie not found!');
					}
					setMovie(data);
				} catch (err) {
					setError(err.message);
				} finally {
					setIsLoading(false);
				}
			}
			getMovieDetails();
		},
		[selectedId]
	);
	return (
		<div className='details'>
			{isLoading && <Loader loadingState={isLoading} />}
			{error && <ErrorMessage message={error} />}
			{!isLoading && !error && (
				<>
					<header>
						<button className='btn-back' onClick={() => onCloseMovie()}>
							⬅️
						</button>
						<img
							src={poster === 'N/A' ? images.noImg : poster}
							alt={`Poster of ${title}`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={22}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button onClick={handleAdd} className='btn-add'>
											+Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie with {watchedUserRating}
									<span> ⭐</span>
								</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
