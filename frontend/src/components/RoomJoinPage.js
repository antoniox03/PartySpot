import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../../static/css/Room.css"

export default function RoomJoinPage(props) {
  const [roomCode, setRoomCode] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
    .then((response) => {
      if (response.ok) {
        navigate(`/room/${roomCode}`); // Use history object to navigate
      } else {
        setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
 
    <Grid container spacing={1}>
         <div style={{ backgroundColor: "#97cef6" }}>
      <Grid item xs={12} align="center">
      <h2 class ="text_shadows">
            House Party
          </h2>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
      </div>
    </Grid>

  );
}

// export default RoomJoinPage;
