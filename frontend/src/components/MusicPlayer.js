import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
  Icon,
} from "@material-ui/core";


import HistoryIcon from "@material-ui/icons/History";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import "../../static/css/MusicPlayer.css"

export default function MusicPlayer(props){

const songProgress = (props.time / props.duration) * 100;

const pauseSong = () =>{
  const requestOptions = {
    method: 'PUT',
    headers: {"Content-Type": "application/json"}
  }
  fetch("/spotify/pause", requestOptions);
}

const playSong = () =>{
  const requestOptions = {
    method: 'PUT',
    headers: {"Content-Type": "application/json"}
  }
  fetch("/spotify/play", requestOptions);
}
const skipSong = () =>{
  const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/json"}
  }
  fetch("/spotify/skip", requestOptions);
}

const undoVote = () => {
  const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/json"}
  }
  fetch("/spotify/delete-vote", requestOptions);

}

  return (
    <Card  style={{ backgroundColor: "#97cef6" }}>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
        <img  className="album-cover" src={props.image_url} height="100%" width="100%" alt="Album Cover" />

        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {props.artist}
          </Typography>
          <div>
          <IconButton 
          
                onClick={() => {
                 props.is_playing ? pauseSong() :  playSong();
                }}
              >
              Play/Pause
              {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}

            </IconButton>

            <IconButton
            onClick={() => {skipSong();
            }}>
              <SkipNextIcon /> Skip Status:    &emsp;       {props.votes} /{" "} {props.votes_required}
            </IconButton>

            <IconButton
            onClick={() => {undoVote();
            }}>
              <HistoryIcon /> 
            </IconButton>


          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>

  );
};


