import { Box, Button, Grid, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { styled } from '@mui/material/styles';

export const SingleSwapComplete = () => {

    const ContainedButton = styled(Button)(({ theme }) => ({
        color: '#3d3d3d',
        backgroundColor: '#f4f4f4',
        border: '1px solid #f4f4f4',
        borderRadius: '12px',
        fontWeight: 'bold',
        padding: '10px 72px',
        lineHeight: '24px',
        margin: '8px 16px',
        textTransform: 'none',
        width: '298px',
        '&:hover': {
            backgroundColor: '#3d3d3d',
            color: '#f4f4f4'
        },
    }));

    const displayCard = () => {
        return (
            <Box sx={{bgcolor:'#262626', height:'278px', width:'248px', borderRadius:'12px', p:2}}>
                <Box sx={{bgcolor:'#6c6c6c', height:'208px',borderRadius:'12px'}}>

                </Box>
                <Typography sx={{mt:4, fontSize:'16px', pl:1, fontWeight:'700'}}>
                    OWNER ID
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{maxWidth:'1280px', m:'16px auto', height:'100%', color:'#f4f4f4'}}>
            <Typography sx={{fontSize:'20px', mt:6, fontWeight:'bold', mb:3, textAlign:'center'}}>
                SWAP COMPLETE
            </Typography>
            <Grid container sx={{mt:{xs: 3, md:6, p:0}}}>
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={3}>
                    {displayCard()}
                </Grid>
                <Grid item xs={12} md={2} sx={{alignSelf:'center'}}>
                    <div style={{
                        width: '53px', height: '53px', background: '#F4F4F4', borderRadius: '26px', textAlign:'center',marginLeft:'auto', marginRight:'auto'
                    }}>
                        <CachedIcon sx={{color:'#3d3d3d', mt:1}} fontSize='large'/>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    {displayCard()}
                </Grid>
                <Grid item xs={12} md={2}>
                </Grid>
            </Grid>
            <Box sx={{display:'flex', flexWrap:'wrap', justifyContent: 'center', pt: {xs: 3, md: 6}}}>
                <ContainedButton variant='outlined'>Back to PortFolio</ContainedButton>
            </Box>
        </Box>
    )
}