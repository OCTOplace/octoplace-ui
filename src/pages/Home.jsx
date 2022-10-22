import { Box, Grid } from '@mui/material'

export const Home = () => {
    return (
        <Box sx={{display:'flex', maxWidth:'1280px', m:'8px auto', height:'100%'}}>
            <Grid container spacing={2} sx={{ alignItems:'stretch'}}>
                <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{bgcolor:'#6C6C6C', p:2,m :2, height:'100%', borderRadius:'12px', color:'#f4f4f4'}}>
                        <div style={{textAlign:'center'}}>
                            Active
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{bgcolor:'#262626', p:2, m:2, height:'100%', borderRadius:'12px', color:'#f4f4f4'}}>
                        <div style={{textAlign:'center'}}>
                            Listing
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}