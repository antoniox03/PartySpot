import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';

import { useTable } from 'react-table';
import DictionaryTable from '../dictionaryTable';




export default function Queue() {
    const {roomCode} = useParams();
    const [queue, setQueue] = useState([]);

    // function DictionaryTable({ dictionary }) {
    //     return (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Place</th>
    //             <th>Song</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {Object.entries(dictionary).map(([key, value]) => (
    //             <tr key={key}>
    //               <td>{key}</td>
    //               <td>{value}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     );
    //   }

    const getQueue = () => {
        fetch('/spotify/queue')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            const queueData = data.songs.map((song, index) => ({
              key: index, // You can use the index as the key
              value: song,
            }));
            setQueue(queueData); // Update the state with the transformed data
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      };

      
    useEffect(() => {
        getQueue();
        
    }, []); // Fetch the queue when the component mounts
    return (
        <Grid item xs={12} align = "center" >

            <div >
                <h1>Queue Table</h1>
                <DictionaryTable dictionary={queue} />
            </div>

            <Grid item xs={12} align="center">

             <p>     </p>
                <Button
                    variant="contained"
                    color="secondary"
                    to={`/room/${roomCode}`}
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
