import React from 'react'
import "../../static/css/SearchResult.css"
// import 



export const SearchResults = ({result, uri, getQueue, searchArtist}) => {


    const addSong = (uri) =>{
        const requestBody = {
            "uri": uri
        };
        const requestOptions = {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(requestBody)
        }
        fetch("/spotify/addSong", requestOptions);
        getQueue();

      }


  return <div className='search-result' onClick={(e) => addSong(uri)}>
    {result}: {searchArtist}
    </div>;
};
