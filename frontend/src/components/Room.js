// We changed this to function based compoenents instead of class based because of react v6
// Route compoenents rendered vie element prop don't receive route props
// Route children compoennets must use react hooks (useParams) -> transtion to function based
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';


const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = React.useState(2);
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [isHost, setIsHost] = React.useState(false);

    useEffect(() => {
        fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => response.json())
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        });
    }, [roomCode]); // useEffect will re-run whenever roomCode changes

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()} </p>
            <p>Host: {isHost.toString()} </p>
        </div>
    );
};




export default Room;