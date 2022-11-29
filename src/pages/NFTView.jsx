/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from "@mui/material";
import erc721Abi from "../abi/erc721.json";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapContract } from "../connectors/address";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllListings } from "../redux/slices/listing-slice";
import swapAbi from "../abi/swap.json";
import { useWeb3React } from "@web3-react/core";
import { NFTDetails } from "../components/nft-details";
import { NFTCardDetails } from "../components/nft-card-details";
import { OfferList } from "../components/offer-list";
import { ListNFTDialog } from "../components/list-nft-dlg";
import { formatListings } from "../utils/format-listings";

export const NFTView = () => {
  const { address, tokenId } = useParams();
  const [listDlgOpen, setListDlgOpen] = useState(false);
  const [metadata, setMetadata] = useState();
  const [collectionName, setCollectionName] = useState("");
  const [owner, setOwner] = useState("");
  const [isListed, setListed] = useState(false);
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
      dispatch(setAllListings(formatListings(listings)));
    } catch (err) {
      console.log("Error getting listings:", err);
    }
  };
  useEffect(() => {
    getListings();
  }, []);

  useEffect(() => {
    if(listings.length > 0 && address && tokenId){
      console.log("searching")
      const found = listings.filter(x => (x.tokenAddress === address && x.tokenId === Number(tokenId)))
      if(found.length === 1){
        console.log(found);
        setListed(true);
      }
    }
  }, [listings, address , tokenId])
  return (
    <Fragment>
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
            <NFTCardDetails
              metadata={metadata}
              tokenId={tokenId}
              owner={owner}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              {collectionName}
            </Typography>

            {account && account===owner && !isListed && (
              <Button
                sx={{ marginBottom: "16px", borderRadius: "20px" }}
                variant="contained"
                onClick={() => setListDlgOpen(true)}
              >
                List NFT for swap
              </Button>
            )}

            { account !== owner && isListed && (
              <Button
                sx={{ marginBottom: "24px", borderRadius: "20px" }}
                variant="contained"
              >
                Offer SWAP
              </Button>
            )}

            <NFTDetails
              metadata={metadata}
              address={address}
              tokenId={tokenId}
            />

            {
              isListed && (<OfferList />)
            }
          </Grid>
        </Grid>
      </Box>
      <ListNFTDialog
        metadata={metadata}
        tokenId={tokenId}
        owner={owner}
        open={listDlgOpen}
        onClose={() => {
          setListDlgOpen(false);
          getListings();
        }}
        address={address}
      />
    </Fragment>
  );
};
