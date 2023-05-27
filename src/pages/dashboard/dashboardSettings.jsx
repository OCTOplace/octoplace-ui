import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Container } from "react-bootstrap";
import InputAdornment from "@mui/material/InputAdornment";
import { useDropzone } from "react-dropzone";

import bgImage from "../../assets/bg-collection.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FacebookRounded } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaTiktok, FaInstagram, FaDiscord } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import PickDialog from "./components/pickDialog";

function DashboardSettings() {
  const [hoveredBG, setHoveredBG] = useState(false);
  const [hoveredPP, setHoveredPP] = useState(false);
  const [hoveredNFT1, setHoveredNFT1] = useState(false);
  const [hoveredNFT2, setHoveredNFT2] = useState(false);
  const [hoveredNFT3, setHoveredNFT3] = useState(false);
  const [openNFT1, setOpenNFT1] = useState(false);
  const [openNFT2, setOpenNFT2] = useState(false);
  const [openNFT3, setOpenNFT3] = useState(false);

  const onDrop = (acceptedFiles) => {
    // Handle dropped files logic here
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
    },
    buildIcon: {
      position: "absolute",
      top: "35vh",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5,
    },
    photoIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5,
      color: "#F4F4F4",
    },
    editIcon: {
      color: "#F4F4F4",
      fontSize: "5rem",
    },
    imagess: {
      display: "block",
      width: "180px",
      height: "180px",
    },
    containerHovered: {
      "& $buildIcon": {
        opacity: 1,
      },
    },
    background: {
      width: "100vw",
      height: "50vh",
      objectFit: "cover",
    },
    overlayContainer: {
      // height: "50vh",
      marginTop: "-10vh",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      zIndex: 3,
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: 3,
    },
    image: {
      width: "160px",
      height: "160px",
      webkitClipPath:
        "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%,71% 100%, 29% 100%, 0% 71%, 0% 29%)",
      clipPath:
        "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%,71% 100%, 29% 100%, 0% 71%, 0% 29%)",
      // filter drop shadow
      filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.25))",
    },
    orangeButton: {
      backgroundColor: "#F78C09",
      color: "#262626",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    whiteButton: {
      backgroundColor: "#F4F4F4",
      color: "#262626",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10,
      mt: 3,
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
      color: "#F4F4F4",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#F4F4F4",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.125rem",
      color: "#F4F4F4",
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.125rem",
      color: "#6C6C6C",
    },
    icon: {
      color: "#f4f4f4",
      fontSize: "1.625rem",
    },
    aboutContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    socialcontent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    },
    rightColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 1,
    },
    rightRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
    },
    basic: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const listing = {
    listingNFT: {
      name: "NFT Name",
      contractAddress: "0x1234567890",
      metadata: {
        image: "https://picsum.photos/200",
        description: "NFT Description",
      },
    },
  };

  return (
    <Box>
      {openNFT1 && <PickDialog open={openNFT1} setOpen={setOpenNFT1} />}
      {openNFT2 && <PickDialog open={openNFT2} setOpen={setOpenNFT2} />}
      {openNFT3 && <PickDialog open={openNFT3} setOpen={setOpenNFT3} />}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>
            <img
              src={bgImage}
              alt="bg-image"
              style={{
                width: "100vw",
                height: "45vh",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
            <Typography variant="h5" sx={styles.photoIcon}>
              Drop the image here ...
            </Typography>
          </div>
        ) : (
          <div
            onMouseEnter={() => setHoveredBG(true)}
            onMouseLeave={() => setHoveredBG(false)}
          >
            <img
              src={bgImage}
              alt="bg-image"
              style={{
                width: "100vw",
                height: "45vh",
                objectFit: "cover",
              }}
            />
            {hoveredBG && (
              <Button component="label" sx={styles.buildIcon}>
                <AddAPhotoIcon sx={styles.editIcon} />
              </Button>
            )}
          </div>
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Box style={styles.overlayContainer}>
            <Box sx={styles.imageContainer}>
              <div
                onMouseEnter={() => setHoveredPP(true)}
                onMouseLeave={() => setHoveredPP(false)}
                style={styles.container}
              >
                <img
                  src={listing?.listingNFT?.metadata?.image}
                  alt="profileImage"
                  className="octagon-image"
                  width="180px"
                  height="180px"
                />
                {hoveredPP && (
                  <Button
                    component="label"
                    htmlFor="profilePicture"
                    sx={styles.photoIcon}
                  >
                    <AddAPhotoIcon sx={styles.editIcon} />
                    <input
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      hidden
                    />
                  </Button>
                )}
              </div>
              <Box sx={styles.column}>
                <TextField
                  type="url"
                  variant="standard"
                  hiddenLabel
                  className="input-wo-padding"
                  InputProps={{
                    style: {
                      backgroundColor: "#3D3D3D",
                      color: "#6C6C6C",
                      border: "1px solid #6C6C6C",
                      borderRadius: "0.594rem",
                      padding: "0.5rem",
                      width: "20rem",
                      "& .MuiInputBase-input-MuiInput-input": {
                        padding: 0,
                      },
                    },
                    disableUnderline: true,
                    size: "small",
                    placeholder: "| Collection Title",
                  }}
                />
              </Box>
            </Box>
            <Box sx={styles.rightRow}>
              <div
                onMouseEnter={() => setHoveredNFT1(true)}
                onMouseLeave={() => setHoveredNFT1(false)}
                //center the button inside the div on image
                style={styles.container}
              >
                <img
                  src={listing?.listingNFT?.metadata?.image}
                  alt="bg-image"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
                {hoveredNFT1 && (
                  <Button
                    onClick={() => setOpenNFT1(true)}
                    sx={styles.photoIcon}
                  >
                    <AddAPhotoIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
              <div
                onMouseEnter={() => setHoveredNFT2(true)}
                onMouseLeave={() => setHoveredNFT2(false)}
                style={styles.container}
              >
                <img
                  src={listing?.listingNFT?.metadata?.image}
                  alt="bg-image"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
                {hoveredNFT2 && (
                  <Button
                    sx={styles.photoIcon}
                    onClick={() => setOpenNFT2(true)}
                  >
                    <AddAPhotoIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
              <div
                onMouseEnter={() => setHoveredNFT3(true)}
                onMouseLeave={() => setHoveredNFT3(false)}
                style={styles.container}
              >
                <img
                  src={listing?.listingNFT?.metadata?.image}
                  alt="bg-image"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "1.2rem",
                    border: "4px solid #F78C09",
                  }}
                />
                {hoveredNFT3 && (
                  <Button
                    sx={styles.photoIcon}
                    onClick={() => setOpenNFT3(true)}
                  >
                    <AddAPhotoIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
            </Box>
          </Box>
          <Box sx={styles.row}>
            <Box sx={styles.aboutContent}>
              <Typography sx={styles.h2}>About</Typography>
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#3D3D3D",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| Input Description",
                  rows: 5,
                  multiline: true,
                }}
              />
              <Button sx={styles.orangeButton} variant="contained">
                Save
              </Button>
            </Box>
            <Box sx={styles.socialcontent}>
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| telegram.com/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <TelegramIcon sx={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| twitter.com/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon sx={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| facebook.com/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookRounded sx={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| instagram.com/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaInstagram style={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| discord.gg/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDiscord style={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| tiktok.com/@username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaTiktok style={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| youtube.com/channel/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTubeIcon sx={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                InputProps={{
                  style: {
                    backgroundColor: "#151515",
                    color: "#6C6C6C",
                    border: "1px solid #6C6C6C",
                    borderRadius: "0.594rem",
                    padding: "0.5rem",
                  },
                  disableUnderline: true,
                  size: "small",
                  placeholder: "| medium.com/username",
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsMedium style={styles.icon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default DashboardSettings;
