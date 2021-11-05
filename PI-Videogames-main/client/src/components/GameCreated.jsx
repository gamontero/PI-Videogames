import React, { useState, useEffect } from "react";
import { getGenres, postVideoGame, getVideoGames } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



function validate(input) {
    let errorValidate = {};
    if (!input.name.trim()) {
        errorValidate.name = "Name require";
    }
    if (!input.description.trim()) {
        errorValidate.description = "Description require";
    }
    // if (!input.platforms.length) {
    //     errorValidate.platforms = "Platforms require";
    // }
    return errorValidate;
}





export default function GameCreated() {
    const dispatch = useDispatch();
    const genres2 = useSelector((state) => state.genres);
    const platforms1 = useSelector((state) => state.platforms);
    const platforms2 = platforms1.flat()
    const platforms3 = [...new Set (platforms2)]
    const [error, setError] = useState({});
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

        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
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

    function handleDeleteGenres(e) {
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !== e),
        });
    }

    function handleDeletePlatforms(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((g) => g !== e),
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
            alert("VideoGame create!");
            setInput({
                name: "",
                description: "",
                releaseDate: "",
                rating: "",
                platforms: [""],
                genres: [],
            });
        } else {
            alert("ERROR! video game no creado");
            return;
        }
    }

    return (
        <div>
            <Link to="/home"><button>Return</button></Link>
            <h1>Create New VideoGame</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div>
                    <label>Name: </label>
                    <input type="text" required value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" required value={input.description} name="description" onChange={(e) => handleChange(e)} />
                    {error.description && (<p>{error.description}</p>)}
                </div>

                <div>
                    <label>Platform(s): </label>
                    <select onChange={(e) => handlePlatform(e)}>
                        {platforms3.map((g) => (<option key={g.name1} value={g.name}>{g}</option>))}
                    </select>
                    <div>
                        {input.platforms.map((g) => (
                            <div key={g.name1}>
                                <p>{g}</p>
                                <button onClick={() => handleDeletePlatforms}> X </button>
                            </div>
                        ))}
                    </div>
                    {error.platforms && (<p>{error.platforms}</p>)}
                </div>  


                <div>
                    <label>Genre(s): </label>
                    <select onChange={(e) => handleGenre(e)}>
                        {genres2.map((g) => (<option key={g.name} value={g.name}>{g.name}</option>))}
                    </select>
                    <div>
                        {input.genres.map((g) => (
                            <div key={g.name}>
                                <p>{g}</p>
                                <button onClick={() => handleDeleteGenres}> X </button>
                            </div>
                        ))}
                    </div>
                    {error.genres && (<p>{error.genres}</p>)}
                </div>

                <div>
                    <label>Released Date: </label>
                    <input type="date" required value={input.releaseDate} name="releaseDate" onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label>Rating: </label>
                    <input type="number" value={input.rating} min="0" max="5" name="rating" onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>



            </form>


        </div>
    )




}