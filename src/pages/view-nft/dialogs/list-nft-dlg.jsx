/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
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
import { Close } from "@mui/icons-material";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { defaultImage } from "../../../connectors/address";
import { getNetworkInfo } from "../../../connectors/networks";
import { setTxCharge } from "../../../redux/slices/app-slice";
export const ListNFTDialog = (props) => {
  const { onClose, open, metadata, tokenId, owner, address, network } = props;
  const [isApproved, setIsApproved] = useState(false);
  const { account, library , chainId} = useWeb3React();
  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState("");
  const [imgLoading, setImageLoading] = useState(true);
  const txCharge = useSelector((state) => state.app.txCharge);
  const dispatch = useDispatch();
  const handleClose = (isSuccess) => {
    onClose(isSuccess);
  };

  const getApprovalState = async () => {
    try {
      if (address && owner) {
        const netDetails = getNetworkInfo(network);
        const provider = new JsonRpcProvider(netDetails.dataNetwork.RPC);
        const contract = new Contract(address, netDetails.dataNetwork.ERC_ABI, provider);
        const isAppr = await contract.isApprovedForAll(owner, netDetails.dataNetwork.SWAP_CONTRACT);
        setIsApproved(isAppr);
      }
    } catch {
      setIsApproved(false);
    }
  };

  const getTxCharge = async () => {
    const {dataNetwork} = getNetworkInfo(network);
    const provider = new JsonRpcProvider(dataNetwork.RPC);
    const contract = new Contract(dataNetwork.SWAP_CONTRACT, dataNetwork.SWAP_ABI, provider);
    let txCharge = await contract.getTxCharge();
    console.log(txCharge);
    txCharge = formatUnits(txCharge, 18);
    dispatch(setTxCharge(txCharge));
  }
  useEffect(() => {
    getApprovalState();
    getTxCharge();
  }, [address, owner]);

  useEffect(() => {
    if (props.metadata && props.metadata.image) {
      setUrl(props.metadata.image);
    } else {
      setUrl(defaultImage);
    }
  }, [props]);
  const handleApprove = async () => {
    try {
      if (account && library) {
        const netDetails = getNetworkInfo(network);
        if(chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)){
          await window.ethereum.request({method: "wallet_addEthereumChain", params: [netDetails.switch]})
        }
        const provider = new Web3Provider(window.ethereum , "any");
        const signer = await provider.getSigner();
        const contract = new Contract(address, netDetails.dataNetwork.ERC_ABI, signer);
        const tx = await contract.setApprovalForAll(netDetails.dataNetwork.SWAP_CONTRACT, true);
        await tx.wait();
        setIsApproved(true);
        toast.success("NFT approval successful!");
      } else {
        toast.error("Connect your wallet.");
      }
    } catch (err) {}
  };

  const handleListing = async () => {
    try {
      if (account && library && tokenId && address) {
        const netDetails = getNetworkInfo(network);
        if(chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)){
          await window.ethereum.request({method: "wallet_addEthereumChain", params: [netDetails.switch]})
        }
        const provider = new Web3Provider(window.ethereum , "any");
        const signer = await provider.getSigner();
        let overRides = {
          value: parseUnits(txCharge, "ether"),
        };
        const contract = new Contract(netDetails.dataNetwork.SWAP_CONTRACT, netDetails.dataNetwork.SWAP_ABI, signer);
        const txResult = await contract.createListing(
          tokenId,
          address,
          overRides
        );
        await txResult.wait();
        dispatch({ type: "LOAD_ALL_LISTING" });
        handleClose(true);
        toast.success("NFT Listed successfully!");
      }
    } catch (err) {}
  };
  return (
    <Dialog fullWidth open={open} className="nft-list-dlg">
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ ml: "8px" }} variant="h5">
            List NFT for swap
          </Typography>
          <span className="spacer"></span>
          <IconButton onClick={() => handleClose(false)}>
            <Close className="icon" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <p style={{ fontWeight: 700 }}>Listing charge {txCharge} {(network==="theta"? "TFUEL" : (network==="kava"? "KAVA":""))}</p>
        {metadata && (
          <Fragment>
            <Typography>{`${metadata.name} will be listed for nft swap.`}</Typography>
            <Paper sx={style.paper} className="list-dlg-paper">
              {
                <img
                  alt="nft artwork"
                  src={url}
                  style={{
                    ...style.img,
                    display: imgLoading ? "none" : "block",
                  }}
                  onLoad={() => setImageLoading(false)}
                />
              }
              {imgLoading && (
                <div style={style.img}>
                  <CircularProgress />
                </div>
              )}

              <Box>
                <Typography variant="h6">{metadata.name}</Typography>
                <Typography variant="body1">{`Token ID: ${tokenId}`}</Typography>
              </Box>
            </Paper>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions sx={style.dlgActions}>
        <Button
          onClick={handleApprove}
          disabled={isApproved}
          variant="contained"
        >
          Approve
        </Button>
        <Button
          onClick={handleListing}
          disabled={!isApproved}
          variant="contained"
        >
          List NFT
        </Button>
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
  dlgActions: {
    paddingRight: "24px",
    paddingBottom: "24px",
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
