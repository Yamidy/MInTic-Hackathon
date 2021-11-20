import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSession } from '../context/sessionContext'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import TransitionsModal from '../Modals/TransitionsModal'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IngresarReto from '../IngresarReto/IngresarReto';
import UpdateProfile from './UpdateProfile';


import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DailyChallenge from './DailyChallenge'
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

  const [openIngresarReto, setOpenIngresarReto] = useState(false);
  const handleOpenIngresarReto = () => setOpenIngresarReto(true);
  const handleCloseIngresarReto = () => setOpenIngresarReto(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  return (
    <>
      <Paper sx={{ p: 2,  flexGrow: 1 }}>
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
              <Typography variant='h3'>{currentUser.displayName || currentUser.email}</Typography>
              <Typography variant='h5'>{currentUser.email}</Typography>
              <Button onClick={handleOpenUpdate} >
              <EditIcon />
              </Button>
            </Grid>
          </Grid>
        </Container>
        <AppBar position="static" sx={{marginTop:5}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Retos de la comunidad" {...a11yProps(0)} />
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
          <Button variant='contained' color='secondary' startIcon={<AddIcon />} sx={{marginBottom:5}} onClick={handleOpenIngresarReto}>
            Agregar Reto
          </Button>
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
          <DailyChallenge />
                 </TabPanel>
      </SwipeableViews>

      <TransitionsModal open={openIngresarReto} onClose={handleCloseIngresarReto} title=''>
        <IngresarReto />
      </TransitionsModal>

      <TransitionsModal open={openUpdate} onClose={handleCloseUpdate} title={''}>
        <UpdateProfile />
      </TransitionsModal>
    </>
  )
}

export default UserProfile
