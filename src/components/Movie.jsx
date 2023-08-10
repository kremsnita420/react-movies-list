import { images } from '../constants';

function Movie({ movie, onSelectMovie }) {
	const { Poster: poster, Title: title, Year: year, imdbID: id } = movie;
	return (
		<li onClick={() => onSelectMovie(id)}>
			<img
				src={poster === 'N/A' ? images.noImg : poster}
				alt={`${title} poster`}
			/>
			<h3>{title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{year}</span>
				</p>
			</div>
		</li>
	);
}

export default Movie;
