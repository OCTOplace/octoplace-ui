/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from "@mui/material";
import erc721Abi from "../../abi/erc721.json";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc } from "../../connectors/address";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { NFTDetails } from "../../components/nft-details";
import { NFTCardDetails } from "../../components/nft-card-details";
import { OfferList } from "../../components/offer-list";
import { ListNFTDialog } from "./dialogs/list-nft-dlg";
import { toast } from "react-toastify";

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
      const found = listings.filter(
        (x) =>
          x.listingDetails.tokenAddress === address &&
          x.listingDetails.tokenId === Number(tokenId)
      );
      if (found.length === 1) {
        setListed(true);
      }
    }
  }, [listings, address, tokenId]);

  const handleOfferSwap = () => {
    if(account){

    }else{
      toast.error("Please connect your wallet!");
    }
  }
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

            {isListed && <OfferList />}
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
    </Fragment>
  );
};
