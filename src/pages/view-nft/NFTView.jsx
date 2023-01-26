/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from "@mui/material";
import erc721Abi from "../../abi/erc721.json";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapAbi, swapContract } from "../../connectors/address";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { NFTDetails } from "../../components/nft-details";
import { NFTCardDetails } from "../../components/nft-card-details";
import { OfferList } from "../../components/offer-list/offer-list";
import { ListNFTDialog } from "./dialogs/list-nft-dlg";
import { toast } from "react-toastify";
import { OfferNFTDialog } from "./dialogs/offer-nft-dlg";

//create your forceUpdate hook
function useForceUpdate(){
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}

export const NFTView = () => {
  const { address, tokenId } = useParams();
  const [listDlgOpen, setListDlgOpen] = useState(false);
  const [offerDlgOpen, setOfferDlgOpen] = useState(false);
  const [metadata, setMetadata] = useState();
  const [collectionName, setCollectionName] = useState("");
  const [owner, setOwner] = useState("");
  const [isListed, setListed] = useState(false);
  const [listing, setListing] = useState();
  const { account, library } = useWeb3React();
  const listings = useSelector((state) => state.listings.allListings);
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const provider = new JsonRpcProvider(rpc);

  const getDetails = async () => {
    try {
      const contract = new Contract(address, erc721Abi, provider);
      let url = await contract.tokenURI(tokenId);
      url = metaUrl(url);
      let meta;
      try {
        const result = await axios.get(url);
        meta = result.data;
        console.log(meta);
      } catch (e) {
        meta = undefined;
      }
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

  useEffect(() => {
    if (listings.length > 0 && address && tokenId) {
      const found = listings.find(
        (x) =>
          x.listingDetails.tokenAddress === address &&
          x.listingDetails.tokenId === Number(tokenId) && 
          x.listingDetails.isCancelled === false
      );
      if (found) {
        setListed(true);
        setListing(found);
      }
    }
  }, [listings, address, tokenId]);

  const handleOfferSwap = () => {
    if (account) {
      setOfferDlgOpen(true);
    } else {
      toast.error("Please connect your wallet!");
    }
  };

  const handleRemoveNFT = async () => {
    try {
      const signer = await library.getSigner();
      const contract = new Contract(swapContract, swapAbi, signer);
      const txResult = await contract.removeListingById(
        listing.listingDetails.listingid
      );
      await txResult.wait();
      dispatch({type:"LOAD_ALL_LISTING"});
      isListed(false);
      toast.success("NFT Listing removed!");
    } catch(error) {
      console.log(error);
    }
    forceUpdate();
  };
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
              name={collectionName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              {collectionName}
            </Typography>

            {account && account === owner && !isListed && (
              <Button
                sx={{ marginBottom: "16px", borderRadius: "20px" }}
                variant="contained"
                onClick={() => setListDlgOpen(true)}
              >
                List NFT for swap
              </Button>
            )}
            {account && account === owner && isListed && (
              <Button
                sx={{ marginBottom: "16px", borderRadius: "20px" }}
                color="error"
                variant="contained"
                onClick={handleRemoveNFT}
              >
                Remove Listing
              </Button>
            )}

            {account !== owner && isListed && (
              <Button
                sx={{ marginBottom: "24px", borderRadius: "20px" }}
                variant="contained"
                onClick={handleOfferSwap}
              >
                Offer SWAP
              </Button>
            )}

            <NFTDetails
              metadata={metadata}
              address={address}
              tokenId={tokenId}
            />

            {listing && (
              <OfferList listingId={listing.listingDetails.listingid} />
            )}
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
          dispatch({ type: "LOAD_ALL_LISTING" });
        }}
        address={address}
      />
      {listing && (
        <OfferNFTDialog
          tokenAddress={address}
          listingId={listing.listingDetails.listingid}
          open={offerDlgOpen}
          onClose={() => setOfferDlgOpen(false)}
        />
      )}
    </Fragment>
  );
};

const metaUrl = (url) => {
  if(url.includes("ipfs://")){
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}