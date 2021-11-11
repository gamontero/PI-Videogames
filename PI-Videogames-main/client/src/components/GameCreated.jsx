import React, { useState, useEffect } from "react";
import { getGenres, postVideoGame, getVideoGames } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GameCreated.module.css";
import NavBar from "./NavBar";



function validate(input) {
    let errorValidate = {};
    if (!input.name.trim()) {
        errorValidate.name = "Name require";
    }
    if (!input.description.trim()) {
        errorValidate.description = "Description require";
    }
    if (!input.platforms.length) {
        errorValidate.platforms = "Platforms require";
    }

    return errorValidate;
}





export default function GameCreated() {
    const dispatch = useDispatch();
    const genres2 = useSelector((state) => state.genres);
    console.log(genres2)
    const platforms = useSelector((state) => state.platforms);
    const [error, setError] = useState({
    });
    const [input, setInput] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: [],
        
        genres: [],
    });
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

    }

    function handleGenre(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        });
    }

    function handlePlatform(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        });
    }


    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getVideoGames());
    }, [dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        if (Object.keys(error).length === 0) {
            dispatch(postVideoGame(input));
            e.target.reset()
            alert("VideoGame created!");
            setInput({
                name: "",
                description: "",
                releaseDate: "",
                rating: "",
                platforms: [],
                genres: [],
            });
        } else {
            alert("ERROR! video game no creado");
            return;
        }
    }

    return (
        <div >
            <div className={styles.mainscreen}>
                <div>
                    <NavBar />
                </div>
                <div className={styles.CreateVideogame}>
                    <h1 className={styles.Title}>New Arcade</h1>
                    <form className={styles.CreationForm} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className={styles.label}>Name: </label>
                            <input className={styles.formStyle} type="text" required value={input.name} name="name" onChange={(e) => handleChange(e)} />
                            {error.name && <p className={styles.errors}>{error.name}</p>}
                        </div>
                        <div>
                            <label className={styles.label}>Description: </label>
                            <input className={styles.formStyle} type="text" required value={input.description} name="description" onChange={(e) => handleChange(e)} />
                            {error.description && (<p className={styles.errors}>{error.description}</p>)}
                        </div>

                        <div>
                        <label className={styles.label}>Platforms: </label>
                        <div className={styles.formStyle}>
                            {platforms.map((g) =>
                            (<label key={g}>
                                <input

                                    onChange={handlePlatform}
                                    type="checkbox"
                                    name={g}
                                    value={g} />
                                {g}
                            </label>))}

                            {error.platforms && (<p className={styles.errors}>{error.platforms}</p>)}
                        </div>
                        </div>
                        <div>
                        <label className={styles.label}>Genres: </label>
                        <div className={styles.formStyle}>
                            {genres2.map((g) =>
                            (<label key={g}>
                                <input
                                    onChange={handleGenre}
                                    type="checkbox"
                                    name={g}
                                    value={g} />
                                {g}
                            </label>))}

                            {error.genres && (<p className={styles.errors}>{error.genres}</p>)}
                        </div>
                        </div>

                        <div>
                            <label className={styles.label}>Released Date: </label>
                            <input className={styles.formStyle} type="date" required value={input.releaseDate} name="releaseDate" onChange={(e) => handleChange(e)} />
                        </div>

                        <div>
                            <label className={styles.label}>Rating: </label>
                            <input className={styles.formStyle} type="number" required value={input.rating} min="0" max="5" name="rating" onChange={(e) => handleChange(e)} />
                        </div>

                        <div className={styles.divHome}>
                            <button className={styles.btn} type="submit" >Create</button>
                        </div>



                    </form>
                </div>
            </div>
        </div>


    );




}