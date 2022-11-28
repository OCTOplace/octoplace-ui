/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LabelIcon from "@mui/icons-material/Label";
import { styled } from "@mui/material/styles";
import erc721Abi from "../abi/erc721.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapContract } from "../connectors/address";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { useState } from "react";
import { getImageUrl, shortenAddress } from "../utils/string-util";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { resetListings, setAllListings } from "../redux/slices/listing-slice";
import swapAbi from "../abi/swap.json";
import { useWeb3React } from "@web3-react/core";
import { NFTDetails } from "../components/nft-details";
export const NFTView = () => {
  const { address, tokenId } = useParams();
  const [metadata, setMetadata] = useState();
  const [collectionName, setCollectionName] = useState("");
  const [owner, setOwner] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isListed, setListed] = useState(true);
  const { account } = useWeb3React();
  const listings = useSelector((state) => state.listings.allListings);
  const dispatch = useDispatch();

  const provider = new JsonRpcProvider(rpc);

  const getDetails = async () => {
    try {
      const contract = new Contract(address, erc721Abi, provider);
      const url = await contract.tokenURI(tokenId);
      const result = await axios.get(url);
      let meta = result.data;
      const name = await contract.name();
      const ownerAddress = await contract.ownerOf(tokenId);

      setOwner(ownerAddress);
      setCollectionName(name);
      setMetadata(meta);
    } catch {}
  };
  useEffect(() => {
    getDetails();
  }, []);
  const getListings = async () => {
    try {
      const contract = new Contract(swapContract, swapAbi, provider);
      const listings = await contract.readAllListings();
      dispatch(setAllListings(listings));
    } catch (err) {
      console.log("Error getting listings:", err);
    }
  };
  useEffect(() => {
    getListings();
  }, []);

  console.log(address, tokenId);
  const ContainedButton = styled(Button)(({ theme }) => ({
    color: "#3d3d3d",
    backgroundColor: "#f4f4f4",
    border: "1px solid #f4f4f4",
    borderRadius: "12px",
    fontWeight: "bold",
    padding: "5px 72px",
    lineHeight: "24px",
    margin: "8px 16px",
    textTransform: "none",
    width: "180px",
    float: "right",
    "&:hover": {
      backgroundColor: "#3d3d3d",
      color: "#f4f4f4",
    },
  }));

  const styles = {
    card: {
      width: "100%",
      maxWidth: "100%",
      bgcolor: "#6C6C6C",
      borderRadius: "12px",
    },
    nftImg: {
      width: "100%",
      height: "100%",
      maxHeight: "500px",
      objectFit: "cover",
      display: `${imgLoaded ? "block" : "none"}`,
    },
    imgBox: {
      width: "100%",
      height: "500px",
      backgroundColor: "#3c3c3c",
    },
    metabox: {
      display: "flex",
      justifyContent: "space-between",
      pl: 2,
      pr: 2,
    },
    p: {
      paddingLeft: "16px",
      paddingRight: "16px",
      color: "#3d3d3d",
    },
    spanAddress: {
      paddingLeft: "16px",
      fontWeight: "bold",
      fontSize: "16px",
      color: "#fff",
      cursor: "pointer",
    },
    attBox: {
      width: "100%",
      borderRadius: 2,
      justifyContent: "space-between",
    },
    accordion: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid #fff",
      borderRadius: "5px",
    },
    accordion2: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid  #6C6C6C",
      borderRadius: "5px",
    },
    chip: {
      color: "white",
      marginRight: "4px",
      marginLeft: "4px",
      marginBottom: "8px",
    },
  };

  const card = () => {
    return (
      <>
        <Box sx={styles.card}>
          <Box sx={{ p: 2 }}>
            <img
              alt="kjbhv"
              src={metadata ? getImageUrl(metadata.image) : ""}
              style={styles.nftImg}
              onLoad={() => setImgLoaded(true)}
            />
            {!imgLoaded && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={styles.imgBox}
              >
                <CircularProgress color="primary" />
              </Box>
            )}
          </Box>
          <Box sx={styles.metabox}>
            <div style={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                {metadata ? metadata.name : ""}
              </Typography>
              <VerifiedOutlinedIcon />
            </div>
            <FavoriteBorderIcon />
          </Box>
          <Typography sx={{ pl: 2 }}>{`#${tokenId}`}</Typography>
          <p style={styles.p}>
            owned by{" "}
            <span
              style={styles.spanAddress}
              onClick={() =>
                window.open(
                  `https://explorer.thetatoken.org/account/${owner}`,
                  "_blank"
                )
              }
            >
              {owner === "" ? "" : shortenAddress(owner)}
            </span>
          </p>
          <p style={styles.p}>{metadata ? metadata.description : ""}</p>
          <div style={{ padding: "16px" }}>
            <Box sx={styles.attBox}>
              <Accordion sx={styles.accordion} variant="outlined">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: "700" }}>
                    <LabelIcon /> &nbsp;&nbsp;Properties
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {metadata &&
                    metadata.attributes &&
                    metadata.attributes.map((attribute) => {
                      return (
                        <Chip
                          label={`${attribute.trait_type} : ${attribute.value}`}
                          sx={styles.chip}
                          variant="outlined"
                        />
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            </Box>
          </div>
        </Box>
      </>
    );
  };

  const offerList = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          border: "1px solid #6C6C6C",
          borderRadius: "12px",
          maxHeight: "560px",
        }}
      >
        <Box sx={{ display: "flex", color: "#f4f4f4", p: 2 }}>
          <FormatListBulletedIcon />
          <Typography sx={{ pl: 2 }}>Offers</Typography>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            pl: 2,
            pr: 2,
            "& .MuiGrid-item": { alignSelf: "center" },
            height: "500px",
            overflow: "scroll",
          }}
        >
          <Grid item xs={4}>
            <Typography>No</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Project</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Floor</Typography>
          </Grid>
          {listData.map((item) => {
            return (
              <>
                <Grid item xs={1}>
                  <Typography>{item.serial}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <img
                    alt="nsbjhvx"
                    src={item.imageSrc}
                    style={{
                      width: "100px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ alignSelf: "center" }}>
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      alignSelf: "center",
                      color: "#6C6C6C",
                      fontSize: "13px",
                    }}
                  >
                    {item.price} ETH
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      alignSelf: "center",
                      bgcolor: "#6C6C6C",
                      borderRadius: "12px",
                      textAlign: "center",
                      fontSize: "14px",
                      lineHeight: "27px",
                      height: "27px",
                    }}
                  >
                    {item.offerId}
                  </Typography>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "1280px",
        m: "16px auto",
        height: "100%",
        color: "#f4f4f4",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          {card()}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            {collectionName}
          </Typography>

          {account && !isListed && (
            <Button
              sx={{ marginBottom: "16px", borderRadius: "20px" }}
              variant="contained"
            >
              List NFT for swap
            </Button>
          )}

          {!account && isListed && (
            <Button
              sx={{ marginBottom: "24px", borderRadius: "20px" }}
              variant="contained"
            >
              Offer SWAP
            </Button>
          )}
          
          <NFTDetails metadata={metadata} address={address} tokenId={tokenId}  />
          
          
          {offerList()}
        </Grid>
      </Grid>
    </Box>
  );
};

const listData = [
  {
    serial: "1",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "2",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENG2",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "3",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA3",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "4",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA4",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "5",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA5",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "6",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA6",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "7",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA7",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "18",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA8",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "19",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA9",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "20",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA20",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "13",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA3",
    price: "0.15",
    offerId: "2345",
  },
  {
    serial: "15",
    imageSrc:
      "https://static.wikia.nocookie.net/nomanssky_gamepedia/images/c/cc/PRODUCT.HORRIFICARTIFACT.png",
    name: "RENGA5",
    price: "0.15",
    offerId: "2345",
  },
];
