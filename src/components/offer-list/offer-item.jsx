/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export const OfferItem = (props) => {
  const { offer, serial, network } = props;
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Grid
        onClick={() => navigate(`/swap/${network}/${offer.offerDetails.offerId}`)}
        container
        spacing={1}
        sx={{
          ml: 1,
          pb: 1,
          pr: 0,
          mt: 2,
          mr: 1,
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#6c6c6c",
          },
        }}
      >
        <Grid item sx={{ ml: 1 }} xs={1}>
          <Typography>{serial}</Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            alt="nsbjhvx"
            src={offer.offerNFT.metadata.image}
            style={{
              width: "100px",
              maxHeight: "100px",
              objectFit: "cover",
              borderRadius: "12px",
              display: imgLoaded ? "block" : "none",
            }}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && (
            <Box
              sx={{
                width: "100px",
                height: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ alignSelf: "center" }}>
            {offer.offerDetails.offerTokenId}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography
            sx={{
              alignSelf: "center",
              color: "white",
              fontSize: "15px",
            }}
          >
            {offer.offerNFT.metadata.name}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};
