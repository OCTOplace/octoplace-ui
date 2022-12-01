/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc } from "../../../connectors/address";
import { Contract } from "@ethersproject/contracts";
import nftAbi from "../../../abi/erc721.json";
import axios from "axios";
import { metadataUrl } from "../../../utils/format-listings";

export const NFTListingCard = (props) => {
  const [imgUrl, setImgUrl] = useState();
  const { view } = props;

  const styles = {
    root: {
      width: "100%",
      bgcolor: "#262626",
      borderRadius: "12px",
      position: "relative",
      color: "white",
      height: view === 3 ? "300px" : "500px",
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover",
      cursor: "pointer",
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%",
      padding: "10px",
    },
    meta: {
      display: "flex",
    },
    title: {
      fontWeight: "500",
      fontSize: "1.1em",
      letterSpacing: "1px",
    },
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
          to={`/nft/${props.listingItem.listingNFT.contractAddress}/${props.listingItem.listingNFT.tokenId}`}
        >
          <Box sx={styles.root}>
            <Box sx={styles.flex}>
              <div style={styles.meta}>
                <Typography sx={styles.title}>
                  {props.listingItem.listingNFT.metadata
                    ? props.listingItem.listingNFT.metadata.name
                    : `${props.listingItem.listingNFT.name} #${props.listingItem.listingNFT.tokenId}`}
                </Typography>
                <VerifiedOutlinedIcon sx={{ ml: "8px" }} />
              </div>
              <Typography>{`#${props.listingItem.listingNFT.tokenId}`}</Typography>
            </Box>
          </Box>
        </Link>
      )}
    </>
  );
};
