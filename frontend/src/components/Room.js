// We changed this to function based compoenents instead of class based because of react v6
// Route compoenents rendered vie element prop don't receive route props
// Route children compoennets must use react hooks (useParams) -> transtion to function based
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import {Grid, Button, Typography} from '@material-ui/core'
import {Link, useNavigate,  useHistory} from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage"
import MusicPlayer from './MusicPlayer';




export default function Room({leaveRoomCallback}) {

    const {roomCode} = useParams();
    const [votesToSkip, setVotesToSkip] = useState(3); //setting up state variables
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setshowSettings] = useState(false); 
    const [spotifAuthenticated, setSpotAuth] = useState(false); 
    const [song, setSong] = useState({});  // Save state of song
    
    useEffect(() => {
      console.log('We are running useEffect');
      console.log(roomCode)
      fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
          if (!response.ok) {
            // leaveRoomCallback();
            navigate('/');
            console.log("didn't go through")
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data from API:', data); // Check if the fetched data is correct
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
          console.log('We made it this far');
          console.log('Are we the host data?', data.is_host);
          console.log('Are we the host?', isHost); // This might still be the previous value
          console.log('Amount of votes data?', data.votes_to_skip);
          console.log('Amount of votes?', votesToSkip); // This might still be the previous value
          console.log("SpotAuth", spotifAuthenticated);
          if (data.is_host) {
            authenticateSpotify(); // Use data.is_host instead of isHost
          }
        });
    }, [roomCode]);
    
    useEffect(() => {
      // Interval for getCurrentSong
      const interval = setInterval(getCurrentSong, 1000);
  
      // Cleanup interval and other effects on component unmount
      return () => {
        clearInterval(interval);
      };
    }, []); // Empty dependency array to run only once on mount



    const navigate = useNavigate();

    const getCurrentSong = () => {
      fetch('/spotify/current-song').then((response) => {
        if (!response.ok) {
          console.log("not ok")
          return response.json();
        }
        return response.json()
        console.log(response)
      })
      .then((data) => {
        console.log('Fetched data:', data); // Check the fetched data
        console.log(data)
        setSong(data); // Update the state
      })
      .catch((error) => {
        
        console.error('Fetch error:', error);
      });
    }



    const authenticateSpotify = () => {
      console.log("We are calling authenticate Spotify")
      fetch('/spotify/is-authenticated').then((response) => response.json()).then((data)=> {
        setSpotAuth(data.status)
        console.log("SpotAuth is", data.status)
        if (!data.status) {
          fetch('/spotify/get-auth-url').then((response) => response.json()).then((data => {
            window.location.replace(data.url);
          }))
        }
      })
      
    }

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

        

        <MusicPlayer {...song}/>

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
          
          {/* {!spotifAuthenticated && (
        <Grid item xs={12} align="center">
        
            <Button
                variant="contained"
                color="secondary"
                onClick={() => authenticateSpotify()}
            >
                Authenticate {spotifAuthenticated.toString()}
            </Button>
        </Grid>
    )} */}
        </Grid>

      );
  };
}





