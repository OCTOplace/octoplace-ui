import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import NFTSelectlist from "./NFTSelectList";
import { updateUserTopNFT } from "../../../redux/thunk/user-setting";
import { useDispatch, useSelector } from "react-redux";
import { getActiveListings } from "../../../utils/format-listings";
import { setActiveListings } from "../../../redux/slices/listing-slice";

function PickDialog({ open, setOpen, onClose, wallet, nftIndex }) {
  // const dispatch = useDispatch();
  const myNFTs = useSelector((state) => state.myNFT.nfts);
  // const listings = useSelector((state) => state.listings.allListings);
  // const activeListings = useSelector((state) => state.listings.activeListings);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!selectedItem) {
      return;
    }

    const bannerImage =
      selectedItem.metadata && selectedItem.metadata.image
        ? selectedItem.metadata.image.includes("ipfs://")
          ? selectedItem.metadata.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          : selectedItem.metadata.image
        : "";

    // const saveObj = { walletAddress: wallet };
    // saveObj[`nftAddress${nftIndex}`] = selectedItem.contractAddress;
    // saveObj[`tokenId${nftIndex}`] = selectedItem.tokenId;
    // saveObj[`bannerImage${nftIndex}`] = bannerImage;

    let saveObj = { walletAddress: wallet };
    saveObj[`nft${nftIndex}`] = {};
    saveObj[`nft${nftIndex}`].contractAddress = selectedItem.contractAddress;
    saveObj[`nft${nftIndex}`].tokenId = selectedItem.tokenId;
    saveObj[`nft${nftIndex}`].bannerImage = bannerImage;

    try {
      const fetchedData = await updateUserTopNFT(saveObj);
      toast.success(fetchedData.message, {
        position: "top-center",
      });

      setTimeout(() => {
        onClose();
        setLoading(false);
        setOpen(false);
      }, 1000);
    } catch (error) {
      // Handle error here, e.g. show an error message
      console.log("Error loading data:", error);
      toast.error(error.message, {
        position: "top-center",
      });
      setLoading(false);
      setOpen(false);
    }
  };

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  // useEffect(() => {
  //   if (listings.length > 0) {
  //     const active = getActiveListings(listings);
  //     dispatch(setActiveListings(active));
  //   }
  // }, [listings]);

  const filteredMyNFTs = myNFTs.filter((item) => item.metadata);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      // onClose={handleClose}
      sx={{
        backdropFilter: "blur(5px)",
        "& .MuiDialog-paper": {
          backgroundColor: "#262626",
          border: "5px solid #FFA500",
          borderRadius: "1rem",
          color: "#F4F4F4",
          maxHeight: "70vh",
        },
        // center dialog actions
        "& .MuiDialogActions-root": {
          justifyContent: "center",
          my: 1,
        },
      }}
    >
      <DialogTitle>Pick NFT</DialogTitle>
      <DialogContent>
        <NFTSelectlist
          nftListings={filteredMyNFTs}
          view={2}
          onSelect={onSelect}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#F4F4F4",
            color: "#262626",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            width: "25%",
          }}
        >
          CANCEL
        </Button>
        <Button
          onClick={handleSave}
          style={{
            backgroundColor: "#F78C09",
            color: "#262626",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            width: "25%",
          }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PickDialog;
