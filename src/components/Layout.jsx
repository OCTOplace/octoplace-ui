import { Box } from '@mui/material';
import { Footer } from './Footer';
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <Box sx={{height: '100%', width:'100%'}}>
      <Box sx={{width:'100vw', height:'100vh', bgcolor: '#3d3d3d', display: 'flex', flexDirection: 'column'}}>
        <Navbar />
        <Box sx={{flexGrow:1, overflow:'auto'}}>
          {children}
        </Box>
        <Box sx={{width: '100%', color:'#f4f4f4'}}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
