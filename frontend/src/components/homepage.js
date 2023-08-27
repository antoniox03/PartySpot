import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Queue from "./Queue";
import "../../static/css/homepage.css"

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  const renderHomePage = () => {
    if (roomCode) {
      return <Navigate to={`/room/${roomCode}`} replace={true} />;
    } else {
      return (
        <Grid container spacing={1}>
          <h2 class ="text_shadows">
            House Party
          </h2>

          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
  };

  useEffect(() => {
    if (!roomCode) {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    }
  }, [roomCode]);



  return (
    <Router>
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route
          path="/create"
          element={<CreateRoomPage votesToSkip={3} guestCanPause={true} />}
        />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
            <Route
          path="/room/:roomCode/queue"
          element={<Queue />}
        />
      </Routes>
      
    </Router>
  );
}


