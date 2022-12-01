import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Divider,
  DialogContent,
  Paper,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Close, Inbox } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { filterListedNFTs } from "../../../utils/filter";
import { getImageUrl } from "../../../utils/string-util";
import { useNavigate } from "react-router-dom";

export const OfferNFTDialog = (props) => {
  const { onClose, open, tokenAddress, tokenId } = props;
  const loading = useSelector((state) => state.myNFT.isLoading);
  const nfts = useSelector((state) => state.myNFT.nfts);
  const listings = useSelector((state) => state.listings.allListings);
  const handleClose = () => {
    onClose();
  };
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedNftOffer, setSelectedNftOffer] = useState();

  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    setSelectedNftOffer(item);
  };
  return (
    <Dialog fullWidth open={open} className="nft-list-dlg">
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography sx={{ ml: "8px" }} variant="h5">
            Propose NFT for swap
          </Typography>
          <span className="spacer"></span>
          <IconButton onClick={handleClose}>
            <Close className="icon" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ maxHeight: "60vh" }}>
        {!loading && <Typography>Select your NFT for swap.</Typography>}
        {loading && (
          <Box >
            <Box sx={style.progress}>
            <CircularProgress>Loading your NFTs</CircularProgress>
            
          </Box>
          <Box sx={style.progress}>
          <Typography variant="caption">Loading your NFTs</Typography>
          </Box>
          </Box>
        )}
        <List component="nav">
          {filterListedNFTs(nfts, listings, []).map((item, index) => (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, item)}
            >
              <ListItemIcon>
                <img style={{width:"50px", height:"50px"}} src={manageUrl(item.metadata)} alt={item.metadata.name} />
              </ListItemIcon>
              <ListItemText
                primary={
                  item.metadata && item.metadata.name
                    ? item.metadata.name
                    : `${item.collectionName} #${item.tokenId}`
                }
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={style.dlgActions}>
        <Button disabled={loading} onClick={() => {
            onClose();
            navigate(`/swap/initiate-offer/${tokenAddress}/${tokenId}/${selectedNftOffer.contractAddress}/${selectedNftOffer.tokenId}`);
        }} variant="contained">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const style = {
  img: {
    width: "50px",
    height: "auto",
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
  progress: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
};

function manageUrl(metadata){
    try{
        if(metadata && metadata.image){
            return getImageUrl(metadata.image)
        }
    }catch{
        return "";
    }
}