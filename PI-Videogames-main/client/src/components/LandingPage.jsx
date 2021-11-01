import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Landing() { 
    return ( 
        <div>
        <h2>Welcome to the VideoGame site</h2>
        <Link to="/home"> 
            <button> Enter </button>
        </Link>
   </div> )

}