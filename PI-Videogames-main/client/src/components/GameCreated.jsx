import React, { useState, useEffect } from "react";
import { getGenres, postVideoGame } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function GameCreated() {
    const dispatch = useDispatch();
    const genres2 = useSelector((state) => state.genres);

    const [input, setInput] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: [],
        genres: [],
      });

useEffect(() => {
dispatch(getGenres());
}, [dispatch]); 



    return (
        <div>

            
        </div>
    )




}