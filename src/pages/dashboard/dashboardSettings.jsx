import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Container } from "react-bootstrap";
import InputAdornment from "@mui/material/InputAdornment";
import { useDropzone } from "react-dropzone";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BuildIcon from "@mui/icons-material/Build";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FacebookRounded } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaTiktok, FaInstagram, FaDiscord } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import {
  registerOrFetchUserSetting,
  updateUserSetting,
} from "../../redux/thunk/user-setting";
import bgImage from "../../assets/GrayBackground.jpeg";
import PickDialog from "./components/pickDialog";

function DashboardSettings() {
  const { account, chainId } = useWeb3React();
  const [userSetting, setUserSetting] = useState({});

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [youtube, setYT] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [medium, setMedium] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [bannerSrc, setBannerSrc] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [isAvatarUpdated, avatarUpdated] = useState(false);
  const [isBannerUpdated, bannerUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

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
      fontSize: "4rem",
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
      width: "100%",
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
      WebkitClipPath:
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
      "&.Mui-disabled": {
        color: "#6c6c6c",
      },
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
        image: bgImage,
        description: "NFT Description",
      },
    },
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await registerOrFetchUserSetting(account, "theta");
        setUserSetting(fetchedData);

        if (fetchedData !== undefined && fetchedData !== {}) {
          setTitle(fetchedData.title || "");
          setAbout(fetchedData.description || "");
          setTelegram(fetchedData.telegram || "");
          setTwitter(fetchedData.twitter || "");
          setDiscord(fetchedData.discord || "");
          setInstagram(fetchedData.instagram || "");
          setFacebook(fetchedData.facebook || "");
          setYT(fetchedData.youtube || "");
          setMedium(fetchedData.medium || "");
          setTiktok(fetchedData.tikTok || "");
        }

        setLoading(false);
      } catch (error) {
        // Handle error here, e.g. show an error message
        console.log("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBannerClick = () => {
    const bannerInput = document.getElementById("bannerInput");
    bannerInput.click();
  };

  const handleAvatarClick = () => {
    const avatarInput = document.getElementById("avatarInput");
    avatarInput.click();
  };

  const handleBannerSelection = (event) => {
    const bannerInput = document.getElementById("bannerInput");
    if (bannerInput && bannerInput.files && bannerInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setBannerSrc(e.target.result);
        bannerUpdated(true);
      };
      const val = reader.readAsDataURL(bannerInput.files[0]);
      // console.log(val);
    }
  };

  const handleAvatarSelection = (event) => {
    const avatarInput = document.getElementById("avatarInput");
    if (avatarInput && avatarInput.files && avatarInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setAvatarSrc(e.target.result);
        avatarUpdated(true);
      };
      const val = reader.readAsDataURL(avatarInput.files[0]);
      // console.log(val);
    }
  };

  const handleSave = async () => {
    let saveObj = {};

    if (isBannerUpdated) {
      saveObj = {
        ...saveObj,
        bannerImage: bannerSrc,
      };
    }

    if (isAvatarUpdated) {
      saveObj = {
        ...saveObj,
        avatarImage: avatarSrc,
      };
    }

    saveObj = {
      ...saveObj,
      walletAddress: account,
      title: title,
      description: about,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      discord: discord,
      tikTok: tiktok,
      youtube: youtube,
      medium: medium,
      telegram: telegram,
    };

    try {
      const fetchedData = await updateUserSetting(saveObj);
      toast.success(fetchedData.message, {
        position: "top-center",
      });

      bannerUpdated(false);
      avatarUpdated(false);
      setLoading(false);
    } catch (error) {
      // Handle error here, e.g. show an error message
      console.log("Error loading data:", error);
      toast.error(error.message, {
        position: "top-center",
      });

      bannerUpdated(false);
      avatarUpdated(false);
      setLoading(false);
    }
  };

  const onClosePickDialog = async () => {
    try {
      const fetchedData = await registerOrFetchUserSetting(account, "theta");
      setUserSetting(fetchedData);
    } catch (error) {
      // Handle error here, e.g. show an error message
      console.log("Error loading data:", error);
    }
  };

  return (
    <Box>
      {openNFT1 && (
        <PickDialog
          open={openNFT1}
          setOpen={setOpenNFT1}
          onClose={onClosePickDialog}
          wallet={account}
          nftIndex={1}
        />
      )}
      {openNFT2 && (
        <PickDialog
          open={openNFT2}
          setOpen={setOpenNFT2}
          onClose={onClosePickDialog}
          wallet={account}
          nftIndex={2}
        />
      )}
      {openNFT3 && (
        <PickDialog
          open={openNFT3}
          setOpen={setOpenNFT3}
          onClose={onClosePickDialog}
          wallet={account}
          nftIndex={3}
        />
      )}
      <div>
        <input
          //   {...getInputProps()}
          onChange={handleBannerSelection}
          id="bannerInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <div
          onMouseEnter={() => setHoveredBG(true)}
          onMouseLeave={() => setHoveredBG(false)}
        >
          <img
            src={
              bannerSrc
                ? bannerSrc
                : userSetting.bannerImage
                ? process.env.REACT_APP_API_URL + userSetting.bannerImage
                : bgImage
            }
            alt="bg-image"
            style={{
              width: "100%",
              height: "45vh",
              objectFit: "cover",
            }}
          />
          {hoveredBG && (
            <Button
              onClick={handleBannerClick}
              component="label"
              sx={styles.buildIcon}
            >
              <AddAPhotoIcon sx={styles.editIcon} />
            </Button>
          )}
        </div>
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
                  src={
                    avatarSrc
                      ? avatarSrc
                      : userSetting.avatarImage
                      ? process.env.REACT_APP_API_URL + userSetting.avatarImage
                      : bgImage
                  }
                  alt="profileImage"
                  style={styles.image}
                  width="180px"
                  height="180px"
                />
                <input
                  id="avatarInput"
                  type="file"
                  onChange={handleAvatarSelection}
                  style={{ display: "none" }}
                />
                {hoveredPP && (
                  <Button sx={styles.photoIcon} onClick={handleAvatarClick}>
                    <AddAPhotoRoundedIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
              <Box sx={styles.column}>
                <TextField
                  type="url"
                  variant="standard"
                  hiddenLabel
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#6c6c6c",
                    },
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-wo-padding"
                  InputProps={{
                    style: {
                      backgroundColor: "#3D3D3D",
                      color: "#6C6C6C",
                      border: "1px solid #6C6C6C",
                      borderRadius: "0.594rem",
                      padding: "0.5rem",
                      width: "20rem",
                      "& .": {
                        padding: 0,
                      },
                    },
                    disableUnderline: true,
                    size: "small",
                    placeholder: "| User Title",
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
                  src={
                    (userSetting &&
                      userSetting.nft1 &&
                      userSetting.nft1.bannerImage) ||
                    bgImage
                  }
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
                    <BuildIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
              <div
                onMouseEnter={() => setHoveredNFT2(true)}
                onMouseLeave={() => setHoveredNFT2(false)}
                style={styles.container}
              >
                <img
                  src={
                    (userSetting &&
                      userSetting.nft2 &&
                      userSetting.nft2.bannerImage) ||
                    bgImage
                  }
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
                    <BuildIcon sx={styles.editIcon} />
                  </Button>
                )}
              </div>
              <div
                onMouseEnter={() => setHoveredNFT3(true)}
                onMouseLeave={() => setHoveredNFT3(false)}
                style={styles.container}
              >
                <img
                  src={
                    (userSetting &&
                      userSetting.nft3 &&
                      userSetting.nft3.bannerImage) ||
                    bgImage
                  }
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
                    <BuildIcon sx={styles.editIcon} />
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
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
              <Button
                sx={styles.orangeButton}
                variant="contained"
                onClick={handleSave}
                disabled={loading}
              >
                Save
              </Button>
            </Box>
            <Box sx={styles.socialcontent}>
              <TextField
                type="url"
                variant="standard"
                hiddenLabel
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={youtube}
                onChange={(e) => setYT(e.target.value)}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#6c6c6c",
                  },
                }}
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
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
