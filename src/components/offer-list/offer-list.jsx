/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore, FormatListBulleted } from "@mui/icons-material";
import { useEffect } from "react";
import { OfferItem } from "./offer-item";

export const OfferList = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const styles = {
    accordion2: {
      backgroundColor: "transparent",
      color: expanded ? "#f4f4f4" : "#6c6c6c",
      border: "1px solid  #6C6C6C",
      borderRadius: ".5rem",
      marginBottom: "1rem",
      "&:hover": {
        border: "1px solid #f4f4f4",
        color: "#f4f4f4",
      },
      "&:hover .MuiSvgIcon-root": {
        color: "#f4f4f4",
      },
    },
    accordionHeader: {
      fontWeight: 400,
      fontsize: "1.125rem",
      lineHeight: "105.02%",
    },
    accordionBody: {
      backgroundColor: "#151515",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      maxHeight: "470px",
      overflowY: "scroll",
      borderRadius: ".5rem",
    },
    tableItem: {
      borderBottom: "1px solid #6c6c6c",
      pb: 2,
      mt: 2,
    },
  };

  const {  network, offers } = props;

  return (
    <Accordion
      sx={styles.accordion2}
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMore sx={{ color: expanded ? "#f4f4f4" : "#6c6c6c" }} />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={styles.accordionHeader}>
          <FormatListBulleted /> &nbsp;&nbsp;Offers
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={styles.accordionBody}>
        <Grid container spacing={1}>
          <Grid item sx={styles.tableItem} xs={2}>
            <Typography>No</Typography>
          </Grid>
          <Grid item sx={styles.tableItem} xs={2}>
            <Typography>title</Typography>
          </Grid>
          <Grid item sx={styles.tableItem} xs={2}>
            <Typography>#</Typography>
          </Grid>
          <Grid item sx={styles.tableItem} xs={4}>
            <Typography>Collection Name</Typography>
          </Grid>
          <Grid item sx={styles.tableItem} xs={2}></Grid>

          {offers.length === 0 && (
            <Grid item xs={12}>
              <Typography>No available offers.</Typography>
            </Grid>
          )}

          {offers
            .map((item, index) => {
              return (
                <OfferItem
                  network={network}
                  serial={index + 1}
                  key={item.offerDetails.offerId}
                  offer={item}
                />
              );
            })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
