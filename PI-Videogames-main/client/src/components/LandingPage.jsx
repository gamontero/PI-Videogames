import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./LandingPage.module.css"


export default function Landing() { 
    return ( 
        <div className={styles.LandingWelcome}>
        <div className={styles.textContainer }>

            <h1>Arcade</h1>
            <p>Welcome to Arcade!
            A video game library developed as an individual project. 
            Please take the time to explore website, search for your favorites games 
            or even create your own.
            Have fun! and thank you for the support. </p>
        </div>    
            <div>
             <Link to="/home"> 
                 <button className={styles.bn1}> Enter </button>
             </Link>
            </div>
        </div> )

}