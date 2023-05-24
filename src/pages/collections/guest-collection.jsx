/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Container } from "react-bootstrap";
import {
  FacebookRounded,
  Facebook,
  Telegram,
  Twitter,
  Instagram,
  YouTube,
  Edit,
  Settings,
} from "@mui/icons-material";
import twitter from "./../../assets/twitter.svg";
import telegram from "./../../assets/telegram.svg";
import bgImage from "../../assets/bg-collection.png";
import NFTlist from "./components/NFTlist";
import Content from "./components/Content";
import { NFTDiscussions } from "../../components/discussions/nft-discussions";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCollection } from "../../redux/slices/collections-slice";
import { getAllCollectionNFTs } from "../../redux/thunk/get-collection-nfts";
import { getCollectionSettings } from "../../redux/thunk/get-collection-setting";
import { BsMedium } from "react-icons/bs";
import { FaDiscord, FaTiktok, FaYoutube } from "react-icons/fa";

function GuestCollection() {
  const dispatch = useDispatch();
  const { network, collectionSlug } = useParams();
  const collections = useSelector((state) => state.collection.collections);
  const selectedCollection = useSelector(
    (state) => state.collection.selectedCollection
  );
  const settings = useSelector(
    (state) => state.collection.selectedCollectionSetting.settings
  );
  const isSettingsLoading = useSelector(
    (state) => state.collection.selectedCollectionSetting.isLoading
  );
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);
  const [isOwner, setIsOwner] = useState(false);
  const [activeMenu, setActiveMenu] = useState("collection");
  const navigate = useNavigate();

  useEffect(() => {
    if (collections.length > 0) {
      const result = collections.find(
        (item) => item.collection_id === collectionSlug
      );
      dispatch(setSelectedCollection(result));
      dispatch(getAllCollectionNFTs(result.type_id));
      dispatch(
        getCollectionSettings({ address: result.type_id, network: network })
      );
    }
  }, [collections]);

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
      webkitClipPath:
        "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%,71% 100%, 29% 100%, 0% 71%, 0% 29%)",
      clipPath:
        "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%,71% 100%, 29% 100%, 0% 71%, 0% 29%)",
      // filter drop shadow
      filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.25))",
    },
    orangeButton: {
      backgroundColor: "#F78C09",
      color: "#262626",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    whiteButton: {
      backgroundColor: "#F4F4F4",
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
      gap: 0.25,
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
      fontSize: "1.625rem",
    },
    iconImg: {
      color: "#f4f4f4",
      height: "2.1rem",
      width: "2.1rem",
    },
    statsRow: {
      display: "flex",
      gap: 2,
      ml: "3rem",
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
      display: "flex",
      flexDirection: "column",
      gap: 1,
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

  return (
    <Box>
      <img
        src={
          settings && settings.BannerImage ? Buffer.from(settings.BannerImage).toString() : selectedCollection.image_url
        }
        alt="collection-avatar"
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
                src={settings && settings.Avatar ? Buffer.from(settings.Avatar).toString() :selectedCollection.image_url}
                alt="profileImage"
                // sx={styles.image}
                className="octagon-image"
                width="180px"
                height="180px"
              />
              <Box sx={styles.column}>
                <Typography sx={styles.h1}>
                  {settings && settings.CollectionName ?settings.CollectionName : selectedCollection.name}
                </Typography>
                <Typography sx={styles.h3}>
                  {selectedCollection.type_id}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.column}>
              {/* <Button sx={styles.orangeButton} variant="contained">
                Mint
              </Button> */}
              {settings && (
                <Box sx={styles.row}>
                  {settings.Telegram && (
                    <IconButton LinkComponent={"a"} href={settings.Telegram}>
                      <Telegram sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Twitter && (
                    <IconButton LinkComponent={"a"} href={settings.Twitter}>
                      <Twitter sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Discord && (
                    <IconButton LinkComponent={"a"} href={settings.Discord}>
                      <FaDiscord color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Facebook && (
                    <IconButton LinkComponent={"a"} href={settings.Facebook}>
                      <Facebook sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Instagram && (
                    <IconButton LinkComponent={"a"} href={settings.Instagram}>
                      <Instagram sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Youtube && (
                    <IconButton LinkComponent={"a"} href={settings.Youtube}>
                      <FaYoutube color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.Medium && (
                    <IconButton LinkComponent={"a"} href={settings.Medium}>
                      <BsMedium color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {settings.TikTok && (
                    <IconButton LinkComponent={"a"} href={settings.TikTok}>
                      <FaTiktok color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}

                  <IconButton onClick={() => {
                    navigate(`/collections/settings/${settings.Network}/${settings.CollectionAddress}`)
                  }}>
                    <Settings color="#fff" sx={styles.icon} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={styles.statsRow}>
              <Box sx={styles.statsCol}>
                <Typography sx={styles.h2}>
                  {selectedCollection.totalItems}
                </Typography>
                <Typography sx={styles.h3}>Items</Typography>
              </Box>
              {/* <Box sx={styles.statsCol}>
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
              </Box> */}
              <Box sx={styles.statsCol}>
                <Typography sx={styles.h2}>348</Typography>
                <Typography sx={styles.h3}>Comments</Typography>
              </Box>
            </Box>
            {isOwner && (
              <Button sx={styles.whiteButton}>Collection settings</Button>
            )}
          </Box>
          <Box sx={styles.rowAbout}>
            <Box sx={styles.aboutContent}>
              {!isSettingsLoading && settings && settings.AboutText && (
                <>
                  <Typography sx={styles.h2}>About</Typography>
                  <Typography sx={styles.h5}>{settings.AboutText}</Typography>
                </>
              )}
            </Box>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>Recent messages</Typography>
              <NFTDiscussions
                address={0xa366c1e80642abcaa190ed4fd7c9ba642228053b}
                tokenId={54}
                chainId={`kava`}
                isAccordion={false}
              />
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
            <NFTlist nfts={selectedCollection.nfts} view={view} />
          )}
          {activeMenu === "content" && (
            <Content activeListings={activeListings} view={view} />
          )}
          {activeMenu === "discussion" && (
            <NFTDiscussions
              address={0xa366c1e80642abcaa190ed4fd7c9ba642228053b}
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
