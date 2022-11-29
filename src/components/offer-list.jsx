import React from 'react';
import {Box, Typography, Grid} from "@mui/material";
import {FormatListBulleted} from "@mui/icons-material";
export const OfferList = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          border: "1px solid #6C6C6C",
          borderRadius: "12px",
          maxHeight: "560px",
        }}
      >
        <Box sx={{ display: "flex", color: "#f4f4f4", p: 2 }}>
          <FormatListBulleted />
          <Typography sx={{ pl: 2 }}>Offers</Typography>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            pl: 2,
            pr: 2,
            "& .MuiGrid-item": { alignSelf: "center" },
            height: "500px",
            overflow: "scroll",
          }}
        >
          <Grid item xs={4}>
            <Typography>No</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Project</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Floor</Typography>
          </Grid>
          {listData.map((item) => {
            return (
              <>
                <Grid item xs={1}>
                  <Typography>{item.serial}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <img
                    alt="nsbjhvx"
                    src={item.imageSrc}
                    style={{
                      width: "100px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ alignSelf: "center" }}>
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      alignSelf: "center",
                      color: "#6C6C6C",
                      fontSize: "13px",
                    }}
                  >
                    {item.price} ETH
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      alignSelf: "center",
                      bgcolor: "#6C6C6C",
                      borderRadius: "12px",
                      textAlign: "center",
                      fontSize: "14px",
                      lineHeight: "27px",
                      height: "27px",
                    }}
                  >
                    {item.offerId}
                  </Typography>
                </Grid>
              </>
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