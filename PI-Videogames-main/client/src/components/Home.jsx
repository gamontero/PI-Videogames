import React, { Fragment } from 'react'; 
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getVideoGames } from '../actions';
import { Link } from 'react-router-dom'
import GameCard from './GameCard'

export default function Home (){ 

const dispatch = useDispatch();
const allVideoGames = useSelector((state) => state.videoGames);
const videogameState = useSelector((state) => state.allVideoGames); //esto es como el map state tu props 

useEffect (() => {
    dispatch(getVideoGames()) // lo mismo que el map dispatch to props REPASAR
}, [dispatch]) //se coloca el arreglo para que no sea una loop inifnito

function handleClick(e){
    e.preventDefault(); //para que no se me recarge la pagina y se pierdan los estados de redux 
    dispatch(getVideoGames()); 

}

return (
    <div>
        <Link to = '/videogames'> Create Videogame</Link>
        <h1> AGUANTE ...</h1>
        <button onClick = {e => {handleClick(e)}}>
            volver a cargar videogames 
        </button>
        <div>
            <select>
                <option value = 'asc'>A-Z</option>
                <option value = 'desc'>Z-A </option>    
            </select> 
            {/* <select>
                <option value = 'asc'>ASC</option>
                <option value = 'desc'> DES </option>    
            </select>  */}
            <select>
                <option value = 'All'>All Games</option>
                <option value = 'created'>Local Games </option>    
                <option value = 'API'>External Games </option>    
            </select> 
            
            <ul>
              {allVideoGames?.map((g) => {
                return (
                    // <Fragment>
                    //     <Link to={"/home/" + g.id}>
                    <GameCard
                        
                        name={g.name}
                        image={g.background_image}
                        genres={g.genres}
                       
                        
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
