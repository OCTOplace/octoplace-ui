/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import broken from "./../../../assets/broken.png";
import verifiedLogo from "../../../assets/verified.svg";
import flameLogo from "../../../assets/flame.svg";
import { useDispatch } from "react-redux";
import { getMarketNFTDetail } from "../../../redux/thunk/getNftDetail";
import ThetaLogo from "../../../assets/chains/thetaLogo.svg";
import KavaLogo from "../../../assets/chains/kavaLogo.svg";
import { Container } from "react-bootstrap";

export const NFTMarketCard = ({ view, marketItem }) => {
  const [imgUrl, setImgUrl] = useState();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isImgLoadFailed, setImgLoadFailed] = useState(false);

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
      if (marketItem.nftDetails.metadata.image.includes("ipfs://")) {
        let url = marketItem.nftDetails.metadata.image;
        const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
        setImgUrl(`https://wsr.nl/?url=${newUrl}&w=200&h=200&fit=outside`);
      } else {
        setImgUrl(`https://wsrv.nl/?url=${marketItem.nftDetails.metadata.image}&w=200&h=200&fit=outside`);
      }
    }

    if (marketItem) {
      import(`../../../assets/marketplaces/${marketItem.marketplace_Symbol}.svg`)
        .then((image) => { setImageSrc(image.default); })
        .catch(() => {
          import(`../../../assets/marketplaces/OCTOPLACE.svg`).then(
            (defaultImage) => { setImageSrc(defaultImage.default); }
          );
        });
    }
  }, [marketItem]);

  useEffect(() => {
    if (isImgLoadFailed) {
      setImgUrl(broken);
    }
  }, [isImgLoadFailed]);
  return (
    <>
      {marketItem && (
        <Link
          className="nft-card-link"
          to={`/nft/${marketItem.network}/${marketItem.nftContract}/${marketItem.tokenId}`}
        >
          <Box sx={styles.root}>
            <div>
              {imageSrc && (
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
              )}
              {imgUrl && imgUrl !== "Loading" ? (
                <>
                  <img
                    src={imgUrl}
                    onLoad={() => { setImgLoaded(true); }}
                    onError={() => { setImgLoadFailed(true); }}
                    style={{
                      borderTopLeftRadius: ".75rem",
                      borderTopRightRadius: ".75rem",
                      objectFit: "cover",
                      width: view === 3 ? "200px" : "100%",
                      aspectRatio: "1/1",
                      display: imgLoaded ? "block" : "none",
                    }}
                    alt="nft-artwork"
                  />
                  {!imgLoaded && !isImgLoadFailed && (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        borderTopLeftRadius: ".75rem",
                        borderTopRightRadius: ".75rem",
                        aspectRatio: "1/1",
                      }}
                      width={view === 3 ? "200px" : "100%"}
                      height={"195px"}
                    />
                  )}
                </>
              ) : (
                <Box>
                  <Skeleton
                    variant="rectangular"
                    width={view === 3 ? "200px" : "100%"}
                    height={"200px"}
                    animation="wave"
                  />
                  <Container>
                    <Box height={"78px"}>
                      <Skeleton variant="text" />
                    </Box>
                  </Container>
                </Box>
              )}
            </div>

            {marketItem.nftDetails && marketItem.nftDetails.metadata && (
              <Box sx={styles.content}>
                <Box style={styles.meta}>
                  <Typography className="strokeme" sx={styles.title}>
                    {marketItem.nftDetails.metadata
                      ? marketItem.nftDetails.metadata.name
                      : `${marketItem.nftDetails.metadata.name} #${marketItem.tokenId}`}
                  </Typography>
                  <img src={verifiedLogo} alt="verified" />
                </Box>
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
