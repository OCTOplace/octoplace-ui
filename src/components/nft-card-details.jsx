import React, {useState} from 'react'
import { Box, CircularProgress,Chip, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { VerifiedOutlined, FavoriteBorder, ExpandMore, Label } from "@mui/icons-material";
import { getImageUrl, shortenAddress } from '../utils/string-util';
import { useEffect } from 'react';

export const NFTCardDetails = (props) => {
    const {metadata, tokenId, owner} = props;
  const [imgLoaded, setImgLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAnimation, setAnimation] = useState(false);
  const [imgUrl, setUrl] = useState("");
    const styles = {
        card: {
          width: "100%",
          maxWidth: "100%",
          bgcolor: "#6C6C6C",
          borderRadius: "12px",
        },
        nftImg: {
          width: "100%",
          height: "100%",
          maxHeight: "500px",
          objectFit: "cover",
          display: `${imgLoaded ? "block" : "none"}`,
        },
        imgBox: {
          width: "100%",
          height: "500px",
          backgroundColor: "#3c3c3c",
        },
        metabox: {
          display: "flex",
          justifyContent: "space-between",
          pl: 2,
          pr: 2,
        },
        p: {
          paddingLeft: "16px",
          paddingRight: "16px",
          color: "#262626",
        },
        spanAddress: {
          paddingLeft: "16px",
          fontWeight: "bold",
          fontSize: "16px",
          color: "#fff",
          cursor: "pointer",
        },
        attBox: {
          width: "100%",
          borderRadius: 2,
          justifyContent: "space-between",
        },
        accordion: {
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid #fff",
          borderRadius: "5px",
        },
        accordion2: {
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid  #6C6C6C",
          borderRadius: "5px",
        },
        chip: {
          color: "white",
          marginRight: "4px",
          marginLeft: "4px",
          marginBottom: "8px",
        },
      };
    useEffect(()=> {
      if(metadata){
        try{
          if(metadata.image){
            setUrl(getImageUrl(metadata.image))
          }else if(metadata.aimation_url){
            setAnimation(true);
            setUrl(getImageUrl(metadata.animation_url))
          }
        }catch(e){
          setUrl("");
        }
      }
    }, [metadata]);
    return (
      <>
        <Box sx={styles.card}>
          <Box sx={{ p: 2 }}>
            {metadata && <img
              alt="kjbhv"
              src={imgUrl}
              style={styles.nftImg}
              onLoad={() => setImgLoaded(true)}
            />}
            {!imgLoaded && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={styles.imgBox}
              >
                <CircularProgress color="primary" />
              </Box>
            )}
          </Box>
          <Box sx={styles.metabox}>
            <div style={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                {metadata ? metadata.name : props.name}
              </Typography>
              <VerifiedOutlined />
            </div>
            <FavoriteBorder />
          </Box>
          <Typography sx={{ pl: 2 }}>{`#${tokenId}`}</Typography>
          <p style={styles.p}>
            owned by{" "}
            <span
              style={styles.spanAddress}
              onClick={() =>
                window.open(
                  `https://explorer.thetatoken.org/account/${owner}`,
                  "_blank"
                )
              }
            >
              {owner === "" ? "" : shortenAddress(owner)}
            </span>
          </p>
          <p style={styles.p}>{metadata ? metadata.description : ""}</p>
          <div style={{ padding: "16px" }}>
            <Box sx={styles.attBox}>
              <Accordion sx={styles.accordion} variant="outlined">
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: "700" }}>
                    <Label /> &nbsp;&nbsp;Properties
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {metadata &&
                    metadata.attributes &&
                    metadata.attributes.map((attribute) => {
                      return (
                        <Chip
                          label={`${attribute.trait_type} : ${attribute.value}`}
                          sx={styles.chip}
                          key={attribute.trait_type}
                          variant="outlined"
                        />
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            </Box>
          </div>
        </Box>
      </>
    );
  };