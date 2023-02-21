import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', color:'yellow' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, color: "white" , background: 'darkslategrey'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ABOUT US
        </Typography>
        <Typography variant="h5" component="div">
          {bull}Group 5 Die Hardware{bull}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Tobias Klumpp
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Pietro Faccaio
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Per Anderesen
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Karun Manoharan
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Prishita Singh
        </Typography>
        <Typography variant="body2">
          <br />
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
