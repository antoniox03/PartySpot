import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
    defaultvotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votestoSkip: this.defaultvotes,
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this); //binds method to class so that methods have access to this keyword
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
          votestoSkip: e.target.value,
        });
    }
    handleGuestCanPauseChange(e) {
        this.setState({
          guestCanPause: e.target.value === "true" ? true : false,
        });
      }
    
      handleRoomButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: this.state.votestoSkip,
            guest_can_pause: this.state.guestCanPause,
          }),
        };
        fetch("/api/create-room", requestOptions) // post request to our API that we built!
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    
    render() {
        return (
        <Grid container spacing={1} justifyContent = "center"> 
        
        <Grid item xs = {12} align = "center" > 
        <Typography component= 'h4' variant ="h4"> Create a Room </Typography>
        </Grid>

        <Grid item xs = {12} align = "center" > 
        <FormControl component= "fieldset">
            <FormHelperText>
                <div align ="center"> Guest Control of Playback State bruh</div>
            </FormHelperText>
            <RadioGroup
            row 
            defaultValue= "true"
            onChange={this.handleGuestCanPauseChange}
            >
                <FormControlLabel
                value = "true"
                control = {<Radio color = "primary" />}
                label = "Play/Pause"
                labelPlacement="bottom"
                />

                <FormControlLabel
                value = "false"
                control = {<Radio color = "secondary" />}
                label = "No Control"
                labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs = {12} align = "center" > 
        <FormControl>
            <TextField
            required = {true}
            type = "number"
            onChange={this.handleVotesChange}
            defaultValue={this.defaultvotes}
            inputProps={{
                min:1,
                style: {textAlign: "center"}
            }}
            />
            <FormHelperText>
                <div align = "center">
                    Votes required to skip song
                </div>
            </FormHelperText>

        </FormControl>
        
        </Grid>
        <Grid item xs = {12} align = "center" >
             <Button
                color  = "secondary"
                variant = "contained"
                onClick={this.handleRoomButtonPressed}

            >
                Create a Room
            </Button>
            </Grid>
            <Grid item xs = {12} align = "center" >
            <Button
                color  = "primary"
                variant = "contained"
                to = "/" component = {Link}

            >
                Back
            </Button>

             </Grid>



        </Grid>
        
        
        );
    }
}