/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import broken from "./../../../assets/broken.png";

import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";

export const CollectionCard = (props) => {
  const [imgUrl, setImgUrl] = useState(broken);
  const { collectionItem, view } = props;

  const styles = {
    root: {
      boxSizing: "border-box",
      color: "#fff",
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: ".75rem",
      cursor: "pointer",
      width: "100%",
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
  };

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    if (collectionItem && collectionItem.bannerUrl) {
      try {
        if (collectionItem.bannerImage) {
          setImgUrl(process.env.REACT_APP_API_URL + collectionItem.bannerImage);
        } else if (collectionItem.bannerUrl.includes("ipfs://")) {
          let url = collectionItem.bannerUrl;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(newUrl);
        } else {
          setImgUrl(collectionItem.bannerUrl);
        }
      } catch {
        setImgUrl(broken);
      }
    } else {
      setImgUrl(broken);
    }
  }, [props.collectionItem]);

  return (
    <>
      {props.collectionItem && (
        <Link
          className="nft-card-link"
          to={`/collections/${collectionItem.network}/${collectionItem.collectionAddress}`}
        >
          <Box sx={styles.root}>
            <img
              src={imgUrl}
              style={{
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                objectFit: "cover",
                width: view === 3 ? "200px" : "100%",
                aspectRatio: "1/1",
              }}
              alt="nft_image"
              loading="lazy"
            />
            <Box sx={styles.content}>
              <Box style={styles.meta}>
                <Typography className="strokeme" sx={styles.title}>
                  {truncate(collectionItem.collectionName, 15)}
                </Typography>
                <img src={verifiedLogo} alt="verified" />
              </Box>
              <Typography
                sx={styles.network}
              >{`#${collectionItem.network}`}</Typography>
            </Box>
          </Box>
        </Link>
      )}
    </>
  );
};
