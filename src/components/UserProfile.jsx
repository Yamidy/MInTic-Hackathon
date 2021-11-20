import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSession } from '../context/sessionContext'
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import WheelComponent from 'react-wheel-of-prizes'
import TransitionsModal from '../login/TransitionsModal'
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const UserProfile = ({ children }) => {

  // const [profile, setProfile] = useState({})
  const [userData, setUserData] = useState({
    fullName: '',
    currentChallenges: [],
    streak: 0,
    badges: [],
    challengesCompleted: 0,
    dailyChallenge: false
  }
  )
  const { currentUser, getUserprofile } = useSession();
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
  useEffect(() => {
    console.log(currentUser)
    const a = getUserprofile(currentUser.uid)
    a.then((res) => setUserData(res))
    console.log(userData)
    if (!userData) {
      setUserData(
        {
          fullName: '',
          currentChallenges: [],
          streak: 0,
          badges: [],
          challengesCompleted: 0,
          dailyChallenge: false
        }
      )
    }

    // userProfile.then((result) => {
    //   setUserData(result)
    // })
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //


  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
        <Container>
          <Grid container spacing={5} justifyContent='center' display='flex' flexDirection='column' alignItems='center'>
            <Grid item >
              <Avatar
                src={currentUser.photoURL ? currentUser.photoURL : 'http:localhost/broken.png'}
                alt={currentUser.email}
                sx={{ width: 200, height: 200, fontSize: 100 }}
              />
            </Grid>
            <Grid item>
              <Typography variant='h3'>{userData ? userData.fullName : currentUser.email}</Typography>
              <Typography variant='h5'>{currentUser.email}</Typography>
              <EditIcon />
            </Grid>
          </Grid>
        </Container>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Retos Disponibles" {...a11yProps(0)} />
            <Tab label="Mis Retos creados" {...a11yProps(1)} />
            <Tab label="Retos Aceptados" {...a11yProps(2)} />
            <Tab label="Reto diario" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {children}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
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
                {userData ? userData.challengesCompleted : 0}
              </Typography>
            </CardContent>
          </Card >
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
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
                {userData ? userData.streak : 0}
              </Typography>
            </CardContent>
          </Card >
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <WheelComponent
            segments={dailyChallenges}
            segColors={segColors}
            onFinished={(winner) => onFinished(winner)}
            primaryColor='black'
            contrastColor='white'
            buttonText='Girar'
            isOnlyOnce={true}
            size={200}
            upDuration={100}
            downDuration={1000}
            fontFamily='Sans-serif'
          />
        </TabPanel>
      </SwipeableViews>

      <TransitionsModal open={open} onClose={handleClose} title={''}>
        <WheelComponent
          segments={dailyChallenges}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Girar'
          isOnlyOnce={true}
          size={200}
          upDuration={100}
          downDuration={1000}
          fontFamily='Sans-serif'
        />
      </TransitionsModal>
    </>
  )
}

export default UserProfile
