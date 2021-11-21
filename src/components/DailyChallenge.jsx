import WheelComponent from 'react-wheel-of-prizes'
import {useState} from 'react'
import TransitionsModal from '../Modals/TransitionsModal'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



const dailyChallenges = ['0',
  '2',
  '3',
  '4',
  '5',
  '1'
]

const challengeInfo  = [
  {image:"/daily/1.png", titulo:'Salva la banana solitaria', descripcion:'Segun estudios miles de bananas se'},
  {image:"/daily/2.png", titulo:'Sin carne por un dia', descripcion:'El consumo de carne blablabla'},
  {image:"/daily/3.png", titulo:'Limpieza de correo', descripcion:'Sabias que si 500 personas eliminan un correo, se reduce blabla'},
  {image:"/daily/4.png", titulo:'Pequenos actos hacen la diferencia', descripcion:'Acciones como recoger 5 papelitos de la calle, ayudan blablabla'},
  {image:"/daily/5.png", titulo:'Desconectemonos por una hora', descripcion:'Una hora sin utilizar eletrodemesticos tiene un efecto directo blablablala'},
  {image:"/daily/3.png", titulo:'Limpiaza de correo', descripcion:'Sabias que si 500 personas eliminan un correo, se reduce blabla'},
]

const selectedChallenge = (c) => {
  console.log(c)
}

const segColors = [
  '#EE4040',
  '#F0CF50',
  '#815CD1',
  '#3DA5E0',
  '#34A24F',
  '#F9AA1F',
  '#EC3F3F',
  '#FF9000'
]

const DailyChallenge = () => {

  const [openChallenge, setOpenChallenge] = useState(false);
  const handleOpenChallenge = () => setOpenChallenge(true);
  const handleCloseChallenge = () => setOpenChallenge(false);
  const [challenge, setChallenge] = useState({})

  const onFinished = (selected) => {
    const index = parseInt(selected)
    const chall = challengeInfo[index]
    setChallenge(chall)
    handleOpenChallenge()

}
  return (
  <>
    <WheelComponent
      segments={dailyChallenges}
      segColors={segColors}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='black'
      contrastColor='white'
      buttonText='Girar'
      isOnlyOnce={false}
      size={200}
      upDuration={100}
      downDuration={1000}
      fontFamily='Sans-serif'
    />
      <TransitionsModal open={openChallenge} onClose={handleCloseChallenge} title={''}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={challenge.image}
          alt="Reto diario"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              {challenge.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {challenge.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </TransitionsModal>
        </>
  )

}

export default DailyChallenge
