/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import brokenImage from "./../../../assets/broken.png";
import verifiedLogo from "../../../assets/verified.svg";

export const NFTCard = ({ view, nft }) => {
  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {}, [nft]);

  return (
    <>
      {nft && nft.name && nft.contractAddress !== "none" && (
        <Link
          className="nft-card-link"
          to={`/nft/${nft.contractAddress}/${Number(nft.tokenId)}`}
        >
          {/* <Box sx={styles.root}> */}
          <Box sx={styles.root}>
            <Box
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                backgroundSize: "cover",
                width: view === 3 ? "200px" : "100%",
                aspectRatio: "1/1",
                backgroundImage: `url(${brokenImage})`,
              }}
            >
              <img
                src={nft.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")} //const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
                onError={(event) => (event.target.style.display = "none")}
                style={{
                  borderTopLeftRadius: "0.75rem",
                  borderTopRightRadius: "0.75rem",
                  objectFit: "cover",
                  width: view === 3 ? "200px" : "100%",
                  aspectRatio: "1/1",
                }}
              />
            </Box>
            <Box sx={styles.content}>
              <Box style={styles.meta}>
                <Typography className="strokeme" sx={styles.title}>
                  {truncate(nft.name, 15)}
                </Typography>
                <img src={verifiedLogo} alt="verified" />
              </Box>
              <Typography sx={styles.network}>{`#${
                nft.network ? nft.network : "theta"
              }`}</Typography>
              <Box style={styles.meta}>
                <Typography>#{Number(nft.tokenId)}</Typography>
              </Box>
              {/* <Box style={styles.verified}>
                <img src={verifiedLogo} alt="verified" />
              </Box> */}
            </Box>
          </Box>
          {/* </Box> */}
        </Link>
      )}
      {nft && nft.contractAddress === "none" && (
        <Box sx={styles.root}>
          <Box
            style={{
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              backgroundSize: "cover",
              width: view === 3 ? "200px" : "100%",
              aspectRatio: "1/1",
              backgroundImage: `url(${brokenImage})`,
            }}
          >
            <img
              src={brokenImage}
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                objectFit: "cover",
                width: view === 3 ? "200px" : "100%",
                aspectRatio: "1/1",
              }}
            />
          </Box>
          <Box sx={styles.content}>
            <Box style={styles.loading}>
              <Typography className="strokeme">Loading ...</Typography>
            </Box>
            <Box style={styles.verified}></Box>
          </Box>
        </Box>
      )}
    </>
  );
};

const styles = {
  root: {
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    mb: 1,
    border: "1px solid transparent", // Add transparent border
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
  },
  network: {
    fontSize: ".625em",
    fontWeight: "400",
    color: "#6C6C6C",
  },
  verified: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: ".5rem",
    paddingTop: "10px",
  },
  loading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: ".875em",
    letterSpacing: "1px",
  },
};

export default NFTCard;
