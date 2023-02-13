import {useEffect, useState} from "react"
import axios from 'axios'
import Movie from "./Movie"
import Youtube from 'react-youtube'
import './Home.css';
import { useNavigate, useParams } from 'react-router-dom';

function Home() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "118a1dc490ea54a28867c254a344c81c"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    const [five,setFive] = useState([])

    const navigate = useNavigate();
    let {username} = useParams();

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        // console.log(data.results[0])
        // console.log(data.results)

        // for(var i=0 ; i<5 ;i++ ){
        //     // setMovies(data.results[i])
        //     setFive(data.results)
        //     console.log(five)
        // }
        // setFive(data.results[0])
        // setFive(data.results[1])
        // setFive(data.results[2])
        // setFive(data.results[3])
        // setFive(data.results[4])

        var intermidiary = []

        for(let i=0;  i<5; i++){
            intermidiary[i] = data.results[i]
        }

        console.log(intermidiary)
        
        setMovies(intermidiary)

        console.log(movies)

        // console.log(data.results[0])

        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }
        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(item => (
            <Movie
                selectMovie={selectMovie}
                key={item.id}
                movie={item}
            />
        ))
    )
    
    function Logout(){
        navigate("/");
    }

    // async function GetRecommender(movie.id) {
    //     await axios.post("https://localhost:7125/api/Recommender/GetRecommender/" + movie.id, {
    //         movies: id,
    //     });
    //     setMovies("");
    //   }

    return (
        <div className="home-movie">
            <header className="center-max-size header">
                <span className={"brand"}>Hello Movie</span>
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search"
                           onInput={(event) => setSearchKey(event.target.value)} placeholder='Search...'/>
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
                <span className={"brand"}>User: {username}</span>
                <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => Logout()}
                  >Log out</button>
            </header>
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube"}
                                        containerClassName={"youtube-container"}
                                        opts={
                                            {
                                                width: '1455px',
                                                height: '550px',
                                                playerVars: {
                                                    autoplay: 1,
                                                    // controls: 0,
                                                    // cc_load_policy: 0,
                                                    // fs: 0,
                                                    // iv_load_policy: 0,
                                                    // modestbranding: 0,
                                                    // rel: 0,
                                                    // showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <button onClick={() => setPlaying(false)} className={"button close-video"}>Close
                                    </button>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                        <div className="movie">
                                            {trailer ?
                                                <button className={"button play-video"} onClick={() => setPlaying(true)}
                                                        type="button">Play
                                                    Trailer</button>
                                                : 'Sorry, no trailer available'}
                                            <h1>{movie.title}</h1>
                                            <p>{movie.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}

                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default Home;