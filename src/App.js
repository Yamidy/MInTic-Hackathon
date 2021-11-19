import './App.css';
import HideAppBar from './components/HideAppBar';
import ResponsiveGrid from './containers/retosContainer';
import ActionAreaCard from './reto/Reto';

function App() {

///En el siguiente listado de json's están los datos de los Retos para
/// pasarselos mapear los cards.

const retosList = [
  {title : 'Iguana',
   imgLink :'https://th.bing.com/th/id/R.3a329b694174401e0382134d7854404c?rik=bC03mwhgI5PFEg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Panda Rojo',
   imgLink :'https://th.bing.com/th/id/R.588bcaf23e5ca08d7b6fd6c39d7e1417?rik=QTq2xiylu1YVNg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Pantera Rosa',
   imgLink :'https://image.telediario.mx/sites/default/files/styles/image_1_77_1_less__2x_/public/la_pantera_rosa_celebra_su_50_aniversario.jpg',
   descripition:'Aquí va la descripción' },
   {title : 'Iguana',
   imgLink :'https://th.bing.com/th/id/R.3a329b694174401e0382134d7854404c?rik=bC03mwhgI5PFEg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Panda Rojo',
   imgLink :'https://th.bing.com/th/id/R.588bcaf23e5ca08d7b6fd6c39d7e1417?rik=QTq2xiylu1YVNg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Pantera Rosa',
   imgLink :'https://image.telediario.mx/sites/default/files/styles/image_1_77_1_less__2x_/public/la_pantera_rosa_celebra_su_50_aniversario.jpg',
   descripition:'Aquí va la descripción' },
   {title : 'Iguana',
   imgLink :'https://th.bing.com/th/id/R.3a329b694174401e0382134d7854404c?rik=bC03mwhgI5PFEg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Panda Rojo',
   imgLink :'https://th.bing.com/th/id/R.588bcaf23e5ca08d7b6fd6c39d7e1417?rik=QTq2xiylu1YVNg&pid=ImgRaw&r=0',
   descripition:'Aquí va la descripción' },
   {title : 'Pantera Rosa',
   imgLink :'https://image.telediario.mx/sites/default/files/styles/image_1_77_1_less__2x_/public/la_pantera_rosa_celebra_su_50_aniversario.jpg',
   descripition:'Aquí va la descripción' }
   
]


const retos = [];

for (let i=0;i< retosList.length; i++){
  const item = <ActionAreaCard title = {retosList[i].title} imgLink = {retosList[i].imgLink}>
                  {retosList[i].descripition}    
                </ActionAreaCard>
  retos.push(item)
}






  return (
    <div className="App">
        <HideAppBar>
           <h1>Retos ecológicos:</h1>
            
           <ResponsiveGrid retos = {retos}/>

        </HideAppBar>
      

        
    </div>
  );
}

export default App;
