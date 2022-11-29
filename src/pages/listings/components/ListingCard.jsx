/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {Box,Typography }from "@mui/material"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { JsonRpcProvider } from '@ethersproject/providers';
import { rpc } from '../../../connectors/address';
import { Contract } from '@ethersproject/contracts';
import nftAbi from "../../../abi/erc721.json"
import axios from 'axios';
import { metadataUrl } from '../../../utils/format-listings';

export const NFTListingCard = (props) => {
    const [imgUrl, setImgUrl] = useState();
    const [collectionName, setCollectionName] = useState("");
    const [metadata, setMetadata] = useState();
    const [nft, setNft] = useState({metadata: undefined, collectionName: "", tokenId: 1, contractAddress: ""})
    const {view}=props;
    const { contractAddress} = nft;
    const {tokenAddress, tokenId} = props.listingItem;

    useEffect(() => {
        getDetails();
    }, [])
    const getDetails = async () => {
        try{
            const provider = new JsonRpcProvider(rpc);
            const contract = new Contract(tokenAddress, nftAbi, provider);
            const colame = await contract.name(); 
            setCollectionName(colame);
            const uri = await contract.tokenURI(tokenId);
            const data = await (await axios.get(metadataUrl(uri))).data;
            setMetadata(data);
        }catch{

        }
    }
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
            cursor: "pointer"
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
    }, [metadata])
    return (
      <>
        <Link className='nft-card-link' to={`/nft/${tokenAddress}/${tokenId}`}>
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
        </Link>
      </>
    );
  };