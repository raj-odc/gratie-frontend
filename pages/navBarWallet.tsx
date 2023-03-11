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

import ToggleButtonNotEmpty from './toggleMenu';

import ConnectWallet from "../src/views/WalletView/connectWallet";


function NavBarWallet() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [visibleWallet, setVisibleWallet] = React.useState(false);

  React.useEffect(() => setVisibleWallet(true));

  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="fixed"  style={{ background: '#000', boxShadow: 'none', alignItems: 'center'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display:'flex' ,margin:'auto', mt:4 }} className='navbarContainer'>
              <Box  sx={{ display:'flex', margin:'auto'}} className='navbarLogos'>
              <img className='logo' alt='logo' src='/images/Favicon.png' />
              <img className='logo-text' alt='logo' src='/images/Logo.png' />
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                {visibleWallet ? <ConnectWallet/> : null}
              </Box>
              
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBarWallet;