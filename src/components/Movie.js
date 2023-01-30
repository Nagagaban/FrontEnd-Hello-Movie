import React from 'react';
import noImage from './noImage.png';

const Movie = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

    return (
        <div onClick={() => selectMovie(movie)} className={"movie"}>
            <div className="movie-title">
                <img src={movie.poster_path? IMAGE_PATH + movie.poster_path: noImage} alt={movie.title} style={{borderRadius:'10px'}}/>  
                <div className={"flex between movie-infos"}>
                    <h5 className={"movie-title"}>{movie.title}</h5>
                    {movie.vote_average ? <span className={"movie-voting"}>{movie.vote_average}</span> : null}
                </div>
            </div>
        </div>
    );
};


export default Movie;