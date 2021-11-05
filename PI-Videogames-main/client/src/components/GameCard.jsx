import React from 'react'
import { Link } from "react-router-dom";

export default function Card({ name, image, genres, id, rating}) {
    
       return (
        <div>
          <ul>
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
            <div>Rating: {rating}</div>

          </ul>
        </div>
    );
  }