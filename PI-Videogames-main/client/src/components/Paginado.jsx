import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado ({videoGamesPerPage, allVideoGames, paginado }) { 
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allVideoGames/videoGamesPerPage); i++) {
        pageNumbers.push(i)      
    };

    return ( 
        <div className={styles.pos}>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <span key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </span>
                ))}
            </ul>
        </div>
    );
};