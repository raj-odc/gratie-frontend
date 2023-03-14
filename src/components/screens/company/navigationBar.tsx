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

import Link from 'next/link';

const pages = [{page: 'Subscription', link: '/subscription'}, {page: 'Create Token', link: '/token'}, 
               {page: 'Create Users', link: '/create'}, {page: 'Profile', link: '/profile'}];

export default function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div style={{flexGrow: 1}}>
      <AppBar className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display:'flex' ,margin:'auto', mt:2 }}>
              <Box  sx={{ display:'flex', margin:'auto', pr:3}}>
              <img width={70} height={70} alt='logo' src='/images/Favicon.png' className='logo-icon'/>
              <img width={105} height={95} alt='logo' src='/images/Logo.png' />
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
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}