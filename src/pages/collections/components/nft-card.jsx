/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import verifiedLogo from "../../../assets/verified.svg";

export const NFTCard = ({view, nft}) => {
  const [imgUrl, setImgUrl] = useState();

  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: ".5rem",
      color: "#fff",
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: "12px",
      cursor: "pointer",
      width: "100%",
      "&:hover": {
        border: "1px solid #F78C09",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "#262626",
      borderBottomLeftRadius: ".75rem",
      borderBottomRightRadius: ".75rem",
      width: "100%",
    },
    meta: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: ".5rem",
    },
    title: {
      fontWeight: "500",
      fontSize: ".875em",
      letterSpacing: "1px",
    },
    network: {
      fontSize: ".625em",
      fontWeight: "400",
      color: "#6C6C6C",
    },
  };

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    if (nft && nft.metadata) {
      try {
        if (nft.metadata.image.includes("ipfs://")) {
          let url = nft.metadata.image;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(newUrl);
        } else {
          setImgUrl(nft.metadata.image);
        }
      } catch {
        setImgUrl("https://thereisnoimage.com/image");
      }
    } else {
      setImgUrl("https://thereisnoimage.com/image");
    }
  }, [nft]);


  return (
    <>
      {nft && (
        <Link
          className="nft-card-link"
          to={`/nft/${nft.network}/${nft.contract_address}/${Number(nft.token_id)}`}
        >
          {/* <Box sx={styles.root}> */}
          <Box sx={styles.root}>
            <img
              src={imgUrl}
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                objectFit: "cover",
                width: view === 3 ? "200px" : "100%",
                // width: "100%",
                aspectRatio: "1/1",
              }}
              alt="nft_image"
              loading="lazy"
            />
            <Box sx={styles.content}>
              <Box style={styles.meta}>
                <Typography className="strokeme" sx={styles.title}>
                  {truncate(
                    nft.metadata
                      ? nft.metadata.name
                      : `#${Number(nft.token_id)}`,
                    15
                  )}
                </Typography>
                <img src={verifiedLogo} alt="verified" />
              </Box>
              <Typography
                sx={styles.network}
              >{`#${nft.network}`}</Typography>
              <Box style={styles.meta}>
                <Typography>#{Number(nft.token_id)}</Typography>
                
              </Box>
            </Box>
          </Box>
          {/* </Box> */}
        </Link>
      )}
    </>
  );
};
