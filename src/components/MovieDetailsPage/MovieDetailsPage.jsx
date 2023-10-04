
import { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { axiosMovieId } from '../../Api';
import { NavPage } from '../../NavPage/NavPage';
// import { BackButtonPage } from '../BackButtonPage/BackButtonPage';

import styles from './MovieDetailsPage.module.css';

export const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    console.log('MovieDetailsPage movie', movie)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getMovieId() {
            try {
                setLoading(true)
                const axiosMovie = await axiosMovieId(movieId);
                setMovie(axiosMovie)
            } catch (error) {
                console.log('ПОМИЛКА', error)
            } finally {
                setLoading(false)
            }
        }
        getMovieId()
    }, [movieId]);

    return (
        
        <>
            <div className={styles.MovieDetailsPage}>
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    movie && (
                        <>
                            <div>
                                {/* <BackButtonPage /> */}
                                
                                <div className={styles.PosterPath}>
                                    <img
                                        className={styles.ImgPosterPath}
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt="Poster"
                                    />
                                </div>
                                
                                <NavPage movieId={movieId} />
                                
                            </div>
                            
                            <div>
                                <div className={styles.ReleaseDate}>
                                    <h1 className={styles.ReleaseDateTitle}>{movie.title}
                                        ({new Date(movie.release_date).getFullYear()})</h1>
                                </div>
                                
                                <h3 className={styles.Genres}>Overview</h3>
                                <div className={styles.Overview}>
                                    <span className={styles.MovieOriginalTitle}>{movie.overview}</span>
                                </div>
                                
                                <ul className={styles.Title}>
                                    <li className={styles.TitleList}>
                                        <span className={styles.OriginalTitle}>Original title:</span>
                                        <span className={styles.MovieOriginalTitle}>{movie.original_title}</span>
                                    </li>

                                    <li className={styles.TitleList}>
                                        <span className={styles.OriginalTitle}>Runtime:</span>
                                        <span className={styles.MovieRunTimeTitle}>{movie.runtime}</span>
                                        <span className={styles.MovieOriginalTitle}>min.</span>
                                    </li>

                                    <li className={styles.TitleList}>
                                        <span className={styles.OriginalTitle}>Vote average:</span>
                                        <span className={styles.MovieRunTimeTitle}>{movie.vote_average.toFixed(1)}</span>
                                    </li>

                                    <li className={styles.TitleList}>
                                        <span className={styles.OriginalTitle}>Budget:</span>
                                        <span className={styles.MovieRunTimeTitle}>{movie.budget}</span>
                                    </li>
                                </ul>
                                
                                <h3 className={styles.Genres}>Genres</h3>
                                <ul className={styles.GenresList}>
                                    {movie.genres.map((genre) => (
                                        <li className={styles.GenresListItem} key={genre.id}>
                                            {genre.name}
                                        </li>
                                    ))}
                                </ul>

                                <h3 className={styles.Genres}>
                                    Production countries
                                </h3>
                                <ul className={styles.GenresList}>
                                    {movie.production_countries.map((product) => (
                                        <li className={styles.GenresListItem} key={product.iso_3166_1}>
                                            {product.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )
                )}
            </div>
            <Outlet />
        </>
    );
};