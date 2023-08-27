import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Collapse} from "@material-ui/core";
import { useParams} from 'react-router-dom';
import "../../static/css/Room.css"
// import Alert from "@material-ui/lab/Alert"

export default function CreateRoomPage(props) {
    const { roomCode } = useParams();
    const {
        isHost: True,
        votesToSkip: defaultVotes,
        guestCanPause: defaultGuestCanPause,
        update = false,
        updateCallback = () => {}
      } = props;
      
    

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const [guestCanPause, setGuestCanPause] = useState(defaultGuestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
 

    const [errorMsg, seterrorMsg] = useState("");
    const [successMsg, setsuccessMsg] = useState("");

    // Text field change
    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    // Radio button change 
    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === "true"); // Check if option is being set to true, and then set it as the answer to that 
    };


    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };

        fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate('/room/' + data.code)); // Use navigate for navigation
          
    };

    const title = update ? "Update Room" : "Create a Room";

    const renderCreateButtons = () => {
        return (
            <Grid container spacing ={1} >
            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleRoomButtonPressed}
                >
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            </Grid>
        )
    };

    const updateRoomButton = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: roomCode
            }),
        };

        fetch("/api/update-room", requestOptions)
        .then((response) => {
            if (response.ok) {
                setsuccessMsg("Successsful")
                ;
            }
            else {
                seterrorMsg("Failed to update")
            }
            updateCallback();
        })


    };
    const renderUpdateButtons = () => {
        return (
            <Grid container spacing ={1} >
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={updateRoomButton}
                >
                    Update Room
                </Button>
            </Grid>
            </Grid>
        );

    }
    const msgsuccessupdate = () => {
        setsuccessMsg("");
    }
    const msgerrorupdate = () => {
        seterrorMsg("");
    }
    return (
        <div style={{ backgroundColor: "#97cef6" }}>
        <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} align="center">
            <h5 class = "text_shadows">{title}</h5>
                <FormControl component="fieldset">
                        <div > Guest Control of Playback State bruh</div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                    <RadioGroup
                        row
                        defaultValue= {guestCanPause.toString()}
                        onChange={handleGuestCanPauseChange}
                    >
                        
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />

                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                    </div>
                </FormControl>
            </Grid>
            
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        <div align="center">Votes required to skip song</div>
                    </FormHelperText>
                </FormControl>
                
            </Grid>
            {update ? renderUpdateButtons() : renderCreateButtons()}
            
        </Grid>
        </div>
        
    );
};


