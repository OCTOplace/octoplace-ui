/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";
import { useDispatch } from "react-redux";
import { getMarketNFTDetail } from "../../../redux/thunk/getNftDetail";
import broken from "./../../../assets/broken.png";
import ThetaLogo from "../../../assets/chains/thetaLogo.svg";
import KavaLogo from "../../../assets/chains/kavaLogo.svg";

export const NFTMarketCard = ({ view, marketItem }) => {
  const [imgUrl, setImgUrl] = useState();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

  const styles = {
    root: {
      boxSizing: "border-box",
      color: "#fff",
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: ".75rem",
      cursor: "pointer",
      width: "100%",
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
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    network: {
      width: "24px",
      height: "24px",
    },
    price: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: ".5rem",
      marginTop: ".5rem",
    },
  };

  // const truncate = (text, maxLength) => {
  //   if (text.length > maxLength) {
  //     return text.substring(0, maxLength) + "...";
  //   }
  //   return text;
  // };

  useEffect(() => {
    if (!marketItem.nftDetails) {
      dispatch(
        getMarketNFTDetail({
          contractAddress: marketItem.nftContract,
          tokenId: marketItem.tokenId,
          listingId: marketItem.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (marketItem && marketItem.nftDetails && marketItem.nftDetails.metadata) {
      try {
        if (marketItem.nftDetails.metadata.image.includes("ipfs://")) {
          let url = marketItem.nftDetails.metadata.image;
          const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImgUrl(`https://wsrv.nl/?url=${newUrl}&w=200&h=200&fit=outside`);
        } else {
          setImgUrl(
            `https://wsrv.nl/?url=${marketItem.nftDetails.metadata.image}&w=200&h=200&fit=outside`
          );
        }
      } catch {
        setImgUrl("Loading");
      }
    } else {
      setImgUrl("Loading");
    }
    if (marketItem) {
      import(
        `../../../assets/marketplaces/${marketItem.marketplace_Symbol}.svg`
      )
        .then((image) => {
          setImageSrc(image.default);
        })
        .catch(() => {
          import(`../../../assets/marketplaces/OCTOPLACE.svg`).then(
            (defaultImage) => {
              setImageSrc(defaultImage.default);
            }
          );
        });
    }
  }, [marketItem]);

  return (
    <>
      {marketItem && (
        <Link
          className="nft-card-link"
          to={`/nft/${marketItem.network}/${marketItem.nftContract}/${marketItem.tokenId}`}
        >
          <Box sx={styles.root}>
            <div>
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  margin: ".5rem",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
                src={imageSrc}
                alt="marketplace"
              />
              {imgUrl && imgUrl !== "Loading" ? (
                <>
                <img
                  src={imgUrl}
                  onLoad={() => {setImgLoaded(true)}}
                  onError={() => {setImgLoaded(false); setImageSrc(broken)}}
                  style={{
                    borderTopLeftRadius: ".75rem",
                    borderTopRightRadius: ".75rem",
                    objectFit: "cover",
                    width: view === 3 ? "200px" : "100%",
                    aspectRatio: "1/1",
                    display: imgLoaded ? 'block' : "none"
                  }}
                  loading="lazy"
                  alt="nft-artwork"
                />
                {!imgLoaded && imageSrc!=="Loading" && (
                  <img
                  src={broken}
                  style={{
                    borderTopLeftRadius: ".75rem",
                    borderTopRightRadius: ".75rem",
                    objectFit: "cover",
                    width: view === 3 ? "200px" : "100%",
                    aspectRatio: "1/1",
                  }}
                  loading="lazy"
                  alt="nft-artwork"
                />
                )}
                </>
              ) : (
                <Skeleton variant="rectangular" width={view === 3 ? "200px" : "100%"} height={"200px"} animation="wave" />
                
              )}
            </div>

            {(marketItem.nftDetails && marketItem.nftDetails.metadata) && (
              <Box sx={styles.content}>
                <Box style={styles.meta}>
                  <Typography className="strokeme" sx={styles.title}>
                    {marketItem.nftDetails.metadata
                      ? marketItem.nftDetails.metadata.name
                      : `${marketItem.nftDetails.metadata.name} #${marketItem.tokenId}`}
                  </Typography>
                  <img src={verifiedLogo} alt="verified" />
                </Box>
                {/* <img
                  style={styles.network}
                  src={marketItem.network === "kava" ? KavaLogo : ThetaLogo}
                  alt="network"
                /> */}
                {/* <Typography
                  sx={styles.network}
                >{`#${marketItem.Network}`}</Typography> */}
                <Box style={styles.price}>
                  <img
                    style={styles.network}
                    src={marketItem.network === "kava" ? KavaLogo : ThetaLogo}
                    alt="network"
                  />
                  <Box style={styles.meta}>
                    <img src={flameLogo} alt="flame" />
                    <Typography>{marketItem.price}</Typography>
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
