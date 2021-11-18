import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Button  from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TransitionsModal from '../login/TransitionsModal';

import Drawer from '@mui/material/Drawer';






function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {


    
//Barra lateral responsive: =====================================
const drawerWidth = 240;

const { window } = props;
const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};

const drawer = (
  <div >
      <Box sx={{ my: 2 }}>
            Barra lateral      
      </Box>
  </div>
);

const container = window !== undefined ? () => window().document.body : undefined;

/// ==========================================================================



///estado para el botón de desplegar el modal del login: ==================================

const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


///========================================================================================

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ecologicapp
            </Typography>
            <Button color="inherit">
            <Typography>
              Registrarse
            </Typography>
            </Button>
            <Button color="inherit" onClick={handleOpen} >
            <Typography>
              Ingresar
            </Typography>
            </Button>
            <Button color="inherit">
            <Typography>
              Usuario Anónimo
            </Typography>
            <AccountCircleIcon />
            </Button>
              
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <TransitionsModal open = {open} onClose = {handleClose}/>
      
      <Container>
        <Box sx={{ my: 2 }}>
           {props.children}        
        </Box>
      </Container>
    </React.Fragment>

    
  );
}
