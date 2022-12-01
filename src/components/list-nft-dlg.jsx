/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment , useEffect, useState} from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Divider,
  DialogContent,
  Paper,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { AccountBalanceWallet, Close } from "@mui/icons-material";
import { getImageUrl } from "../utils/string-util";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapContract } from "../connectors/address";
import erc721Abi from "../abi/erc721.json";
import swapAbi from "../abi/swap.json";
import { Contract } from "@ethersproject/contracts";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";

export const ListNFTDialog = (props) => {
  const { onClose, open, metadata, tokenId, owner , address} = props;
  const [isApproved, setIsApproved] = useState(false);
  const {account, library} = useWeb3React();
  const [url, setUrl] = useState("");
  const [imgLoading, setImageLoading] = useState(true);
  const handleClose = () => {
    onClose();
  };
  const provider = new JsonRpcProvider(rpc);
  const getApprovalState = async () => {
    
    try{
      if(address && owner){
        const contract = new Contract(address, erc721Abi, provider);
    const isAppr = await contract.isApprovedForAll(owner, swapContract);
    
    setIsApproved(isAppr);
      }
    }catch {
      
      setIsApproved(false);
    }
  }
  useEffect(() => {
    getApprovalState();
  }, [address, owner])

  const handleApprove = async () => {
    try{
      if(account && library){
        const signer = await library.getSigner();
      const contract = new Contract(address, erc721Abi, signer);
    const tx = await contract.setApprovalForAll(swapContract, true);
    await tx.wait();
    setIsApproved(true);
    toast.success("NFT approval successful!");
      }else {
        toast.error("Connect your wallet.")
      }
    }catch (err){
      
    }
  }

  const handleListing = async () => {
    try{
      if(account && library, tokenId, address){
        const signer = await library.getSigner();
        const contract = new Contract(swapContract,swapAbi , signer);
        const txResult = await contract.createListing(tokenId, address);
        await txResult.wait();
        handleClose();
        toast.success("NFT Listed successfully!");
      }
    }
    catch (err) {
    }
  }
  return (
    <Dialog fullWidth open={open} className="nft-list-dlg">
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ ml: "8px" }} variant="h5">
            List NFT for swap
          </Typography>
          <span className="spacer"></span>
          <IconButton onClick={handleClose}>
            <Close className="icon" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {metadata && (
          <Fragment>
            <Typography>{`${metadata.name} will be listed for nft swap.`}</Typography>
            <Paper sx={style.paper} className="list-dlg-paper">
              {
                !imgLoading && (<img
                  style={style.img}
                  alt="nft artwork"
                  src={url}
                  onLoad={() => setImageLoading(false)}
                />)
              }
              {
                imgLoading && (
                  <div style={style.img}>
                    <CircularProgress />
                  </div>
                )
              }

              <Box>
                <Typography variant="h6">{metadata.name}</Typography>
                <Typography variant="body1">{`Token ID: ${tokenId}`}</Typography>
              </Box>
            </Paper>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions sx={style.dlgActions}>
        <Button onClick={handleApprove} disabled={isApproved} variant="contained">Approve</Button>
        <Button onClick={handleListing} disabled={!isApproved} variant="contained">List NFT</Button>
      </DialogActions>
    </Dialog>
  );
};
const style = {
  img: {
    width: "150px",
    height: "auto",
    borderRadius: "10px",
    marginRight: "16px",
  },
  dlgActions:{
    paddingRight: "24px",
    paddingBottom: "24px"
  },
  paper: {
    padding: "5px",
    marginTop: "16px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "top",
  },
};
