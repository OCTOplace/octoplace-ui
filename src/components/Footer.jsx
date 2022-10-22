import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Fragment } from 'react'

export const Footer = () => {
    const style = {
        box: {
            maxWidth: '1280px',
            width: '100%',
            display:'flex',
            margin: '16px auto 0px auto',
            justifyContent: 'space-between'
        }
    }
    return (
        <Fragment>
            <Box
                sx={{...style.box}}
            >
                <Box sx={{display:'flex', justifyContent:'space-around'}}>  
                    <Typography sx={{mr: 2, fontWeight:'bold'}}>Subscribe</Typography>
                    <Typography sx={{fontSize: '12px', alignSelf: 'center'}}>Join our mailing service</Typography>
                </Box>
                <span>
                    Join the community
                </span>
            </Box>
            <Box
                sx={style.box}
            >
                <Box sx={{
                    display:'flex',
                    justifyContent:'space-around',
                    '& .MuiTextField-root': {

                    },
                    '& .MuiInputLabel-root': {
                        color:'#3d3d3d',
                        fontSize: '0.8rem'
                    },
                    '& .MuiOutlinedInput-root': {
                        border: '0.5px solid #f4f4f4',
                        borderRadius: '12px',
                        width: '400px',
                        bgcolor: '#f4f4f4',
                        p: '0px 8px'
                    }
                }}>  
                    <TextField
                        label='Your email address'
                        size='small'
                    />
                    <Button
                        sx={{color:'#f4f4f4',
                        borderRadius: '12px',
                        border: '1px solid #f4f4f4',
                        ml: 2,
                        p: '0px 16px'
                    }}
                    >Sign Up</Button>
                </Box>
                <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <CheckBoxOutlineBlankIcon />
                    <CheckBoxOutlineBlankIcon />
                    <CheckBoxOutlineBlankIcon />
                    <CheckBoxOutlineBlankIcon />
                    <CheckBoxOutlineBlankIcon />
                </Box>
            </Box>
            <Divider sx={{...style.box, bgcolor: '#f4f4f4', m:'24px auto'}} />
            <Box
                sx={{...style.box, paddingBottom: '16px'}}
            >
                <Box sx={{display:'flex', justifyContent:'space-around'}}>  
                    <Typography sx={{mr: 1, fontSize: '12px'}}>&#169; 2022</Typography>
                    <Typography sx={{fontSize: '12px', alignSelf: 'center'}}>SkeletonArts.Studio</Typography>
                </Box>
                <Box sx={{display:'flex', justifyContent:'space-around'}}>  
                    <Typography sx={{mr: 3, fontSize: '12px'}}>Provicy Policy</Typography>
                    <Typography sx={{fontSize: '12px', alignSelf: 'center'}}>Terms of Service</Typography>
                </Box>
            </Box>
        </Fragment>
    )
}