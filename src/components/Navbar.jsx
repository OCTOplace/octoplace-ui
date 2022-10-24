import { AppBar, Container, Box, Button, Toolbar, Typography } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import logo from "../assets/logo.png";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    border:'0.5px solid #f4f4f4',
    borderRadius:'12px'
  },
}));

export const Navbar = () => {
  const pages = ['Listings', 'Swap', 'Auction'];
  return (
    <AppBar position="static" sx={{bgcolor:'#3D3D3D', boxShadow: 'none', height:'80px', pt:1}}>
        <Container maxWidth="xl" sx={{
          paddingTop: '0px',
          '& .MuiToolbar-root':{
              paddingLeft: {xs: '0px', md:'32px', lg:'80px'},
              paddingRight: {xs: '0px', md:'32px', lg:'80px'},
              margin: '8px auto'
          },
          '& .MuiBox-root':{
              justifyContent: 'center'
          },
        }}>
            <Toolbar sx={{maxWidth:'1280px', display: { md: 'flex'}, justifyContent: {xs: 'space-between'}}}>
                <Box sx={{display:'flex'}}>
                  <img src={logo} alt="logo icon" style={{width: '3%', height:'auto', minWidth:'48px',marginRight: '16px'}}/>
                  <Typography sx={{fontSize:'32px', fontWeight:'bold'}}>octo</Typography>
                </Box>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
                    {pages.map((page, index) => (
                        <Button
                            key={index}
                            sx={{
                              color:'#fff',
                              textTransform:'none',
                              fontWeight: '500',
                              fontSize: '18px',
                              mr: 2
                            }}
                        >
                          {page}
                        </Button>
                    ))}
                </Box>
                <>
                    <Typography sx={{bgcolor:'#fff', borderRadius: '16px', color: '#3d3d3d', p:'8px 16px'}}>Connect Wallet</Typography>
                </>
            </Toolbar>
        </Container>
    </AppBar>
)
};
