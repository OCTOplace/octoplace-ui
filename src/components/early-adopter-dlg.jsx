import React, { useEffect } from "react";
import { Button, DialogTitle, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box, Divider, DialogContent } from "@mui/material";

import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";

export const EarlyAdopterDlg = (props) => {
  const { onClose, open } = props;
  const sendDataToGTM = useGTMDispatch();
  const handleClose = () => {
    onClose();
  };

  const handleEarlyAdopterClick = async () => {
    sendDataToGTM({
      event: "Opened Early Adopter CTA",
      customData: { url: "https://forms.gle/1SbJS4RRY9UBy9yf9" },
    });

    window.open("https://forms.gle/1SbJS4RRY9UBy9yf9", "_blank");
    handleClose();
  };

  useEffect(() => {}, []);

  return (
    <Dialog
      maxWidth={"xs"}
      fullWidth
      onClose={handleClose}
      open={open}
      className="earlyAdopter-dlg"
    >
      <DialogTitle className="title">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography
            sx={{ ml: "8px", textAlign: "center", width: "100%" }}
            variant="h5"
          >
            Early Adopter
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
            Share your thoughts directly to founders to become an Early Adopter!
            <br />
            Your feedback shapes Octo's future.
            <br />
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
            onClick={handleEarlyAdopterClick}
          >
            Share feedback
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
