import './App.css';
import HideAppBar from './components/HideAppBar';
import ResponsiveGrid from './containers/retosContainer';
import ActionAreaCard from './reto/Reto';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { SystemSecurityUpdate } from '@mui/icons-material';

import { useSession } from './context/sessionContext'
import UserProfile from './components/UserProfile'


function App() {

  

  const [currentRetos, setCurrentRetos] = useState([])

  const retos = []


  for (let i = 0; i < currentRetos.length; i++) {
    var mensajeDisponible = ""   
    var vacantesDisponibles = currentRetos[i].vacantes - currentRetos[i].vacantesOcupadas
    if (currentRetos[i].disponible) {
      mensajeDisponible = <font color = "green" >Disponible</font>
    } else { mensajeDisponible = <font color = "red" >No disponible</font> }

    const item = <ActionAreaCard title={currentRetos[i].nombreReto} 
                                 imgLink={currentRetos[i].urlImg} 
                                 codigoReto = {currentRetos[i].codigoReto}
                                 disponible = {currentRetos[i].disponible}
                                 mensajeDisponible = {mensajeDisponible}
                                 vacantesDisponibles = {vacantesDisponibles}
                                 >
                                 
      {currentRetos[i].descripcionReto}
      <div>
        <Typography>
          Usuario: {currentRetos[i].usuarioReto} <br />
        </Typography>
      </div>
    </ActionAreaCard>
    retos.push(item)
  }


  const { currentUser } = useSession();


  console.log(currentUser)

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/retos');
      setCurrentRetos(response.data);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div className="App">
      <HideAppBar>

        {currentUser ? <UserProfile >
          <ResponsiveGrid retos={retos} />
        </UserProfile> :
          <ResponsiveGrid retos={retos} />
        }

      </HideAppBar>


    </div>
  );
}

export default App;
