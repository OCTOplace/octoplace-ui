import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Button, DialogTitle, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import mm from "../assets/metamask.svg";
import wc from "../assets/walletconnect.svg";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box, Divider, DialogContent } from "@mui/material";

export const GoProDlg = (props) => {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  const handleGoProClick = async () => {
    window.open("https://discord.com/invite/73Ru5XUP2X", "_blank");
    handleClose();
  };

  useEffect(() => {}, []);

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      onClose={handleClose}
      open={open}
      className="gopro-dlg"
    >
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography
            sx={{ ml: "8px", textAlign: "center", width: "100%" }}
            variant="h5"
          >
            GO PRO
          </Typography>
          <span className="spacer"></span>
          <IconButton onClick={handleClose}>
            <CloseIcon className="icon" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{ pl: 5, pt: 1, pb: 2, pr: 5 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ textAlign: "center" }}>
            Share your thoughts directly to founders to Go PRO!
            <br />
            Your feedback shapes Octo's future.
            <br />
            <br /> Join Pro group in Discord now!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className="" sx={{ pb: 3 }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Button
            sx={{
              ml: 1,
              mr: 1,
              textTransform: "none",
              width: "250px",
              fontSize: "20px",
              fontWeight: "700",
            }}
            variant="contained"
            color="primary"
            onClick={handleGoProClick}
          >
            Share feedback
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};