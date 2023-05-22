/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";
import { useDispatch } from "react-redux";
import { getMarketNFTDetail } from "../../../redux/thunk/getNftDetail";
import { formatEther } from "@ethersproject/units";

export const NFTMarketCard = ({ view, marketItem }) => {
  const [imgUrl, setImgUrl] = useState();
  const dispatch = useDispatch();

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
    console.log("called1");
    dispatch(
      getMarketNFTDetail({
        contractAddress: marketItem.NFTContractAddress,
        tokenId: marketItem.TokenId,
        listingId: marketItem.Id,
      })
    );
  }, []);
  useEffect(() => {
    if (marketItem && marketItem.nftDetails && marketItem.nftDetails.metadata) {
      try {
        if (marketItem.nftDetails.metadata.image.includes("ipfs://")) {
          let url = marketItem.nftDetails.metadata.image;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(newUrl);
        } else {
          setImgUrl(marketItem.nftDetails.metadata.image);
        }
      } catch {
        setImgUrl("https://thereisnoimage.com/image");
      }
    } else {
      setImgUrl("https://thereisnoimage.com/image");
    }
  }, [marketItem]);

  return (
    <>
      {marketItem && (
        <Link
          className="nft-card-link"
          to={`/nft/${marketItem.Network}/${marketItem.NFTContractAddress}/${marketItem.TokenId}`}
        >
          {/* <Box sx={styles.root}> */}
          <Box sx={styles.root}>
            {marketItem.nftDetails && (
              <img
                src={imgUrl}
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  objectFit: "cover",
                  width: "100%",
                  height: "260px",
                }}
                alt=""
              />
            )}
            {marketItem.nftDetails && marketItem.nftDetails.metadata && (
              <Box sx={styles.content}>
                <Box style={styles.meta}>
                  <Typography className="strokeme" sx={styles.title}>
                    {truncate(
                      marketItem.nftDetails.metadata
                        ? marketItem.nftDetails.metadata.name
                        : `${marketItem.nftDetails.metadata.name} #${marketItem.TokenId}`,
                      15
                    )}
                  </Typography>
                  <img src={verifiedLogo} alt="verified" />
                </Box>
                <Typography
                  sx={styles.network}
                >{`#${marketItem.Network}`}</Typography>
                <Box style={styles.meta}>
                  <Typography>#{marketItem.TokenId}</Typography>
                  <Box style={styles.meta}>
                    <img src={flameLogo} alt="flame" />
                    <Typography>{formatEther(marketItem.Price)}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          {/* </Box> */}
        </Link>
      )}
    </>
  );
};
