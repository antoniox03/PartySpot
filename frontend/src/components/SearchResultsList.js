import React from 'react'
import "../../static/css/SearchResultsList.css"
import { SearchResults } from './SearchResults'

export const SearchResultsList = ({results, uris, getQueue, searchArtists}) => {
  if (results === null) {
    return null;
  }

  return (
    <div className = "results-list">
        {results.map((result, id) => {
        return <SearchResults result={result} key={id} uri={uris[id]} getQueue={getQueue} searchArtist={searchArtists[id]} />
            })
        }
    </div>
  );
};
