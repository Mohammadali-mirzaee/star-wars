import styles from '../styles/Main.module.scss'
import React from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from "react";

const Main = ({ search, filter }) => {
    const api = 'https://swapi.dev/api/films/?format=json'

    const [movies, setMovies] = useState([])
    const [selectmovie, setSelectedMovie] = useState(null)


    movies?.results ? movies.results.sort((movies1, movie2) => {

        if (filter === 'Year') {

            return movies1.release_date > movie2.release_date ? 1 : -1
        }
        if (filter === 'Episode') {
            return movies1.episode_id > movie2.episode_id ? 1 : -1
        }
    }) : undefined

    console.log(movies)

    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(api);
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.log('error');
            }
        }
        fetchList();
    }, []);

    //console.log(movies.results)

    const selectedMovie = useCallback((sku) => {
        console.log("sku", sku)
        const prod = movies.results.find((x) => x.episode_id === sku)
        console.log("prod", prod)
        setSelectedMovie(prod)
    }, [movies])


    const images = {
        1: 'https://wallpaperaccess.com/full/1987338.jpg',
        2: 'https://wallpapercave.com/wp/wp7248855.jpg',
        3: 'https://cutewallpaper.org/26/best-dark-side-wallpaper-star-wars/star-wars-dark-wallpapers-top-free-star-wars-dark-backgrounds--wallpaperaccess.png',
        4: 'https://img5.goodfon.com/wallpaper/nbig/1/33/sitkh-zvezdnye-voiny-art-mech.jpg',
        5: 'https://wallpaper.dog/large/20390196.jpg',
        6: 'https://c4.wallpaperflare.com/wallpaper/302/127/798/star-wars-wallpaper-preview.jpg'
    }








    return (
        <div id={styles.main}>

            <div className={styles.leftSide}>
                <ul role="list">
                    {movies.results &&
                        movies.results.filter((movie) => movie.title.toLowerCase().includes(search)).map((movie) => (
                            <li key={movie.token} onClick={() => selectedMovie(movie.episode_id)}>
                                <div>
                                    <span>
                                        EPISODE
                                        {movie.episode_id}
                                    </span>

                                    <span>{movie.title}</span>
                                </div>

                                <span>{movie.release_date}</span>

                            </li>
                        ))}
                </ul>

            </div>
            <div className={styles.rightside}>
                {selectmovie && <img src={images[selectmovie.episode_id]} alt={selectmovie.title} />}
                {selectmovie && (
                    <div>
                        <div>
                            <h1>
                                {selectmovie.title}
                            </h1>
                            <p>
                                {selectmovie.opening_crawl}
                            </p>


                        </div>
                    </div>
                ) || <p>No Movie Selected</p>}
            </div>
        </div>
    )

}

export default Main;