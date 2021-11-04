import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";

export default function SearchBar () {

const dispatch = useDispatch();
const [name, setName] = useState("");

function handleInputChange (e) {
e.preventDefault()
setName(e.target.value)
}

function handleSubmit(e) {
e.preventDefault()
if (!name) {
    alert("Videogame's name needed") //alternatives to alert

} else {
    dispatch(getNameVideoGame(name));
    setName("");
}}


return (
    <div>
        <input type= "text" value = {name} placeholder = "Search Video Game" onChange = {(e) => handleInputChange(e)}/>
        <button type = "submit" onClick = {(e) => handleSubmit (e)}> Search</button>
    </div>
)

}