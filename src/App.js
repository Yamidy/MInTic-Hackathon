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

  ///En el siguiente listado de json's están los datos de los Retos para
  /// pasarselos mapear los cards.

  const [currentRetos, setCurrentRetos] = useState([])

  const retos = []

  for (let i = 0; i < currentRetos.length; i++) {
    var disponible = ""
    if (currentRetos[i].disponible) {
      disponible = "disponible"
    } else { disponible = "no disponible" }

    const item = <ActionAreaCard title={currentRetos[i].nombreReto} imgLink={currentRetos[i].urlImg}>
      {currentRetos[i].descripcionReto}
      <div>
        <Typography>
          Usuario: {currentRetos[i].usuarioReto} <br />
          vacantes: {currentRetos[i].vacantes} <br />
          {disponible} <br />
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
