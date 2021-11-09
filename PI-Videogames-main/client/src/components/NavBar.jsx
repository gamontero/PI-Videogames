import React from "react";
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
    < div >

      <header className={styles.container}>


      <div className={styles.container2}>
        <SearchBar />
      </div>


      <div ><Link to="/"className={styles.Title}> Arcade</Link></div>

 
      <div >
        <Link className={styles.link1} to='/creategame'> Create</Link>
      </div>
     
      <div>
        <Link className={styles.link1} to="/home">Home</Link>
      </div>
      </header>

             

    </div>
      
    
  );
}