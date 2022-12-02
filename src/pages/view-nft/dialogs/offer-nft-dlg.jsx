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
import { useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import {rpc, swapContract} from "./../../../connectors/address";
import swapAbi from "../../../abi/swap.json";
import { Contract } from "@ethersproject/contracts";
import { formatOffers } from "../../../utils/format-listings";

export const OfferNFTDialog = (props) => {
  const { onClose, open, tokenAddress, listingId } = props;
  const loading = useSelector((state) => state.myNFT.isLoading);
  const nfts = useSelector((state) => state.myNFT.nfts);
  const listings = useSelector((state) => state.listings.allListings);
  const handleClose = () => {
    onClose();
  };
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedNftOffer, setSelectedNftOffer] = useState();
  const [myNFT, setMyNFT] = useState([]);
  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    setSelectedNftOffer(item);
  };

  const createData = async () => {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    let offers = await contract.readAllOffers();
    offers = formatOffers(offers);

    const myNFTS = filterListedNFTs(nfts, listings, offers);
    setMyNFT(myNFTS);

  }

  useEffect(() => {
    if(nfts.length > 0 && listings.length > 0){
      createData();
    }
  }, [nfts, listings]);

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
          <Box>
            <Box sx={style.progress}>
              <CircularProgress>Loading your NFTs</CircularProgress>
            </Box>
            <Box sx={style.progress}>
              <Typography variant="caption">Loading your NFTs</Typography>
            </Box>
          </Box>
        )}
        <List component="nav">
          {myNFT.map((item, index) => {
            let obj;
            try{
              if(!item.metadata){
                const meta = {
                  name: item.collectionName,
                  image: "data:image/png;base64,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"
                }

                obj = {
                  metadata: meta,
                  tokenId: item.tokenId,
                  collectionName: item.collectionName
                }
              }else{
                obj = item;
              }
            }catch{
              const meta = {
                name: item.collectionName,
                image: "data:image/png;base64,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"
              }
              obj = {
                metadata: meta,
                tokenId: item.tokenId,
                collectionName: item.collectionName
              }
            }
            return (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, obj)}
              key={`${index}_${obj.name}`}
            >
              <ListItemIcon>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={manageUrl(obj.metadata)}
                  alt={obj.metadata.name}
                />
              </ListItemIcon>
              {obj.metadata && (
                <ListItemText
                  primary={
                    obj.metadata && obj.metadata.name
                      ? obj.metadata.name
                      : `${obj.collectionName} #${obj.tokenId}`
                  }
                />
              )}
            </ListItemButton>
          )})}
        </List>
      </DialogContent>
      <DialogActions sx={style.dlgActions}>
        <Button
          disabled={loading}
          onClick={() => {
            onClose();
            navigate(
              `/swap/initiate-offer/${listingId}/${selectedNftOffer.contractAddress}/${selectedNftOffer.tokenId}`
            );
          }}
          variant="contained"
        >
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

function manageUrl(metadata) {
  try {
    if (metadata && metadata.image) {
      return getImageUrl(metadata.image);
    }
  } catch {
    return "";
  }
}
