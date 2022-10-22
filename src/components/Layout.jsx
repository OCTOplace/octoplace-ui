import { Box } from '@mui/material';
import { Footer } from './Footer';
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <Box sx={{height: '100vh', minHeight: '720px', position: 'relative', bgcolor: '#3d3d3d'}}>
      <Navbar />
      <div>{children}</div>
      <Box sx={{position: 'absolute', bottom: 0, width: '100%', color:'#f4f4f4', mb: 2}}>
        <Footer />
      </Box>
    </Box>
  );
};
