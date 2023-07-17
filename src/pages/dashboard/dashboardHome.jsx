import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveListings } from "../../utils/format-listings";
import { setActiveListings } from "../../redux/slices/listing-slice";
import { getCollectionOwner } from "../../redux/thunk/get-collection-owner";
import { useWeb3React } from "@web3-react/core";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Container } from "react-bootstrap";
import { ContentCopy, FacebookRounded } from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaTiktok, FaInstagram, FaDiscord } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import BuildIcon from "@mui/icons-material/Build";
import {
  fetchUserSetting,
  fetchUserTopNFTs,
} from "../../redux/thunk/user-setting";
import bgImage from "../../assets/GrayBackground.jpeg";
import ppImage from "../../assets/pp.png";
import NFTlist from "./components/NFTlist";
import Content from "./components/Content";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { Link } from "react-router-dom";

function DashboardHome() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const myNFTs = useSelector((state) => state.myNFT.nfts);
  const [topNFTs, setTopNFTs] = useState({});
  const [myNFTListings, setMyNFTListings] = useState([]);
  const [view, setView] = useState(2);
  const [isOwner, setIsOwner] = useState(false);
  const [activeMenu, setActiveMenu] = useState("nft");
  const { account, chainId } = useWeb3React();
  const [userSetting, setUserSetting] = useState({});
  const [loading, setLoading] = useState(true);

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
      width: "100%",
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
      WebkitClipPath:
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
      gap: 0.5,
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
      marginTop: "0.7rem",
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
      color: "#6C6C6C",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#f78c09",
      },
    },
    rightColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 1,
    },
    rightRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
    },
    orangeText: {
      color: "#F78C09",
      fontSize: "1.5rem",
      marginLeft: 2,
    },
    copyButton: {
      color: "#6C6C6C",
      fontSize: ".75rem",
    },
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchUserSetting(account);
        setUserSetting(fetchedData);

        const topNFTs = await fetchUserTopNFTs(account);
        setTopNFTs(topNFTs);

        setLoading(false);
      } catch (error) {
        // Handle error here, e.g. show an error message
        console.log("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();

    // if (myNFTs.length > 0) {
    //   setMyNFTListings(transformData(myNFTs));
    // }

    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }

    dispatch(getCollectionOwner({ address: account, network: "theta" }));
  }, []);

  function transformData(nfts) {
    return nfts.map((nft) => {
      const item = {
        listingNFT: {
          collectionName: "",
          collectionSymbol: "",
          contractAddress: nft.contractAddress,
          tokenId: Number(nft.tokenId),
          metadata: nft.metadata ? nft.metadata : null,
          url: nft.uri ? nft.uri : "",
          network: nft.network,
        },
      };
      return item;
    });
  }

  return (
    <Box>
      <img
        src={
          userSetting.bannerImage
            ? process.env.REACT_APP_API_URL + userSetting.bannerImage
            : bgImage
        }
        alt="bg-image"
        style={{
          width: "100%",
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
                src={
                  userSetting.avatarImage
                    ? process.env.REACT_APP_API_URL + userSetting.avatarImage
                    : bgImage
                }
                alt="profileImage"
                className="octagon-image"
                width="180px"
                height="180px"
              />
              <Box sx={styles.column}>
                <Typography sx={styles.h1}>{userSetting.title}</Typography>
                <Typography sx={styles.h3}>
                  0xA366C1E80642Abcaa190Ed4Fd7C9bA642228053b
                  <IconButton
                    onClick={() => {
                      copy(0xa366c1e80642abcaa190ed4fd7c9ba642228053b);
                      toast.success("Address copied!");
                    }}
                    sx={styles.copyButton}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.rightColumn}>
              <Box sx={styles.rightRow}>
                <img
                  src={topNFTs.bannerImage1 ? topNFTs.bannerImage1 : bgImage}
                  alt="bg-image"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
                <img
                  src={topNFTs.bannerImage2 ? topNFTs.bannerImage2 : bgImage}
                  alt="bg-image"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
                <img
                  src={topNFTs.bannerImage3 ? topNFTs.bannerImage3 : bgImage}
                  alt="bg-image"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
              </Box>
              <Box sx={styles.row}>
                {userSetting.facebook && (
                  <a href={userSetting.facebook}>
                    <IconButton>
                      <FacebookRounded sx={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.telegram && (
                  <a href={userSetting.telegram}>
                    <IconButton>
                      <TelegramIcon sx={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.twitter && (
                  <a href={userSetting.twitter}>
                    <IconButton>
                      <TwitterIcon sx={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.instagram && (
                  <a href={userSetting.instagram}>
                    <IconButton>
                      <FaInstagram style={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.discord && (
                  <a href={userSetting.discord}>
                    <IconButton>
                      <FaDiscord style={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.tikTok && (
                  <a href={userSetting.tikTok}>
                    <IconButton>
                      <FaTiktok style={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.youtube && (
                  <a href={userSetting.youtube}>
                    <IconButton>
                      <YouTubeIcon sx={styles.icon} />
                    </IconButton>
                  </a>
                )}

                {userSetting.medium && (
                  <a href={userSetting.medium}>
                    <IconButton>
                      <BsMedium style={styles.icon} />
                    </IconButton>
                  </a>
                )}
              </Box>
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
                <Typography sx={styles.h2}>$7,183</Typography>
                <Typography sx={styles.h3}>Balance</Typography>
              </Box>
              <Box sx={styles.statsCol}>
                <Typography sx={styles.h2}>11</Typography>
                <Typography sx={styles.h3}>Currencies</Typography>
              </Box>
              <Box sx={styles.statsCol}>
                <Typography sx={styles.h2}>
                  {myNFTs && myNFTs.length > 0 ? myNFTs.length : "0"}
                </Typography>
                <Typography sx={styles.h3}>NFTs</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={styles.rowAbout}>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>About</Typography>
              <Typography sx={styles.h5}>{userSetting.description}</Typography>
            </Box>
          </Box>
          <Box sx={styles.menu}>
            <Button
              onClick={() => setActiveMenu("nft")}
              sx={
                activeMenu === "nft"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              NFTs
            </Button>
            <Button
              onClick={() => setActiveMenu("inbox")}
              disabled
              sx={
                activeMenu === "inbox"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Inbox
              <span style={styles.orangeText}>3</span>
            </Button>
            <Button
              onClick={() => setActiveMenu("offers")}
              disabled
              sx={
                activeMenu === "offers"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Offers
              <span style={styles.orangeText}>1</span>
            </Button>
            <Button
              onClick={() => setActiveMenu("content")}
              disabled
              sx={
                activeMenu === "content"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Content
              <span style={styles.orangeText}>7</span>
            </Button>
            <Button
              onClick={() => setActiveMenu("wall")}
              disabled
              sx={
                activeMenu === "wall"
                  ? styles.activeButton
                  : styles.regularButton
              }
            >
              Wall
            </Button>
          </Box>

          {activeMenu === "nft" && (
            <NFTlist activeListings={myNFTs} view={view} />
          )}
          {activeMenu === "inbox" && (
            <Content activeListings={myNFTs} view={view} />
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default DashboardHome;
