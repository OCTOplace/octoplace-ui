/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Link } from "react-router-dom";
import broken from "./../../../assets/broken.png";

import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";

export const CollectionCard = (props) => {
  const { collectionItem, view } = props;
  const boxRef = useRef(null);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [titleLength, setTitleLength] = useState(0);
  const [imgUrl, setImgUrl] = useState(broken);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    function handleResize() {
      const boxRect = boxRef.current.getBoundingClientRect();
      if (boxRect.top < window.innerHeight && boxRect.bottom > 0) {
        // Box is currently visible in viewport, update size
        setBoxSize({
          width: boxRef.current.offsetWidth,
          height: boxRef.current.offsetHeight,
        });
        setTitleLength(Math.floor(boxRef.current.offsetWidth / 18));
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncate = (text, maxLength) => {
    let realLength = titleLength;
    if (realLength === 0) {
      realLength = boxRef.current
        ? Math.floor(boxRef.current.offsetWidth / 15)
        : 15;
    }
    if (text.length > realLength) {
      return text.substring(0, realLength) + "...";
    }
    return text;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImgUrl(broken);
  };

  useEffect(() => {
    setImgUrl(collectionItem.image);
  }, [props.collectionItem]);

  return (
    <>
      {props.collectionItem &&
        props.collectionItem.contractAddress !== "none" && (
          <Link
            className="nft-card-link"
            to={`/collection/${collectionItem.contractAddress}`}
          >
            <Box ref={boxRef} sx={styles.root}>
              <img
                src={imgUrl}
                onLoad={handleImageLoad}
                onError={handleImageError}
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
                    {truncate(collectionItem.name, 15)}
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
      {props.collectionItem &&
        props.collectionItem.contractAddress === "none" && (
          <Box ref={boxRef} sx={styles.root}>
            <img
              src={broken}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                // borderTopLeftRadius: "0.75rem",
                // borderTopRightRadius: "0.75rem",
                borderRadius: "0.75rem",
                objectFit: "cover",
                width: view === 3 ? "200px" : "100%",
                aspectRatio: "1/1.3",
              }}
              alt="nft_image"
              loading="lazy"
            />
          </Box>
        )}
    </>
  );
};
