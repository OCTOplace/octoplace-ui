import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveListings } from "../../utils/format-listings";
import { setActiveListings } from "../../redux/slices/listing-slice";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Container } from "react-bootstrap";
import { FacebookRounded } from "@mui/icons-material";

import bgImage from "../../assets/bg-collection.png";
import NFTlist from "./components/NFTlist";
import Content from "./components/Content";
import { NFTDiscussions } from "../../components/discussions/nft-discussions";

function GuestCollection() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);
  const [activeMenu, setActiveMenu] = useState("collection");

  const metadata = {
    name: "E.R.V Gandalf #54",
    description: "E.R.V Gandalf 2930 Unique NFT Collection.",
    image:
      "https://ipfs.io/ipfs/bafybeieo45rmgccoldjv6mq426zb5xnpqmvoifp2z4xfzwmq2hkffnmpje/54.png",
    dna: "88553cc70d9f4eaea8e3d7380fe3e160458a1458",
    edition: 54,
    date: 1656787121637,
    attributes: [
      {
        trait_type: "Background",
        value: "Blue Lightning ",
      },
      {
        trait_type: "Base",
        value: "Base ",
      },
      {
        trait_type: "Robe",
        value: "Robe 2 Purple ",
      },
      {
        trait_type: "Familiar",
        value: "Lizard Bright Green ",
      },
      {
        trait_type: "Beard",
        value: "Red Wide Beard ",
      },
      {
        trait_type: "Eyebrows",
        value: "White Eyebrows ",
      },
      {
        trait_type: "Eyes",
        value: "Normal Eyes ",
      },
      {
        trait_type: "Hat",
        value: "Black ",
      },
      {
        trait_type: "Staff",
        value: "Crystal Purple ",
      },
      {
        trait_type: "Mouth",
        value: "Normal ",
      },
    ],
    compiler: "HashLips Art Engine",
  };

  const styles = {
    container: {},
    background: {
      width: "100vw",
      height: "50vh",
      objectFit: "cover",
    },
    overlayContainer: {
      // height: "50vh",
      marginTop: "-10vh",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      zIndex: 3,
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: 3,
    },
    image: {
      width: "160px",
      height: "160px",
    },
    whiteButton: {
      backgroundColor: "#F78C09",
      color: "#262626",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    row: {
      display: "flex",
      gap: 1,
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
      color: "#F4F4F4",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#F4F4F4",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.125rem",
      color: "#F4F4F4",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.125rem",
      color: "#6C6C6C",
    },
    icon: {
      color: "#f4f4f4",
      fontSize: "1.5rem",
    },
    statsRow: {
      display: "flex",
      gap: 2,
      ml: "5rem",
      my: 2,
    },
    statsCol: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0.5,
    },
    rowAbout: {
      display: "flex",
      gap: 5,
      my: 2,
    },
    aboutContent: {
      flex: 1,
    },
    menu: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      width: "100%",
      my: 2,
    },
    activeButton: {
      fontWeight: 400,
      fontSize: "1.5rem",
      color: "#F4F4F4",
      textTransform: "none",
      textDecoration: "underline",
      textUnderlinePosition: "under",
      textDecorationColor: "#f78c09",
      textUnderlineOffset: ".2rem",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#f78c09",
      },
    },
    regularButton: {
      fontWeight: 400,
      fontSize: "1.5rem",
      color: "#F4F4F4",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#f78c09",
      },
    },
  };

  useEffect(() => {
    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }
  }, [listings]);

  return (
    <Box>
      <img
        src={bgImage}
        alt="bg-image"
        style={{
          width: "100vw",
          height: "45vh",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Box style={styles.overlayContainer}>
            <Box sx={styles.imageContainer}>
              <img
                src={listings[0]?.listingNFT?.metadata?.image}
                alt="profileImage"
                sx={styles.image}
                width="180px"
                height="180px"
              />
              <Box sx={styles.column}>
                <Typography sx={styles.h1}>
                  {listings[0]?.listingNFT?.name}
                </Typography>
                <Typography sx={styles.h3}>
                  {listings[0]?.listingNFT?.contractAddress}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.column}>
              <Button sx={styles.whiteButton} variant="contained">
                Mint
              </Button>
              <Box sx={styles.row}>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
                <IconButton>
                  <FacebookRounded sx={styles.icon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={styles.statsRow}>
            <Box sx={styles.statsCol}>
              <Typography sx={styles.h2}>888</Typography>
              <Typography sx={styles.h3}>Items</Typography>
            </Box>
            <Box sx={styles.statsCol}>
              <Typography sx={styles.h2}>583</Typography>
              <Typography sx={styles.h3}>Owners</Typography>
            </Box>
            <Box sx={styles.statsCol}>
              <Typography sx={styles.h2}>183,000</Typography>
              <Typography sx={styles.h3}>Volume</Typography>
            </Box>
            <Box sx={styles.statsCol}>
              <Typography sx={styles.h2}>4900</Typography>
              <Typography sx={styles.h3}>Floor</Typography>
            </Box>
            <Box sx={styles.statsCol}>
              <Typography sx={styles.h2}>348</Typography>
              <Typography sx={styles.h3}>Comments</Typography>
            </Box>
          </Box>
          <Box sx={styles.rowAbout}>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>About</Typography>
              <Typography sx={styles.h5}>
                {listings[0]?.listingNFT?.metadata?.description}
              </Typography>
            </Box>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>Recent messages</Typography>
            </Box>
          </Box>
          <Box sx={styles.menu}>
            <Button
              onClick={() => setActiveMenu("collection")}
              sx={
                activeMenu === "collection"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Collection
            </Button>
            <Button
              onClick={() => setActiveMenu("content")}
              sx={
                activeMenu === "content"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Content
            </Button>
            <Button
              onClick={() => setActiveMenu("discussion")}
              sx={
                activeMenu === "discussion"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Discussion
            </Button>
          </Box>

          {activeMenu === "collection" && (
            <NFTlist activeListings={activeListings} view={view} />
          )}
          {activeMenu === "content" && (
            <Content activeListings={activeListings} view={view} />
          )}
          {activeMenu === "discussion" && (
            <NFTDiscussions
              metadata={metadata}
              address={`0xA366C1E80642Abcaa190Ed4Fd7C9bA642228053b`}
              tokenId={54}
              chainId={`kava`}
              isAccordion={false}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default GuestCollection;
