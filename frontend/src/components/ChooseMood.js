import React, { useState, useEffect } from 'react';

export default function ChooseMood() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select");

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("Select");

  const [selectedUri, setSelectedUri] = useState(null);
  const [uris, setUris] = useState([]);

  const onSelect = (selectedOption) => {
    console.log(`Selected: ${selectedOption}`);
    // Do whatever you want to do with the selected option
  };

  const getCategories = async () => {
    try {
      const response = await fetch('/spotify/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.categories);
      setOptions(data.categories); // Update the state with the list of category names
    } catch (error) {
      console.error(error);
    }
  };

  const getResults = async (value) => {
    if (selectedOption === "") {
        setSelectedOption(null); // Set results to null when the search bar is empty
        return;
      }
    const requestBody = {
        searchQ: value,
        type: 'playlist',
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
        console.log(data.songs);
        setPlaylists(data.songs); // Update the state with the list of song names
        setUris(data.uris);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const playSong = (uri) =>{
    const requestBody = {
        type: 'playlist',
        uri: uri,
    }
    const requestOptions = {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(requestBody),
    }
    
    fetch("/spotify/play", requestOptions);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    getResults(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const newSelectedCategory= event.target.value;
    setSelectedPlaylist(newSelectedCategory);
    const categoryIndex = playlists.findIndex(category => category === newSelectedCategory);

    if (categoryIndex !== -1) {
        const selectedUri = uris[categoryIndex]; // Use the corresponding URI
        console.log("Selected URI" + selectedUri)
        setSelectedUri(selectedUri);
        playSong(selectedUri); // Play the selected song
      }

  };
  const selectStyle = {
    width: '200px', // Adjust the width as needed
  };

  return (

    <>

<div style={{ backgroundColor: "#97cef6", textAlign: "center" }}>
        <h5>Choose the Mood</h5>
    <select value={selectedOption} style={selectStyle} onChange={handleOptionChange}>
      <option value="Select" disabled>Select</option>
      {options.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    
    {playlists.length > 0 && (
        <>
     <h5>Choose the playlist</h5>
      <select value={selectedPlaylist} style={selectStyle} onChange={handleCategoryChange}>
        <option value="Select" disabled>Select</option>
        {playlists.map((playlist) => (
          <option key={playlist} value={playlist}>
            {playlist}
          </option>
        ))}
      </select>
      </>
    )}
    </div>
    </>


  );
}
