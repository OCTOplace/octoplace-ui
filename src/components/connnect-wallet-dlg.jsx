import React,{useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import mm from "../assets/metamask.svg";
import wc from "../assets/walletconnect.svg";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box, Divider, DialogContent } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {  injectedConnector } from "../connectors/injected-connector";
import { walletconnect } from "../connectors/wallet-connect";
import { chainId } from "../connectors/address";
import { useWeb3React } from "@web3-react/core";
import {toast} from "react-toastify";

export const ConnectWalletDlg = (props) => {
  const { onClose, open } = props;
  const { activate, error, account} = useWeb3React();
  const handleClose = () => {
    onClose();
  };

  const handleMetamaskClick = async () => {
    await activate(injectedConnector);
    handleClose();
}

const handleWalletConnectClick = async () => {
  await activate(walletconnect);
  handleClose();
}

useEffect(()=> {
  if(account && account !=="" && account.length > 0){
    toast(`Wallet Connected! /n ${getAccountString(account)}`,{type:"success", position: "bottom-left"});
  }
}, [account]);

useEffect(() => {
  if (error) {
    switch (error.name) {
      case "UnsupportedChainIdError":
        toast("Unsupported network, Switch to ethereum", {type: "error"})
        // setSwitchNet(true);
        break;
      case "NoEthereumProviderError":
        toast("Please Install metamask.", {type:"error"})
        break;
      case "UserRejectedRequestError":
          toast("Connection request rejected.", { type: "warning"})
        break;
      default:
        
        break;
    }
  }
}, [error]);

  return (
    <Dialog fullWidth onClose={handleClose} open={open} className="wallet-dlg">
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <AccountBalanceWalletIcon className="icon" />
          <Typography sx={{ ml: "8px" }} variant="h5">
            Connect wallet
          </Typography>
          <span className="spacer"></span>
          <IconButton onClick={handleClose}>
            <CloseIcon className="icon" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List sx={{ pt: 0 }}>
          <ListItem button onClick={handleMetamaskClick} className="wallet-menu">
            <ListItemAvatar>
              <img className="wallet-logo" src={mm} alt="metamask" />
            </ListItemAvatar>
            <ListItemText primary="Metamask" />
          </ListItem>
          <ListItem button onClick={handleWalletConnectClick} className="wallet-menu">
            <ListItemAvatar>
              <img className="wallet-logo" src={wc} alt="metamask" />
            </ListItemAvatar>
            <ListItemText primary="Wallet Connect" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

const getAccountString = (hash) => {
  const first = hash.substring(0, 7);
  const len = hash.length;
  const last = hash.substring(len - 7, len);
  return `${first}...${last}`;
};
