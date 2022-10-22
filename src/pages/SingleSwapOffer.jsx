import { Box, Button, Grid, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { styled } from '@mui/material/styles';

export const SingleSwapOffer = () => {

    const OutlinedButton = styled(Button)(({ theme }) => ({
        color: '#f4f4f4',
        backgroundColor: '#3d3d3d',
        border: '1px solid #f4f4f4',
        borderRadius: '12px',
        padding: '10px 72px',
        lineHeight: '24px',
        textTransform: 'none',
        width: '248px',
        margin: '8px 16px',
        '&:hover': {
          backgroundColor: '#f4f4f4',
          color: '#3d3d3d'
        },
    }));

    const ContainedButton = styled(Button)(({ theme }) => ({
        color: '#3d3d3d',
        backgroundColor: '#f4f4f4',
        border: '1px solid #f4f4f4',
        borderRadius: '12px',
        padding: '10px 72px',
        lineHeight: '24px',
        margin: '8px 16px',
        width: '248px',
        '&:hover': {
            backgroundColor: '#3d3d3d',
            color: '#f4f4f4'
        },
    }));

    const displayCard = () => {
        return (
            <Box sx={{bgcolor:'#262626', height:'278px', width:'100%', borderRadius:'12px', p:2}}>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Box sx={{bgcolor:'#6c6c6c', height:'156px', width:'156px', borderRadius:'12px'}}>

                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{fontWeight:'bold'}}>Project Title</Typography>
                        <Typography variant='subtitle1'>#8126</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{alignSelf:'end'}}>
                        <Typography>
                            Quantity &nbsp;
                            <span style={{backgroundColor:'#f4f4f4', borderRadius:'12px', color:'#3d3d3d', padding: '4px 8px'}}>1</span>
                        </Typography>
                    </Grid>
                </Grid>
                <Typography sx={{mt:4, fontSize:'16px', pl:1, fontWeight:'700'}}>
                    OWNER ID
                </Typography>
                <Typography sx={{mt: 2, bgcolor:'#3d3d3d', color:'#f4f4f4', borderRadius:'12px', lineHeight: '36px', pl:2}}>
                    your wallet 810r1jf01fj 1k10i018289d
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{maxWidth:'1280px', m:'16px auto', height:'100%', color:'#f4f4f4', marginTop:'32px'}}>
            <Typography sx={{cursor: 'pointer'}}>
                {'<'} Back to Portfolio
            </Typography>
            <Typography sx={{fontSize:'20px', mt:4, fontWeight:'bold', mb:2}}>
                SWAP OFFER #8192
            </Typography>
            <Grid container spacing={2} sx={{mt:{xs: 3, md:6}}}>
                <Grid item xs={12} md={5}>
                    {displayCard()}
                </Grid>
                <Grid item xs={12} md={2} sx={{alignSelf:' center', textAlign:'center', textAlign:'-webkit-center'}}>
                    <div style={{
                        width: '53px', height: '53px', background: '#F4F4F4', borderRadius: '26px'
                    }}>
                        <CachedIcon sx={{color:'#3d3d3d', mt:1}} fontSize='large'/>
                    </div>
                </Grid>
                <Grid item xs={12} md={5}>
                    {displayCard()}
                </Grid>
            </Grid>
            <Box sx={{display:'flex', flexWrap:'wrap', justifyContent: 'center', pt: {xs: 3, md: 6}}}>
                <OutlinedButton variant='outlined'>Decline</OutlinedButton>
                <ContainedButton variant='outlined'>SWAP</ContainedButton>
            </Box>
        </Box>
    )
}