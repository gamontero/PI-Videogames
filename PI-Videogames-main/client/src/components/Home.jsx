import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideoGames, getGenres, filterCreatedDB, filterByGenre, orderByName, orderByRating } from '../actions';
import { Link } from 'react-router-dom'
import GameCard from './GameCard'
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
    //ESTADOS. MAP STATE TO PROPS ETC----------------
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.videoGames); // me trae del reducer el estado
    const videogameState = useSelector((state) => state.allVideoGames);
    const allGenre = useSelector((state) => state.genres);
    const [_orden, setOrden] = useState("");
    //----------------------------------


    //PAGINADO ------------
    const [currentPage, setCurrentPage] = useState(1)
    const [videoGamesPerPage, setvideoGamesPerPage] = useState(15) // aca defino los personajes por pagina 
    const indexOfLastVideoGame = currentPage * videoGamesPerPage // en el estado incial el indexoflast... es 15, xq es el ultimo de la pagina actual (la 1 en el estado inicial)
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage // deberia ser 0, el inicio 
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //------------------------------

    useEffect(() => {
        dispatch(getVideoGames()) // lo mismo que el map dispatch to props REPASAR
        dispatch(getGenres())
    }, [dispatch]) //se coloca el arreglo para que no sea una loop inifnito



    function handleClick(e) {
        e.preventDefault(); //para que no se me recarge la pagina y se pierdan los estados de redux 
        dispatch(getVideoGames());

    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreatedDB(e.target.value))
        setCurrentPage(1)
        setOrden(e.target.value);

    }

    function handleFilterGenre(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }


    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    function handleScore(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    // -----------------------------------------
    return (
        <div>
            <Link to='/creategame'> Create Videogame</Link>
            <h1> The Video Game App</h1>
            <button onClick={e => { handleClick(e) }}>
                Reload
            </button>
            <div>
                <SearchBar />


                {/* filtros y ordenamientos */}
                <div>
                    <select onChange={e => handleSort(e)}>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A </option>
                    </select>

                    <select onChange={e => handleScore(e)}>
                        <option value='top'>Highest Score</option>
                        <option value='low'> Lowest Score</option>
                    </select>

                    
                    <select onChange={e => handleFilterGenre(e)}>
                        <option value='all'>Genres</option>

                        {allGenre.map((genre) => (
                            <option key={genre.name} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={e => handleFilterCreated(e)} >
                        <option value='all'>All Games</option>
                        <option value='created'>Local Games </option>
                        <option value='API'>External Games </option>
                    </select>
                </div>



                <Paginado  // RENDERIZAR PAGINADO. LE PASO LAS PROPS QUE NECESITA EL COMPONENTE PAGINADO PARA FUNCIONAR
                    videoGamesPerPage={videoGamesPerPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                />


                <ul>
                    {currentVideoGames?.map((g) => {
                        return (
                            // <Fragment>
                            //     <Link to={"/home/" + g.id}>
                            <GameCard

                                name={g.name}
                                image={g.background_image}
                                genres={g.genres}
                                rating = {g.rating}



                            />
                            // </Link>
                            // </Fragment>
                        );
                    })}
                </ul>
            </div>

        </div>
    )
}
