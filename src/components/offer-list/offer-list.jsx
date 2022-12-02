/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Box, Typography, Grid, Divider} from "@mui/material";
import { FormatListBulleted} from "@mui/icons-material";
import { useEffect } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { rpc, swapContract } from '../../connectors/address';
import { Contract } from '@ethersproject/contracts';
import swapAbi from "../../abi/swap.json";
import {formatOffers} from "../../utils/format-listings"
import { OfferItem } from './offer-item';
import { useDispatch } from 'react-redux';
import { setOffers } from '../../redux/slices/listing-slice';

export const OfferList = (props) => {
  const {listingId} = props;
  const [offers, setPOffers] = useState([]);
  const dispatch = useDispatch();

  const getAllOffers = async () => {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    const offer = await contract.readAllOffers();
    setPOffers(formatOffers(offer).filter(x => x.listingId === listingId));
    const result = formatOffers(offer);
    dispatch(setOffers(result));

  }
  useEffect(() => {
    if(listingId){
      getAllOffers();
    }
  }, [listingId])
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          border: "1px solid #6C6C6C",
          borderRadius: "12px",
          paddingBottom: "24px"
        }}
      >
        <Box sx={{ display: "flex",borderBottom: "1px solid #6c6c6c", color: "#f4f4f4", p: 2 }}>
          <FormatListBulleted />
          <Typography sx={{ pl: 2 }}>Offers</Typography>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            pl: 1,
            pr: 0,
            overflow: "scroll",
          }}
        >
          <Grid item sx={{borderBottom: "1px solid #6c6c6c", pb:2, mt:2}} xs={4}>
            <Typography sx={{ml: 1}}>#</Typography>
          </Grid>
          <Grid item sx={{borderBottom: "1px solid #6c6c6c", pb:2, mt:2}} xs={2}>
            <Typography>TokenId</Typography>
          </Grid>
          <Grid item sx={{borderBottom: "1px solid #6c6c6c", pb:2, mt:2}} xs={6}>
            <Typography>Collection</Typography>
          </Grid>
          
          {offers.map((item, index) => {
            return (
              
                <OfferItem serial={index+1} key={item.offerId} offer={item} />
              
            );
          })}
        </Grid>
      </Box>
    );
  };


  const listData = [
    {
      serial: "1",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "2",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENG2",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "3",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA3",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "4",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA4",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "5",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA5",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "6",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA6",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "7",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA7",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "18",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA8",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "19",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA9",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "20",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA20",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "13",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA3",
      price: "0.15",
      offerId: "2345",
    },
    {
      serial: "15",
      imageSrc:
        "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
      name: "RENGA5",
      price: "0.15",
      offerId: "2345",
    },
  ];