import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

/// Este es el card que contiene cada reto, se le puede pasar como parámetros
/// el título, un link para la imagen y la descripción que va en el children.



export default function ActionAreaCard(props) {


  /// Para mostrar más información del reto se usará un menú:

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Card sx={{ maxWidth: 345 } } >
      <CardActionArea  aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.imgLink}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {props.children}
          </Typography>
        </CardContent>
        </CardActionArea>

      <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography>
  
        </Typography>
        
      </Menu>
    </div>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>favoritos</Button>
            <Button>Like</Button>
            <Button>aceptar</Button>
          </ButtonGroup>
    </Card>
  );
}
