import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import {  ExpandMore, ListAlt } from '@mui/icons-material';
import { shortenAddress } from '../utils/string-util';

export const NFTDetails = ({metadata, address, tokenId, chainId}) => {
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
            alignItems: "center",
            width: "100%",
            marginBottom: "8px"
        },
        left:{
          display:"flex",
          width:"100%",
          justifyContent: "flex-start"
        },
        right: {
          display: "flex",
          width:"100%",
          justifyContent: "flex-end"
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
                    <Box sx={styles.left}>Contract Address</Box>
                    <Box sx={styles.right}>{shortenAddress(address)}</Box>
                </Box>
                <Box sx={styles.row}>
                    <Box sx={styles.left}>Token ID</Box>
                    <Box sx={styles.right}>{tokenId}</Box>
                </Box>
                <Box sx={styles.row}>
                    <Box sx={styles.left}>Token Standard</Box>
                    <Box sx={styles.right}>ERC-721</Box>
                </Box>
                <Box sx={styles.row}>
                    <Box sx={styles.left}>Chain</Box>
                    <Box sx={styles.right}>{chainId.toUpperCase()}</Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
    )
}