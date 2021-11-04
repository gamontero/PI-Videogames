import React from 'react'
import { Link } from "react-router-dom";

export default function Card({ name, image, genres, id, rating}) {
    // let genres2 = genres.map((e) => e.name);
  
       return (
        <div>
          <li>
            <Link to={"/videogame/" + id}>
              <img
                
                src={image}
                alt="img not found"
                width="420px"
                height="400px"
              />
            </Link>
            <div>{name}</div>
          
            <div>Genres: {genres.join(", ")}</div>
          </li>
        </div>
    );
  }