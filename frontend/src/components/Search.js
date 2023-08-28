import React, { Component, useEffect, useState } from "react";
import {FaSearch} from "react-icons/fa"
import "../../static/css/SearchBar.css"


export default function SearchBar({setResults, setUris}) {
    const [input, setInput] = React.useState("");
 

    // This is asychronous, you have to chain .then function which awaits results and perform actions, then turn into json object then get json value
    const getResults = async (value) => {
        if (value === "") {
            setResults(null); // Set results to null when the search bar is empty
            return;
          }
        const requestBody = {
            searchQ: value,
            type: 'track',
        };

        try {
            const response = await fetch('/spotify/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.uris);
            setResults(data.songs); // Update the state with the list of song names
            setUris(data.uris);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleChange = (value) => {
        setInput(value)
        getResults(value)
    }

    return (
        <div className = "input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Search Songs..."
            value = {input}
            onChange={(e) => handleChange(e.target.value)}/>
        </div>
    );
};

