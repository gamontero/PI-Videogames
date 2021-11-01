import React from "react";

export default function Paginado ({videoGamesPerPage, allVideoGames, paginado }) { //me lo traigo como prop
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allVideoGames/videoGamesPerPage); i++) {
        pageNumbers.push(i + 1)
        
    }

    return ( 
        <div>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <span key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </span>
                ))}
            </ul>

        </div>
    )
}