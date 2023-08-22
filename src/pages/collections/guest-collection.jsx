/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
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
import NFTlist from "./components/NFTlist";
import Content from "./components/Content";
import { CollectionDiscussions } from "../../components/discussions/collection-discussion";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCollection } from "../../redux/slices/collections-slice";
import { getCollection } from "../../redux/thunk/getAllCollections";
import { getNFTsForCollection } from "../../redux/thunk/get-collection-nfts";
import { getCollectionDiscussions } from "../../redux/thunk/get-nft-discussions";
import { BsMedium } from "react-icons/bs";
import { FaDiscord, FaTiktok, FaYoutube } from "react-icons/fa";
import { getCollectionOwner } from "../../redux/thunk/get-collection-owner";
import { useWeb3React } from "@web3-react/core";
import RecentMessages from "./components/RecentMessages";

function GuestCollection() {
  const dispatch = useDispatch();
  const { address } = useParams();
  const collections = useSelector((state) => state.collection.collections);
  const selectedCollection = useSelector(
    (state) => state.collection.selectedCollection
  );
  // const settings = useSelector(
  //   (state) => state.collection.selectedCollectionSetting.settings
  // );
  // const isSettingsLoading = useSelector(
  //   (state) => state.collection.selectedCollectionSetting.isLoading
  // );
  // const isNFTsLoading = useSelector((state) => state.collection.isLoading);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);
  const [isOwner, setIsOwner] = useState(false);
  const [activeMenu, setActiveMenu] = useState("collection");
  const owner = useSelector(
    (state) => state.collection.selectedCollectionSetting.owner
  );
  const messages = useSelector(
    (state) => state.discussion.selectedCollectionDiscussions
  );
  const navigate = useNavigate();
  const { account } = useWeb3React();
  const [bannerUrl, setBannerUrl] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  const [nfts, setNfts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [filterParam, setFilterParam] = useState({
    minPrice: 0,
    maxPrice: 0,
    blockchain: "empty",
    collection: "empty",
    saleOnly: false,
    auctionOnly: false,
    offersReceived: false,
    includeBurned: false,
    traits: [],
  });
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const getCollectionSettings = async () => {
    const collectionSettings = await getCollection(address);
    
    setAttributes(collectionSettings.attributes);
  };

  const handleSearch = (keyword) => {
    setLoading(true);
    setNfts([]);
    setPage(1);
    setSearch(keyword);
  };

  const handleFilter = (filterParam) => {
    console.log("///////////////////////////// handleFilter", filterParam);
    setLoading(true);
    setNfts([]);
    setPage(1);
    setFilterParam(filterParam);
  };

  // useEffect(() => {
  //   setNfts([]);
  //   setPage(1);
  //   setTotalCount(0);
  //   setFilteredCount(0);
  //   setHasMore(true);
  //   fetchNFTs();
  // }, [search, filterParam]);

  useEffect(() => {
    // if (collections.length > 0) {
    //   const result = collections.find(
    //     (item) => item.contractAddress === address
    //   );

    //   // dispatch(
    //   //   getCollectionDiscussions({
    //   //     address: result.collectionAddress,
    //   //     network: result.network,
    //   //   })
    //   // );

    //   // dispatch(setSelectedCollection(result));

    //   // dispatch(getAllCollectionNFTs(result.collectionAddress));
    //   // fetchNFTs();

    //   // dispatch(
    //   //   getCollectionSettings({
    //   //     address: result.collectionAddress,
    //   //     network: network,
    //   //   })
    //   // );
    //   // dispatch(
    //   //   getCollectionOwner({
    //   //     address: result.collectionAddress,
    //   //     network: result.network,
    //   //   })
    //   // );

    //   if (result.bannerImage) {
    //     setBannerUrl(process.env.REACT_APP_API_URL + result.bannerImage);
    //   } else if (result.bannerUrl.includes("ipfs://")) {
    //     let url = result.bannerUrl;
    //     const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
    //     setBannerUrl(newUrl);
    //   } else {
    //     setBannerUrl(result.bannerUrl);
    //   }

    //   if (result.avatarImage) {
    //     setAvatarUrl(process.env.REACT_APP_API_URL + result.avatarImage);
    //   } else if (result.bannerUrl.includes("ipfs://")) {
    //     let url = result.bannerUrl;
    //     const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
    //     setAvatarUrl(newUrl);
    //   } else {
    //     setAvatarUrl(result.bannerUrl);
    //   }

    //   if (result.videoDesc != null) {
    //     setVideoDesc(result.videoDesc);
    //   }

    //   if (result.videoTitle != null) {
    //     setVideoTitle(result.videoTitle);
    //   }

    //   if (result.videoUrl != null) {
    //     setVideoUrl(result.videoUrl);
    //   }
    // }
    getCollectionSettings();
  }, [collections]);

  return (
    <Box>
      <img
        src={bannerUrl}
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
                src={avatarUrl}
                alt="profileImage"
                // sx={styles.image}
                className="octagon-image"
                width="180px"
                height="180px"
              />
              <Box sx={styles.column}>
                <Typography sx={styles.h1}>
                  {selectedCollection.collectionName}
                </Typography>
                <Typography sx={styles.h3}>
                  {selectedCollection.collectionAddress}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.column}>
              {/* <Button sx={styles.orangeButton} variant="contained">
                Mint
              </Button> */}
              {selectedCollection && (
                <Box sx={styles.row}>
                  {selectedCollection.telegram && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.telegram}
                      target="_blank"
                    >
                      <Telegram sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.twitter && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.twitter}
                      target="_blank"
                    >
                      <Twitter sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.discord && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.discord}
                      target="_blank"
                    >
                      <FaDiscord color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.facebook && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.facebook}
                      target="_blank"
                    >
                      <Facebook sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.instagram && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.instagram}
                      target="_blank"
                    >
                      <Instagram sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.youtube && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.youtube}
                      target="_blank"
                    >
                      <FaYoutube color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.medium && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.medium}
                      target="_blank"
                    >
                      <BsMedium color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
                  {selectedCollection.tikTok && (
                    <IconButton
                      LinkComponent={"a"}
                      href={selectedCollection.tikTok}
                      target="_blank"
                    >
                      <FaTiktok color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}

                  {account === owner && (
                    <IconButton
                      onClick={() => {
                        navigate(
                          `/collections/settings/${selectedCollection.network}/${selectedCollection.collectionAddress}`
                        );
                      }}
                    >
                      <Settings color="#fff" sx={styles.icon} />
                    </IconButton>
                  )}
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
                <Typography sx={styles.h2}>{totalCount}</Typography>
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
                <Typography sx={styles.h2}>
                  {messages ? messages.length : 0}
                </Typography>
                <Typography sx={styles.h3}>Comments</Typography>
              </Box>
            </Box>
            {isOwner && (
              <Button sx={styles.whiteButton}>Collection settings</Button>
            )}
          </Box>
          <Box sx={styles.rowAbout}>
            <Box sx={styles.aboutContent}>
              {selectedCollection.collectionDesc && (
                <>
                  <Typography sx={styles.h2}>About</Typography>
                  <Typography sx={styles.h5}>
                    {selectedCollection.collectionDesc}
                  </Typography>
                </>
              )}
            </Box>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>Recent messages</Typography>
              {/* <CollectionDiscussions
                address={selectedCollection.collectionAddress}
                network={network}
                isAccordion={false}
              /> */}
              <RecentMessages messages={messages} />
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
              style={{ color: videoUrl === "" ? "#6d6c6c" : "#FFFFFF" }}
              disabled={videoUrl === ""}
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
            // <InfiniteScroll
            //   dataLength={nfts.length}
            //   next={fetchNFTs}
            //   hasMore={hasMore}
            //   loader={<h4>Loading...</h4>}
            // >
            <NFTlist
              // nfts={nfts}
              // attributes={attributes}
              address={selectedCollection.collectionAddress}
              // network={network}
              view={view}
              // keyword={search}
              // filterParam={filterParam}
              // searchChanged={handleSearch}
              // filterChanged={handleFilter}
            />
            // </InfiniteScroll>
          )}
          {activeMenu === "content" && (
            <Content
              address={selectedCollection.collectionAddress}
              activeListings={activeListings}
              view={view}
              videoTitle={videoTitle}
              videoDesc={videoDesc}
              videoUrl={videoUrl}
            />
          )}
          {activeMenu === "discussion" && (
            <CollectionDiscussions
              address={selectedCollection.collectionAddress}
              // network={network}
              discussions={messages}
              isAccordion={false}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
}

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
export default GuestCollection;
