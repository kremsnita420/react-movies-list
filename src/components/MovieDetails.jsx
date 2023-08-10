import React, { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';
import { images } from '../constants';
const KEY = process.env.REACT_APP_API_KEY;
export default function MovieDetails({ selectedId, onCloseMovie }) {
	const [movie, setMovie] = useState({});

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	console.log(poster);
	useEffect(
		function () {
			async function getMovieDetails() {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);

				const data = await res.json();

				setMovie(data);
			}
			getMovieDetails();
		},
		[selectedId]
	);
	return (
		<div className='details'>
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
					<StarRating maxRating={10} size={22} />
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actors}</p>
				<p>Directed by {director}</p>
			</section>
		</div>
	);
}
