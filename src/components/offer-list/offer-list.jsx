/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Box, Typography, Grid, Accordion, AccordionSummary } from "@mui/material";
import { ExpandMore, FormatListBulleted } from "@mui/icons-material";
import { useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatOffers } from "../../utils/format-listings";
import { OfferItem } from "./offer-item";
import { getNetworkInfo } from "../../connectors/networks";

export const OfferList = (props) => {

  const styles = {
    accordion2: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid  #6C6C6C",
      borderRadius: "5px",
      marginBottom: "24px"
    },
  }

  const { listingId, network } = props;
  const [offers, setPOffers] = useState([]);
  const getAllOffers = async () => {
    const net = getNetworkInfo(network);
    const provider = new JsonRpcProvider(net.dataNetwork.RPC);
    const contract = new Contract(net.dataNetwork.SWAP_CONTRACT, net.dataNetwork.SWAP_ABI, provider);
    const offer = await contract.readAllOffers();
    setPOffers(formatOffers(offer).filter((x) => x.listingId === listingId));
  };
  useEffect(() => {
    if (listingId) {
      getAllOffers();
    }
  }, [listingId]);
  return (
    <Accordion sx={styles.accordion2}>
      <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "700", alignItems:"center", display:"flex" }}>
                <FormatListBulleted /> &nbsp;&nbsp;Offers
              </Typography>
            </AccordionSummary>
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        border: "1px solid #6C6C6C",
        paddingBottom: "24px",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        maxHeight: "470px",
        overflowY: "scroll"
      }}
    >
      
      <Grid
        container
        spacing={1}
        sx={{
          pl: 1,
          pr: 0,
          overflow: "hidden",
        }}
      >
        <Grid
          item
          sx={{ borderBottom: "1px solid #6c6c6c", pb: 2, mt: 2 }}
          xs={4}
        >
          <Typography sx={{ ml: 1 }}>#</Typography>
        </Grid>
        <Grid
          item
          sx={{ borderBottom: "1px solid #6c6c6c", pb: 2, mt: 2 }}
          xs={2}
        >
          <Typography>TokenId</Typography>
        </Grid>
        <Grid
          item
          sx={{ borderBottom: "1px solid #6c6c6c", pb: 2, mt: 2 }}
          xs={6}
        >
          <Typography>Collection</Typography>
        </Grid>
        {
          offers
          .filter(
            (x) =>
              x.isDeclined === false &&
              x.isCancelled === false &&
              x.isCompleted === false
          ).length === 0 && (
            <Grid item xs={12} >
              <Typography>No available offers.</Typography>
            </Grid>
          )
        }
        {offers
          .filter(
            (x) =>
              x.isDeclined === false &&
              x.isCancelled === false &&
              x.isCompleted === false
          )
          .map((item, index) => {
            return (
              <OfferItem network={network} serial={index + 1} key={item.offerId} offer={item} />
            );
          })}
      </Grid>
    </Box>
    </Accordion>
  );
};
