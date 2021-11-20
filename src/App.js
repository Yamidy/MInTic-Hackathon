import './App.css';
import HideAppBar from './components/HideAppBar';
import ResponsiveGrid from './containers/retosContainer';
import ActionAreaCard from './reto/Reto';
import { SessionProvider } from './context/sessionContext'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { SystemSecurityUpdate } from '@mui/icons-material';



function App() {

///En el siguiente listado de json's están los datos de los Retos para
/// pasarselos mapear los cards.

const retosList = [
  {nombreReto : 'Iguana',
   descripcionReto :'https://th.bing.com/th/id/R.3a329b694174401e0382134d7854404c?rik=bC03mwhgI5PFEg&pid=ImgRaw&r=0',
   usuarioReto:'Aquí va la descripción',
   vacantes: 5,
   disponible: true,
   urlImg :'https://th.bing.com/th/id/R.3a329b694174401e0382134d7854404c?rik=bC03mwhgI5PFEg&pid=ImgRaw&r=0'}
]

const [currentRetos,setCurrentRetos] = useState([])

const retos = []

for (let i=0;i< currentRetos.length; i++){
  var disponible = ""
  if (currentRetos[i].disponible){
    disponible = "disponible"
  }else{disponible = "no disponible"}

  const item = <ActionAreaCard title = {currentRetos[i].nombreReto} imgLink = {currentRetos[i].urlImg}>
                  {currentRetos[i].descripcionReto}
                  <div>
                    <Typography>
                      Usuario: {currentRetos[i].usuarioReto} <br/>
                      vacantes: {currentRetos[i].vacantes} <br/>
                      {disponible} <br/>
                    </Typography>
                  </div>   
                </ActionAreaCard>
  retos.push(item)
}




/// fetching data from retos api: ============================================
const fetchPosts = async () => {
  try{
    const response = await axios.get('http://localhost:8085/api/v1/retos');
    setCurrentRetos(response.data);   
  }
  catch (err){
    console.log(err)
  }
}

useEffect( () => {
  fetchPosts();
  },[])
  

///========================================================================================




  return (
    <div className="App">
      <SessionProvider>
        <HideAppBar>

           <h1>Retos ecológicos:</h1>
            
           <ResponsiveGrid retos = {retos}/>
  
        </HideAppBar>
      </SessionProvider>


    </div>
  );
}

export default App;
