import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import NFTlist from "./NFTlist";
import { useDispatch, useSelector } from "react-redux";
import { getActiveListings } from "../../../utils/format-listings";
import { setActiveListings } from "../../../redux/slices/listing-slice";

function PickDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }
  }, [listings]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
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
        <NFTlist activeListings={activeListings} view={2} />
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
          onClick={handleClose}
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
