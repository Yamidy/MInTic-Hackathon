import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSession } from '../context/sessionContext'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import WheelComponent from 'react-wheel-of-prizes'
import TransitionsModal from '../login/TransitionsModal'
import Button from '@mui/material/Button';

const UserProfile = () => {

  // const [profile, setProfile] = useState({})
  const [userData, setUserData] = useState(null)
  const { currentUser, userProfile } = useSession();
  const dailyChallenges = ['Sin energia por una hora',
    'Dia sin comer carne',
    'Limpieza de emails',
    'Salva la banana solitaria',
    'otro mas',
    'a'
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
  const onFinished = (winner) => {
    alert(winner)
  }
  // const [loading, setLoading] = useState(true)

  console.log(userProfile)
  userProfile.then((result) => {
    setUserData(result)
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!userData) {
    return (
      <div>Cargando</div>
    )
  }
  return (
    <>
      <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
        <Container>
          <Grid container spacing={5} justifyContent='space-between'>
            <Grid item justifyContent='center'>
              <Avatar

                src={currentUser.photoURL ? currentUser.photoURL : 'http:localhost/broken.png'}
                alt={currentUser.email}
                sx={{ width: 200, height: 200, fontSize: 100 }}
              />
            </Grid>
            <Grid item>
              <Grid item>
                <Typography variant='h3'>{userData.fullName}</Typography>
                <Typography variant='h5'>{currentUser.email}</Typography>
                <EditIcon />
              </Grid>
              <Grid display='flex' justifyContent='space-between'>
                <Card sx={{ width: '30%' }} >
                  <CardMedia
                    component='img'
                    image='https://image.freepik.com/free-vector/cartoon-jungle-background_52683-61450.jpg'
                    height={50}
                  />
                  <CardContent>
                    <Typography>
                      Retos Completados
                    </Typography>
                    <Typography>
                      {userData.challengesCompleted}
                    </Typography>
                  </CardContent>
                </Card >
                <Card >
                  <CardMedia
                    component='img'
                    image='https://image.freepik.com/free-vector/cartoon-jungle-background_52683-61450.jpg'
                    height={50}
                  />
                  <CardContent>
                    <Typography>
                      Mi racha
                    </Typography>
                    <Typography>
                      {userData.streak}
                    </Typography>
                  </CardContent>
                </Card >
                <Card >
                  <CardMedia
                    component='img'
                    image='https://image.freepik.com/free-vector/cartoon-jungle-background_52683-61450.jpg'
                    height={50}
                  />
                  <CardContent>
                    <Typography>
                      Mi racha
                    </Typography>
                    <Typography>
                      {userData.streak}
                    </Typography>
                  </CardContent>
                </Card >
              </Grid>
            </Grid>
            <Grid alignItems='center' justifyContent='center' display='flex'>
              <Button color="inherit" onClick={handleOpen}>
                <Typography>
                  Reto diario
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <TransitionsModal open={open} onClose={handleClose} title={''}>
        <WheelComponent
          segments={dailyChallenges}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Girar'
          isOnlyOnce={true}
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily='Arial'
        />
      </TransitionsModal>
    </>
  )
}

export default UserProfile
