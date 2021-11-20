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
import axios from 'axios';

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


  ///disponibilidad de vacantes:
  const [disponible, setDisponible] = React.useState(props.disponible)
  const [mensajeDisponible, setMensajeDisponible] = React.useState(props.mensajeDisponible)
  const [vacantesDisponibles, setVacantesDisponibles] = React.useState(props.vacantesDisponibles)


  /// acción para botón de aceptar reto:
  
  const aceptarReto = async (e)=>{
    e.preventDefault()
    const headers = {
      "content-type" :  "application/json"
    };
      const {data} = await axios.get('http://localhost:8085/api/v1/retos/vacantes/'+ e.target.value,
                        {headers});

                        
      if(vacantesDisponibles - 1 == 0){
        setVacantesDisponibles(vacantesDisponibles-1)
        setMensajeDisponible(<font color = "red" >No disponible</font>)
        setDisponible(false)
      }
      else if(data){
          setMensajeDisponible(<font color = "green" >Disponible</font>)     
          setVacantesDisponibles(vacantesDisponibles-1)
      }else{
          setMensajeDisponible(<font color = "red" >No disponible</font>)
      }
  }

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
             {mensajeDisponible}<br/>
             {vacantesDisponibles}
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
          <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth = "true">
            <Button disabled = {!disponible}>favoritos</Button>
            <Button disabled = {!disponible}>Like</Button>
            <Button value={props.codigoReto} onClick = {aceptarReto} disabled = {!disponible}>aceptar</Button>
          </ButtonGroup>
    </Card>
  );
}
