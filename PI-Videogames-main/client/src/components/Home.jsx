import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideoGames, getGenres, filterCreatedDB, filterByGenre, orderByName, orderByRating, filterByPlatform } from '../actions';
import GameCard from './GameCard'
import Paginado from './Paginado';
import NavBar from './NavBar';
import styles from "./Home.module.css"
import SearchBar from './SearchBar';

export default function Home() {
    
    const dispatch = useDispatch();
    const allVideoGames = useSelector((state) => state.videoGames); 
    const allGenre = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    
    const [_orden, setOrden] = useState("");
    
    //----------------------------------


    //PAGINADO ------------
    const [currentPage, setCurrentPage] = useState(1)
    const videoGamesPerPage = 15 // aca defino los personajes por pagina 
    const indexOfLastVideoGame = currentPage * videoGamesPerPage // en el estado incial el indexoflast... es 15, xq es el ultimo de la pagina actual (la 1 en el estado inicial)
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage // deberia ser 0, el inicio 
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //------------------------------

    useEffect(() => {
        dispatch(getVideoGames()) 
        dispatch(getGenres())
    }, [dispatch]) 



    function handleClick(e) {
        e.preventDefault(); 
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

    function handleFilterPlatforms(e) {
        e.preventDefault();
        dispatch(filterByPlatform(e.target.value));
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
        <div className={styles.mainscreen}>
            <div>
               <NavBar/>
            </div>
                        
            <button className={styles.btn31} onClick={e => { handleClick(e) }}> 
                Reload
            </button>
            <div className={styles.container2}>
                <SearchBar />
            </div>  
            <div>
                 {/* filtros y ordenamientos */}
                <div className={styles.span1}>
                    <span>
                    <select className={styles.formStyle} defaultValue={"DEFAULT"} onChange={e => handleSort(e)}>
                        <option  value="DEFAULT" name="DEFAULT">Order ⇵</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A </option>
                    </select>

                    <select className={styles.formStyle}  defaultValue={"DEFAULT"} onChange={e => handleScore(e)}>
                        <option value="DEFAULT">Rating ⇵ </option>
                        <option value='top'>Highest Score</option>
                        <option value='low'> Lowest Score</option>
                    </select>

                    <select className={styles.formStyle} name="filterGenres" defaultValue={"DEFAULT"} onChange={e => handleFilterGenre(e)}>
                        <option value="DEFAULT" >Filter by Genre</option>
                        <option value='all'>All Genres</option>
                        {allGenre.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))};
                    </select>

                    <select className={styles.formStyle} name="filterPlatforms" defaultValue={"DEFAULT"} onChange={e => handleFilterPlatforms(e)}>
                        <option value="DEFAULT" >Filter by Platform</option>
                        <option value='all'>All Platforms</option>
                        {platforms.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))};
                    </select>

                    <select className={styles.formStyle} defaultValue={"DEFAULT"} onChange={e => handleFilterCreated(e)} >
                        <option value="DEFAULT">Games</option>
                        <option value='all'>All Games</option>
                        <option value='created'>Created </option>
                        <option value='API'>API</option>
                    </select>
                    </span>
                </div>
                
            <div className={styles.paginado}>
                <Paginado  
                    videoGamesPerPage={videoGamesPerPage}
                    allVideoGames={allVideoGames.length}
                    paginado={paginado}
                />
            </div>

                <ul className={styles.gameGrid}>
                    {currentVideoGames?.map((g) => {
                        return (
                            <div key={g.id}>
                                <GameCard
                                    
                                    id={g.id}
                                    name={g.name}
                                    image={g.background_image}
                                    genres={g.genres}
                                    rating={g.rating}
                                />
                            </div>                           
                        );
                    })}
                </ul>

            </div>
        </div>
    )
}
