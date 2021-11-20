import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';






export default function IngresarReto()  {


  const [nombreReto, setNombreReto] = useState('')
  const [descripcionReto , setDescripcionReto] = useState('')
  const [vacantes , setVacaantes] = useState('')
  const [disponible , setDisponible] = useState(true)
  const [urlImg , setUrlImg] = useState('')


  const formulario = {
      "nombreReto" : nombreReto,
      "descripcionReto" : descripcionReto,
      "vacantes" : vacantes,
      "disponible": disponible,
      "urlImg" : urlImg
    }
  



  const addReto = async (e) => {
    e.preventDefault()
    console.log(JSON.stringify(formulario))
    const headers = {
      "content-type" :  "application/json"
    };
      const response = await axios.post('http://localhost:8085/api/v1/retos',
                        JSON.stringify(formulario),
                        {headers});
      if(response) alert(response) 
      else alert('no funciona')
  }


 
    return<>
        <form onSubmit = {addReto}>
        <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >   
      <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>             
      
            <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Nombre del reto"
            required = "true"
            name = "nombreReto"
            onChange = {(e) => setNombreReto(e.target.value)}
        />
        
            <TextField
            helperText=""
            id="demo-helper-text-aligned"
            label="Brebe descripción"
            required = "true"
            name = "descripcionReto"
            onChange = {(e) => setDescripcionReto(e.target.value)}
        />           
        
        <TextField
            helperText=""
            id="demo-helper-text-aligned"
            label="Link de la imagen"
            name = "urlImg"
            onChange = {(e) => setUrlImg(e.target.value)}
        />   

  
        <TextField
          id="outlined-number"
          label="Vacantes disponibles"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange = {(e) => setVacaantes(e.target.value)}
          name = "vacantes"
          required = "true"
        />


        <FormControlLabel 
          control={<Switch defaultChecked />} 
          label="disponible" 
          name = "disponible" 
          onChange = {(e) => setDisponible(e.target.checked)}
        />

      

        <Button type = "submit" color="inherit">
          <Typography>
            Añadir reto
          </Typography>
        </Button>

      </Box>
    </div>
    </Box>
        </form>
    </>
}



