import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';


const CountdownTimer = ({ targetDate }) => {
    
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py:'1em'
        }}>
            <Box sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      margin: '0 4px',
            }}>
                <Typography variant="h6">{timeLeft.days}d</Typography>
            </Box>
            <Box  sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      margin: '0 4px',
            }}>
                <Typography variant="h6">{timeLeft.hours}h</Typography>
            </Box>
            <Box sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      margin: '0 4px',
            }}>
                <Typography variant="h6">{timeLeft.minutes}m</Typography>
            </Box>
            <Box sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      margin: '0 4px',
            }}>
                <Typography variant="h6">{timeLeft.seconds}s</Typography>
            </Box>
        </Box>
    );
};

export default CountdownTimer;
