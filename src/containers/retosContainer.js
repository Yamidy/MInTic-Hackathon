import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';







export default function ResponsiveGrid(props) {



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {props.retos.map((reto, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
           {reto}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
