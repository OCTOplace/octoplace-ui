import React from 'react'
import {Box,Typography }from "@mui/material"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from 'react';
import { useState } from 'react';


export const NFTCard = (props) => {
    const [imgUrl, setImgUrl] = useState();
    const {view}=props;
    const {metadata, collectionName, tokenId} = props.nft;
    const styles = {
        root:{
            width: "100%",
            bgcolor: "#262626",
            borderRadius: "12px",
            position: "relative",
            color: "white",
            height: (view===3 ? "300px": "500px"),
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
        },
        flex:{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'flex-end',
            height:"100%",
            padding: '10px'
        }, 
        meta:{
            display: "flex"
        },
        title:{
            fontWeight: "500",
            fontSize: "1.1em",
            letterSpacing: "1px"
        }
    }
    
    
    useEffect(() => {
        if(metadata){
            if(metadata.image.includes("ipfs://")){
                let url = metadata.image;
                const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
                console.log("New Url:", newUrl)
                setImgUrl(newUrl);
            }
            else{
                setImgUrl(metadata.image)
            }
        }else{
            setImgUrl("https://thereisnoimage.com/image")
        }
    }, [])
    return (
      <>
        <Box
          sx={styles.root}
        >
          <Box sx={styles.flex} >
            <div style={styles.meta}>
              <Typography sx={styles.title}>{(metadata ? metadata.name : `${collectionName} #${tokenId}` )}</Typography>
              <VerifiedOutlinedIcon sx={{ml: "8px"}}/>
            </div>
            <Typography>{`#${tokenId}`}</Typography>
          </Box>
        </Box>
      </>
    );
  };