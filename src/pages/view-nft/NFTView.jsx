/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { swapAbi } from "../../connectors/address";
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
import { getNetworkInfo } from "../../connectors/networks";
import {
  setTxDialogFailed,
  setTxDialogHash,
  setTxDialogPending,
  setTxDialogSuccess,
  showTxDialog,
} from "../../redux/slices/app-slice";
import { SendNFT } from "./dialogs/send-nft";
import { NFTDiscussions } from "../../components/discussions/nft-discussions";

//create your forceUpdate hook
function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

export const NFTView = () => {
  const { address, tokenId, network } = useParams();
  const [listDlgOpen, setListDlgOpen] = useState(false);
  const [offerDlgOpen, setOfferDlgOpen] = useState(false);
  const [metadata, setMetadata] = useState();
  const [collectionName, setCollectionName] = useState("");
  const [owner, setOwner] = useState("");
  const [isListed, setListed] = useState(false);
  const [listing, setListing] = useState();
  const { account, chainId } = useWeb3React();
  const [sendOpen, setSendOpen] = useState(false);
  const listings = useSelector((state) => state.listings.allListings);
  const loading = useSelector((state) => state.app.isLoading);
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const styles = {
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 3,
    },
    orangeButton: {
      width: "100%",
      backgroundColor: "#F78C09",
      boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: ".625rem",
      color: "#262626",
      fontSize: "1.313rem",
      fontWeight: 600,
      mb: 2,
    },
  };

  const getDetails = async () => {
    try {
      const netDetails = getNetworkInfo(network);
      const provider = new JsonRpcProvider(netDetails.dataNetwork.RPC);
      const contract = new Contract(
        address,
        netDetails.dataNetwork.ERC_ABI,
        provider
      );
      let url = await contract.tokenURI(tokenId);
      url = metaUrl(url);
      let meta;
      try {
        const result = await axios.get(url);
        meta = result.data;
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
          x.listingDetails.tokenAddress.toLowerCase() ===
            address.toLowerCase() &&
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
      dispatch(showTxDialog());
      const netDetails = getNetworkInfo(network);
      if (chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [netDetails.switch],
        });
      }
      const provider = new Web3Provider(window.ethereum, "any");
      const signer = await provider.getSigner();
      const contract = new Contract(
        netDetails.dataNetwork.SWAP_CONTRACT,
        swapAbi,
        signer
      );
      const txResult = await contract.removeListingById(
        listing.listingDetails.listingid
      );
      dispatch(setTxDialogHash(txResult.hash));
      await txResult.wait();
      dispatch({ type: "LOAD_ALL_LISTING" });
      setListed(false);
      toast.success("NFT Listing removed!");
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(false));
    } catch (error) {
      console.log(error);
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
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
            {!loading && account && account === owner && !isListed && (
              <Box sx={styles.row}>
                <Button
                  sx={styles.orangeButton}
                  variant="contained"
                  onClick={() => setListDlgOpen(true)}
                >
                  List NFT for swap
                </Button>
                <Button
                  sx={styles.orangeButton}
                  variant="contained"
                  onClick={() => setSendOpen(true)}
                >
                  Send NFT
                </Button>
              </Box>
            )}
            {!loading && account && account === owner && isListed && (
              <>
                <Button
                  sx={styles.orangeButton}
                  color="error"
                  variant="contained"
                  onClick={handleRemoveNFT}
                >
                  Remove Listing
                </Button>
              </>
            )}

            {!loading && account !== owner && isListed && (
              <Box sx={styles.row}>
                <Button
                  sx={styles.orangeButton}
                  variant="contained"
                  onClick={handleOfferSwap}
                >
                  Offer SWAP
                </Button>
                <Button
                  sx={styles.orangeButton}
                  variant="contained"
                  onClick={() => setSendOpen(true)}
                >
                  Send NFT
                </Button>
              </Box>
            )}

            <NFTDetails
              metadata={metadata}
              address={address}
              tokenId={tokenId}
              chainId={network}
            />

            {listing && (
              <OfferList
                network={network}
                listingId={listing.listingDetails.listingid}
              />
            )}
            <NFTDiscussions
              metadata={metadata}
              address={address}
              tokenId={tokenId}
              chainId={network}
            />
          </Grid>
        </Grid>
      </Box>
      <ListNFTDialog
        metadata={metadata}
        tokenId={tokenId}
        owner={owner}
        open={listDlgOpen}
        onClose={(isSuccess) => {
          setListDlgOpen(false);
          if (isSuccess) {
            dispatch({ type: "LOAD_ALL_LISTING" });
          }
        }}
        network={network}
        address={address}
      />
      {listing && (
        <OfferNFTDialog
          tokenAddress={address}
          listingId={listing.listingDetails.listingid}
          open={offerDlgOpen}
          network={network}
          onClose={(isSuccess) => {
            setOfferDlgOpen(false);
            if (isSuccess) {
              setListed(true);
            }
          }}
        />
      )}
      <SendNFT
        isOpen={sendOpen}
        tokenId={tokenId}
        contractAddress={address}
        network={network}
        onCloseDlg={() => {
          setSendOpen(false);
          getDetails();
        }}
      />
    </Fragment>
  );
};

const metaUrl = (url) => {
  if (url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};
