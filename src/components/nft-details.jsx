import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Chip, Box } from '@mui/material';
import {  ExpandMore, ListAlt } from '@mui/icons-material';
export const NFTDetails = ({metadata}) => {
    const styles = {
        accordion2: {
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid  #6C6C6C",
          borderRadius: "5px",
          marginBottom: "24px"
        },
        chip: {
          color: "white",
          marginRight: "4px",
          marginLeft: "4px",
          marginBottom: "8px",
        },
        detailsBox:{
            width: "100%",
            display:"flex",
            flexDirection: "column",
            alignItems: "center"
        },
        row:{
            display:"flex",
            flexDirection: "row",
            alignItems: "center"
        }
      };
    return (
        <Accordion sx={styles.accordion2} variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "700", alignItems:"center", display:"flex" }}>
                <ListAlt /> &nbsp;&nbsp;Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.detailsBox}>
                <Box sx={styles.row}>
                    <Box ></Box>
                    <Box></Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
    )
}