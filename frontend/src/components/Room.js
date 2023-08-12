// We changed this to function based compoenents instead of class based because of react v6
// Route compoenents rendered vie element prop don't receive route props
// Route children compoennets must use react hooks (useParams) -> transtion to function based
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {Grid, Button, Typography} from '@material-ui/core'
import {Link, useNavigate,  useHistory} from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage"




const Room = ({leaveRoomCallback}) => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = React.useState(2); //setting up state variables
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [isHost, setIsHost] = React.useState(false);
    const [showSettings, setshowSettings] = React.useState(false); 

    const navigate = useNavigate();

    const leaveButtonPressed = () => {
       
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
    
        fetch("/api/leave-room", requestOptions)
        .then((_response) => {
            leaveRoomCallback();
            navigate('/');
            });
    };
    const updateshowSettings = (value) => {
          setshowSettings(value);
    };

    const renderSettingsButton = () => {
      return (
        <Grid item xs={12} align ="center">
          <Button variant = "contained" color  = "primary" onClick = {() => updateshowSettings(true)}>
            Settings
          </Button>
        </Grid>
      );
    } 
    const updateRoomCallback = () => {
      fetch("/api/get-room" + "?code=" + roomCode)
          .then((response) => {
              if (!response.ok) {
                  leaveRoomCallback();
                  navigate('/');
                  return;
              }
              return response.json();
          })
          .then((data) => {
              setVotesToSkip(data.votes_to_skip);
              setGuestCanPause(data.guest_can_pause);
              setIsHost(data.is_host);
          });
  };

  
    // This allows us to see the settings page on the same url! It does this by updating the showSettings toggle
    const renderSettings = () => {
      return (
      <Grid container spacing={1}>
        <Grid item xs = {12} align = "center">
          <CreateRoomPage update = {true} 
          votesToSkip = {votesToSkip} 
          guestCanPause ={guestCanPause} 
          roomCode ={roomCode}
           updateCallback = {updateRoomCallback}/> 

        </Grid>

        <Grid item xs = {12} align = "center">
        <Button
            variant="contained"
            color="secondary"
            onClick={() => updateshowSettings(false)}
          >
            Close
          </Button>

          
          </Grid>

      </Grid>
      );

    };

    useEffect(() => {
        fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => {
            if (!response.ok) {
                leaveRoomCallback();
                navigate('/');
                return;
            }
            return response.json();
        })
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        });
    }, [roomCode, history, leaveRoomCallback]); // useEffect will re-run whenever roomCode, history, or leaveRoomCallback changes

    if (showSettings) {
      return renderSettings()

    }
    else {
      return (
          <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Votes: {votesToSkip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Guest Can Pause: {guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Host: {isHost.toString()}
            </Typography>
          </Grid>
          {isHost ? renderSettingsButton() : null}
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => leaveButtonPressed()}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>

      );
  };
}





export default Room;