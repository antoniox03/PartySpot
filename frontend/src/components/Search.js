import { Typography } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";

function SearchBar() {
    const [query, setQuery] = React.useState("");
    
    return(
        <div>
            <input type = "text" 
            placeholder="Search for your favorite song" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ></input>
        </div>

    )

}

function search({query}){

}


export default function Search() {
    const [query, setQuery] = React.useState("");
    const [result, setResult] = React.useState("");

    function handleSearch(searchQuery){
        setQuery(searchQuery);
    };

    useEffect(() => {
        setResult(query)
        console.log(result)
    }, [query]);

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <Typography>{result}</Typography>
        </div>
    )
}

