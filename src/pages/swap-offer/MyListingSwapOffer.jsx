/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapContract } from "../../connectors/address";
import ercAbi from "../../abi/erc721.json";
import { Contract } from "@ethersproject/contracts";
import { useSelector } from "react-redux";
import axios from "axios";
import { metadataUrl } from "../../utils/format-listings";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { SwapCard } from "./components/swapcard";
import swapAbi from "../../abi/swap.json";

export const MyListingSwapOffer = () => {
  const { listingId, offerNft, offerTokenId } = useParams();
  const listings = useSelector((state) => state.listings.allListings);
  const [myNft, setMyNft] = useState();
  const [listingNFT, setListingNFT] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [offerOwner, setOfferOwner] = useState("");
  const myNfts = useSelector((state) => state.myNFT.nfts);
  const { account , library} = useWeb3React();
  const navigate = useNavigate();
  const getApprovedStatus = async () => {
    try {
      const provider = new JsonRpcProvider(rpc);
      const contract = new Contract(offerNft, ercAbi, provider);
      const status = await contract.isApprovedForAll(offerOwner, swapContract);
      setIsApproved(status);
    } catch {
      setIsApproved(false);
    }
  };

  const getListingNft = async () => {

    const found = listings.find(
      (x) => x.listingDetails.listingid === Number(listingId)
    );
    if (found) {
      setListingNFT(found);
    }
  };
  const getMyNft = async () => {
    const found = myNfts.find(
      (x) => x.tokenId === offerTokenId && x.contractAddress === offerNft
    );
    if (found) {
      setMyNft(found);
    } else {
      try {
        const provider = new JsonRpcProvider(rpc);
        const contract = new Contract(offerNft, ercAbi, provider);
        const owner = await contract.ownerOf(offerTokenId);
        setOfferOwner(owner);
        if (account && owner !== account) {
          toast.error("You are not holding the NFT being offered");
          navigate("/");
        }
        const name = await contract.name();
        const uri = await contract.tokenURI(offerTokenId);
        let metadata;
        try {
          const res = await axios.get(metadataUrl(uri));
          metadata = res.data;
        } catch {
          metadata = undefined;
        }
        setMyNft({
          collectionName: name,
          contractAddress: offerNft,
          tokenId: offerTokenId,
          url: uri,
          metadata,
        });
      } catch {}
    }
  };

  useEffect(() => {
    getMyNft();
  }, []);

  useEffect(() => {
    if(account){
        getApprovedStatus();
    }
  }, [account]);

  useEffect(() => {
    if (listings.length > 0) {
      getListingNft();
    }
  }, [listings]);

  const handleApprove =async () => {
        const signer = await library.getSigner();
        const contract = new Contract(offerNft, ercAbi, signer);
        const txResult = await contract.setApprovalForAll(swapContract, true);
        await txResult.wait();
        toast.success("Approval Successful!");
        setIsApproved(true);
  }

  const handleAddOffer = async () => {
    const signer = await library.getSigner();
    const contract  = new Contract(swapContract, swapAbi, signer);
    const txResult = await contract.createOffer(offerTokenId, offerNft, listingId);
    await txResult.wait();
    toast.success("Swap offer sent successfully!");
    navigate(`/nft/${listingNFT.listingDetails.tokenAddress}/${listingNFT.listingDetails.tokenId}`);
        
  }
  return (
    <Box
      sx={{
        maxWidth: "1280px",
        m: "16px auto",
        height: "100%",
        minHeight: "65vh",
        color: "#f4f4f4",
        marginTop: "32px",
      }}
    >
      <Typography sx={{ cursor: "pointer" }}>{"<"} Back</Typography>
      <Typography sx={{ fontSize: "20px", mt: 4, fontWeight: "bold", mb: 2 }}>
        SWAP OFFER{" "}
        {listingNFT
          ? `${listingNFT.listingNFT.name} #${listingNFT.listingDetails.tokenId}`
          : ""}
      </Typography>
      <Grid container sx={{ mt: { xs: 3, md: 6, p: 0 } }}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              bgcolor: "#262626",
              height: "312px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            {listingNFT ? (
              <SwapCard
                nft={listingNFT.listingNFT}
                owner={listingNFT.listingDetails.tokenOwner}
              />
            ) : (
              <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{ alignSelf: "center" }}>
          <div
            style={{
              width: "53px",
              height: "53px",
              background: "#F4F4F4",
              borderRadius: "26px",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <CachedIcon sx={{ color: "#3d3d3d", mt: 1 }} fontSize="large" />
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              bgcolor: "#262626",
              height: "312px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            {myNft && myNft.metadata ? (
              <SwapCard owner={offerOwner} nft={myNft} />
            ) : (
              <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      {account && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            pt: { xs: 3, md: 6 },
          }}
        >
          <ContainedButton disabled={isApproved} onClick={handleApprove} variant="outlined">
            Approve
          </ContainedButton>
          <ContainedButton disabled={!isApproved} onClick={handleAddOffer} variant="outlined">
            Offer
          </ContainedButton>
        </Box>
      )}
    </Box>
  );
};

const ContainedButton = styled(Button)(({ theme }) => ({
  color: "#3d3d3d",
  backgroundColor: "#f4f4f4",
  border: "1px solid #f4f4f4",
  borderRadius: "12px",
  padding: "10px 72px",
  lineHeight: "24px",
  margin: "8px 16px",
  width: "248px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#3d3d3d",
    color: "#f4f4f4",
  },
}));
