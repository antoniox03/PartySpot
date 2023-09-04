import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import { useTable } from 'react-table';
import DictionaryTable from './dictionaryTable';
import SearchBar from './Search';
import { SearchResultsList } from './SearchResultsList';
import "../../static/css/Room.css"
import AnimatedSquare from './AnimatedSquare';




export default function Queue() {
    const {roomCode} = useParams();
    const [queue, setQueue] = useState([]);
    const [queueArtist, setQueueArtist] = useState([])
    const [results, setResults]= useState([])
    const [uris, setUris]= useState([])
    const [searchArtists, setSearchArtists]= useState([])
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
      if (results === null) {
        setShowSearchResults(false);
      } else {
        setShowSearchResults(true);
      }
    }, [results]);



    const getQueue = () => {
        fetch('/spotify/queue')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            const queueData = data.songs.map((song, index) => ({
              key: index+1, // You can use the index as the key
              value: song,
            }));
            // console.log(queueData)
            setQueue(queueData); // Update the state with the transformed data
            const artistData = data.artists.map((artist, index) => ({
              key: index+1, // You can use the index as the key
              value: artist,
            }));
            setQueueArtist(artistData); // Update the state with the transformed data
            // console.log(artistData)
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      };

      
    useEffect(() => {
        getQueue();
        
    }, [queue]); // Fetch the queue when the component mounts
 
    return (
      
      <div className = 'scrollable-content' >
        <Grid container spacing = {2}>
        <Grid item xs={12} align = "center" >
  
            <div>
              <div>
                <SearchBar setResults={setResults} setUris={setUris} setSearchArtists ={setSearchArtists}/>

              <SearchResultsList results={results} uris={uris} getQueue={getQueue} searchArtists = {searchArtists}/>
            
              </div>
          </div>
            <div >
              
                <h5 class = "text_shadows" >Queue</h5>
                <DictionaryTable dictionary={queue} dictionaryartist = {queueArtist}/>
            </div>

            <Grid item xs={12} align="center">

             <p>     </p>
                <Button
                    variant="contained"
                    color="secondary"
                    to={`/room/${roomCode}`}
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
        </Grid>
        </div>
    );
}

