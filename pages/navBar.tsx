import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import ToggleButtonNotEmpty from './toggleMenu';
import Link from 'next/link';


const pages = [{page: 'Use Case', link: '#useCase'}, {page: 'Pricing', link: '#price'}, {page: 'Community', link: '#community'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
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
      <AppBar className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display:'flex' ,margin:'auto', mt:2 }}>
              <Box  sx={{ display:'flex', margin:'auto', pr:3}}>
                <Link style={{ display:'flex'}} href='/'>
                  <img width={70} height={70} alt='logo' src='/images/Favicon.png' className='logo-icon'/>
                  <img width={105} height={95} alt='logo' src='/images/Logo.png' />
                </Link>
              </Box>
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
                    <MenuItem key={page.link} onClick={handleCloseNavMenu} sx={{pr:10}}>
                      <Typography textAlign="center">{page.page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link href={page.link} className="navbar-link">
                  <Button
                    key={page.link}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', paddingX:2, fontSize:'20px', mt:3 }}
                  >
                    {page.page}
                  </Button>
                  </Link>
                ))}
              </Box>
              <Box sx={{ display:'flex' ,margin:'auto', paddingX: 2, pr:10  }}>
                <ToggleButtonNotEmpty />
              </Box>
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;