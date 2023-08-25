/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";
import ThetaLogo from '../../../assets/chains/thetaLogo.svg'
import KavaLogo from '../../../assets/chains/kavaLogo.svg'

export const NFTListingCard = (props) => {
  const [imgUrl, setImgUrl] = useState();
  const { view } = props;

  const styles = {
    root: {
      boxSizing: "border-box",
      color: "#fff",
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: ".75rem",
      cursor: "pointer",
      width: "100%",
      border: "1px solid transparent", // Add transparent border
      marginBottom: "1rem",
      "&:hover": {
        border: "1px solid #F78C09",
        boxSizing: "border-box",
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
      textWrap: "nowrap"
    },
    network: {
      width: '24px',
      height: '24px'
    },
  };

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    if (props.listingItem && props.listingItem.listingNFT.metadata) {
      try {
        if (props.listingItem.listingNFT.metadata.image.includes("ipfs://")) {
          let url = props.listingItem.listingNFT.metadata.image;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(newUrl);
        } else {
          setImgUrl(props.listingItem.listingNFT.metadata.image);
        }
      } catch {
        setImgUrl("https://thereisnoimage.com/image");
      }
    } else {
      setImgUrl("https://thereisnoimage.com/image");
    }
  }, [props.listingItem]);

  return (
    <>
      {props.listingItem && (
        <Link
          className="nft-card-link"
          to={`/nft/${props.listingItem.listingNFT.network}/${props.listingItem.listingNFT.contractAddress}/${props.listingItem.listingNFT.tokenId}`}
        >
          <Box sx={styles.root}>
            <img
              src={imgUrl}
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                objectFit: "cover",
                width: "100%",
                aspectRatio: "1/1",
              }}
              alt="nft_image"
              loading="lazy"
            />
            <Box sx={styles.content}>
              <Box style={styles.meta}>
                <Typography className="strokeme" sx={styles.title}>
                  {truncate(
                    props.listingItem.listingNFT.metadata
                      ? props.listingItem.listingNFT.metadata.name
                      : `${props.listingItem.listingNFT.name} #${props.listingItem.listingNFT.tokenId}`,
                    10
                  )}
                </Typography>
                <img src={verifiedLogo} alt="verified" />
              </Box>
              {/* <Typography
                sx={styles.network}
              >{`#${props.listingItem.listingNFT.network}`}</Typography> */}
              <img style={styles.network}  src={props.listingItem.listingNFT.network === "kava"? KavaLogo : ThetaLogo} alt="network" />
              <Box style={styles.meta}>
                <Typography>#{props.listingItem.listingNFT.tokenId}</Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      )}
    </>
  );
};
