import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import mainLogo from '../Assets/Images/mainlogo.png'
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './investornavbar.css';

import {useEffect, useState} from 'react';
import { storage, db , auth} from '../Assets/Database/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Translate } from '@mui/icons-material';

import { useNavigate, Link } from 'react-router-dom';
import { fontSize } from '@mui/system';

const pages = [
    { id: 1, text: 'Lets Invest', path: '/homepagei' },
    { id: 2, text: 'About', path: '/about' },
    { id: 3,text: 'Contact', path: '/' },
  ];
  
// const pages = ['Lets invest', 'About', 'Contact'];
// const settings = ['Profile', 'Settings', 'Dashboard', 'Logout'];
const settings = [
  { id: 4, text: 'Account', path: '/usersetting' },
  { id: 5, text: 'Profile', path: '/about' },
  { id: 6,text: 'Logout', path: '/' },
];







function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
    useEffect(() => {

        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
 
        const user = auth.currentUser;
        
          localStorage.setItem('user', JSON.stringify(user));
        }

   
        const imageRef = ref(storage, user.uid + '/profilepicture');
    
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.error('Failed to retrieve profile picture:', error);
          });
      }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => () => {
   
    
    setAnchorElNav(null);
    
    navigate(path);
  };

  const handleCloseUserMenu = ({id,path}) => () => {

    if(id === 6){
      localStorage.clear();
      signOut(auth);
   
    }

    else{
    setAnchorElUser(null);
    
    navigate(path);
    }
  };

  return (
    <AppBar position="fixed" sx={{ background: "#063970", paddingTop:'10px', paddingBottom:'10px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img  className='websiteLogo' style={{ }} src={mainLogo}  alt="GrowthCAP-logo"/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/homepagei"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'poppins',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GrowthCAP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu(page.path)}>
                <Typography textAlign="center">{page.text}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon src={mainLogo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              paddingLeft:'6%',
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GrowthCAP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                // component={Link}
                // to={page.path}
                onClick={handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight:'600' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

        
          <Box sx={{paddingRight:'30px',display: { xs: 'none', md: 'flex' } }}>
          <IconButton sx={{ fontSize: '30px' }} size="large" aria-label="new-mail" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
            <IconButton
              size="large"
              aria-label="new-notification"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
           
          </Box>
        

          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                    alt='profilepic'
                    src={url}
                    sx={{ width: 60, height: 60}}
                 />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu({path: setting.path, id: setting.id})}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;