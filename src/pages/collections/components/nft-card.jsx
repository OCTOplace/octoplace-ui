/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import broken from "./../../../assets/broken.png";
import verifiedLogo from "../../../assets/verified.svg";

export const NFTCard = ({ view, nft }) => {
  const [imgUrl, setImgUrl] = useState(broken);
  const [imageLoaded, setImageLoaded] = useState(false);

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
  };

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log("handleImageLoad");
  };

  const handleImageError = () => {
    setImgUrl(broken);
    console.log("handleImageError");
  };

  const fetchImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      setImgUrl(URL.createObjectURL(blob));
      setImageLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let fetchUrl = broken;
    if (nft && nft.metadata) {
      try {
        if (nft.metadata.image.includes("ipfs://")) {
          let url = nft.metadata.image;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(newUrl);
          fetchUrl = newUrl;
        } else {
          setImgUrl(nft.metadata.image);
          fetchUrl = nft.metadata.image;
        }

        // fetchImage(fetchUrl);
      } catch {
        // setImgUrl("https://thereisnoimage.com/image");
        setImgUrl(broken);
      }
    } else {
      // setImgUrl("https://thereisnoimage.com/image");
      setImgUrl(broken);
    }
  }, []);

  return (
    <>
      {nft && (
        <Link
          className="nft-card-link"
          to={`/nft/${nft.network}/${nft.contract_address}/${Number(
            nft.token_id
          )}`}
        >
          {/* <Box sx={styles.root}> */}
          <Box sx={styles.root}>
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
                // display: imageLoaded ? 'block' : 'none',
              }}
              alt="nft_image"
              // loading="lazy"
            />
            <Box sx={styles.content}>
              <Box style={styles.meta}>
                {nft && nft.metadata && (
                  <Typography className="strokeme" sx={styles.title}>
                    {truncate(
                      nft.metadata && nft.metadata.name
                        ? nft.metadata.name
                        : `#${Number(nft.token_id)}`,
                      15
                    )}
                  </Typography>
                )}
                <img src={verifiedLogo} alt="verified" />
              </Box>
              <Typography sx={styles.network}>{`#${nft.network}`}</Typography>
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

// export const NFTCard = memo(MemoNFTCard);

// import { useState } from 'react';
// import { Card, CardMedia } from '@material-ui/core';

// function MyComponent() {
//   const [imageUrl, setImageUrl] = useState('/default-image.jpg');
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   const handleImageError = () => {
//     setImageUrl('/default-image.jpg');
//   };

//   const fetchImage = async () => {
//     try {
//       const response = await fetch('https://example.com/image.jpg');
//       const blob = await response.blob();
//       setImageUrl(URL.createObjectURL(blob));
//       setImageLoaded(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Card>
//       <CardMedia>
//         <img
//           src={imageUrl}
//           alt="Image"
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//           style={{ display: imageLoaded ? 'block' : 'none' }}
//         />
//         <button onClick={fetchImage}>Load Image</button>
//       </CardMedia>
//     </Card>
//   );
// }
