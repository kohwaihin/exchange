import { Outlet, Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [{ title: 'Favourite', linkElement: 'MyFavourite' }, { title: 'About Us', linkElement: 'AboutUs' }];

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              My Exchange
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page.title} to={`/${page.linkElement}`} style={{ textDecoration: 'none', color: 'white' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mr: 3,
                      display: { xs: 'none', md: 'flex' },
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: '.1rem',
                      color: 'inherit',
                      textAlign: "center"
                    }}
                  >{page.title}</Typography>
                </Link>
              ))}
            </Box>


          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />


    </>
  )
};

export default Layout;