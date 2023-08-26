import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Queue from "./Queue";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  // Different way for defining the same function
  // function clearRoomCode() {
  //   setRoomCode(null)
  // }

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  const renderHomePage = () => {
    if (roomCode) {
      return <Navigate to={`/room/${roomCode}`} replace={true} />;
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
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



// import React, { Component } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate } from "react-router-dom";
// import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";


// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";
// import Room from "./Room"

// export default class HomePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       roomCode: null,
//     };
//     this.clearRoomCode = this.clearRoomCode.bind(this);
//   }

//   clearRoomCode(){
//     this.setState({
//       roomCode: null
//     })
//   }
//   // life cycle methods
//   async componentDidMount() {
//     if (!this.state.roomCode) {
//       fetch("/api/user-in-room")
//         .then((response) => response.json())
//         .then((data) => {
//           this.setState({
//             roomCode: data.code,
//           });
//         });
//     }
//   }
  


//   renderHomePage() {
//     if (this.state.roomCode) {
//       return (
//         <Navigate to={`/room/${this.state.roomCode}`} replace={true}/>
//       );
//     } else {
//       return (
//         <Grid container spacing={3}>
//           <Grid item xs={12} align="center">
//             <Typography variant="h3" compact="h3">
//               House Party
//             </Typography>
//           </Grid>
//           <Grid item xs={12} align="center">
//             <ButtonGroup disableElevation variant="contained" color="primary">
//               <Button color="primary" to="/join" component={Link}>
//                 Join a Room
//               </Button>
//               <Button color="secondary" to="/create" component={Link}>
//                 Create a Room
//               </Button>
//             </ButtonGroup>
//           </Grid>
//         </Grid>
//       );
//     }
//   } 



//   render() {
//     return (
//       <Router>
//         <Routes>
//           <Route exact path="/" element={this.renderHomePage()}/>
//           <Route path="/join"  element = {<RoomJoinPage />} />
//           <Route path="/create"  element = {<CreateRoomPage votesToSkip={3} guestCanPause = {true}/>} />
//           <Route
//                 path="/room/:roomCode"
//                 element={<Room leaveRoomCallback={this.clearRoomCode} />}
//             />
       
//         </Routes>

//       </Router>
//     );
//   }
// }


