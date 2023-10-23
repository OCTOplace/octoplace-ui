import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import thetaImage from "../../../assets/icon.png";
import NFTlist from "./NFTlist";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

const styles = {
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    my: 3,
  },
  videoBox: {
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  playIconButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  },
  playIcon: {
    color: "#fff",
    fontSize: "3rem",
  },
  descriptionContainer: (theme) => ({
    display: "flex",
    justifyContent: "space-between",
    gap: 5,
    color: "#f4f4f4",
    [theme.breakpoints.down(768)]: {
      flexDirection: "column",
    },
  }),
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  h1: {
    fontWeight: 600,
    fontSize: "1.75rem",
  },
  h2: {
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  p: {
    fontWeight: 400,
    fontSize: "1rem",
  },
  pGray: {
    fontWeight: 400,
    fontSize: ".75rem",
    color: "#6C6C6C",
  },
  pWhite: {
    fontWeight: 400,
    fontSize: ".75rem",
    color: "#f4f4f4",
  },
  rContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  ownerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 1,
    border: "0.792651px solid #6C6C6C",
    borderRadius: "0.594rem",
  },
  ownerBox: (theme) => ({
    display: "flex",
    flexDirection: "column",
    width: "200px",
    gap: 1,
    px: 3,
    py: 2,
    [theme.breakpoints.down(768)]: {
      width: "100%",
    },
  }),
  orangeButton: {
    width: "100%",
    backgroundColor: "#F78C09",
    color: "#262626",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "0.594rem",
    "&:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 3,
    my: 3,
    color: "#f4f4f4",
  },
  textInput: {
    color: "#f4f4f4",
    borderColor: "#f4f4f4",
  },
  chainContainer: (theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    [theme.breakpoints.down(1200)]: {
      flexDirection: "column",
    },
  }),
  chainPaper: (theme) => ({
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    gap: 2,
    py: 0.5,
    px: 2,
    m: 0,
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    [theme.breakpoints.down(1200)]: {
      width: "100%",
    },
  }),
};

function Content({
  isOwner,
  address,
  activeListings,
  view,
  videoTitle,
  videoDesc,
  videoUrl,
}) {
  // const videoRef = useRef(null);
  // const [isOwner, setIsOwner] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [showButton, setShowButton] = useState(true);
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const [chain, setChain] = useState("Theta Mainnet");
  const [chipData, setChipData] = useState([
    { key: 0, label: "2160p" },
    { key: 1, label: "1080p" },
    { key: 2, label: "720p" },
    { key: 3, label: "480p" },
    { key: 4, label: "360p" },
  ]);
  const [uploadData, setUploadData] = useState();
  const [movie, setMovie] = useState();

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleChainChange = (event) => {
    setChain(event.target.value);
  };

  const onDrop = (acceptedFiles) => {
    // Handle dropped files logic here
    console.log(acceptedFiles);
    let files;
    if (acceptedFiles != null) {
      files = acceptedFiles[0];
    }
    if (files != null) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      setMovie(files);
      // fileReader.addEventListener('load', function () {
      //   const video = this.result;
      // });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Save");
    if (uploadData == null) return;
    const formData = new FormData();
    if (movie != null || movie !== "") {
      formData.append("file", movie);
      console.log("movie:", movie);
    }
    const headers = {
      "Content-type": "application/octet-stream",
    };
    try {
      console.log("presigned_url: ", uploadData.presigned_url);
      const response = await axios.put(uploadData.presigned_url, formData, {
        headers: headers,
      });
      const data = response.data;
      console.log("Submit: ", data);
    } catch (err) {
      console.log("Submitting Error: ", err);
    }
  };
  /*
  const handlePlayVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleChangeURL = (e) => {
    console.log(e);
    const url = e.target.value;
  };

  const getPreSignedUrl = async () => {
    const headers = {
      "x-tva-sa-id": "srvacc_fp72dqw4ix8r6ad6vr9evm68d",
      "x-tva-sa-secret": "xn0xqh78s04e0n67vkbwwztq2zvp7scg",
    };
    try {
      const response = await axios.post(
        "https://api.thetavideoapi.com/upload",
        undefined,
        { headers: headers }
      );
      const data = response.data;
      const uploadsData = data.body.uploads[0];
      setUploadData(uploadsData);
    } catch (err) {
      console.log("Pre-Signed URL Error: ", err);
    }
  };
*/

  useEffect(() => {
    // getPreSignedUrl();
  }, []);

  return (
    <Container>
      {openAddVideo ? (
        <Box sx={styles.formContainer}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1rem",
            }}
          >
            <Typography sx={styles.h1}>New Video</Typography>

            <TextField
              type="url"
              variant="standard"
              hiddenLabel
              InputProps={{
                style: {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                },
                disableUnderline: true,
                size: "small",
                placeholder: "| Enter URL",
              }}
            />

            <Typography sx={styles.h1}>or</Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "25vh",
                backgroundColor: "#3D3D3D",
                borderRadius: "0.594rem",
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : movie != null ? (
                movie.name
              ) : (
                <p>Drag &amp; Drop Input (Video File)</p>
              )}
            </div>

            <Box sx={styles.chainContainer}>
              <Paper sx={styles.chainPaper} component="ul">
                {chipData.map((data) => {
                  return (
                    <Box key={data.key}>
                      <Chip
                        clickable={true}
                        label={data.label}
                        onDelete={handleDelete(data)}
                        sx={{
                          border: "1px solid white",
                          borderRadius: "0.594rem",
                          color: "white",
                          //change color of delete icon
                          "& .MuiChip-deleteIcon": {
                            color: "white",
                          },
                        }}
                        deleteIcon={<CloseIcon />}
                      />
                    </Box>
                  );
                })}
              </Paper>
              <FormControl
                variant="standard"
                sx={{ display: "flex", flex: 1, width: "100%" }}
              >
                <Select
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    borderRadius: "0.594rem",
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiSelect-select:not(:focus):not([multiple]):not([disabled])":
                      {
                        color: "white",
                      },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                  }}
                  onChange={handleChainChange}
                  value={chain}
                >
                  {/* <MenuItem value="">Select an option</MenuItem> */}
                  <MenuItem value="Theta Mainnet">Theta Mainnet</MenuItem>
                  <MenuItem value="Theta Testnet">Theta Testnet</MenuItem>
                  <MenuItem value="Ethereum Mainnet">Ethereum Mainnet</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              type="text"
              variant="standard"
              hiddenLabel
              InputProps={{
                style: {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                  "& .MuiInputBase-input": {
                    padding: 0,
                  },
                },
                disableUnderline: true,
                size: "small",
                placeholder: "| Enter Video Name",
              }}
            />
            <TextField
              type="text"
              variant="standard"
              hiddenLabel
              InputProps={{
                style: {
                  backgroundColor: "#3D3D3D",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "0.594rem",
                  padding: "0.5rem",
                  "& .MuiInputBase-input": {
                    padding: 0,
                  },
                  // make zero the padding of the input text
                },
                disableUnderline: true,
                size: "small",
                placeholder: "| Collection Address (Optional)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 3,
                color: "white",
              }}
            >
              <Typography sx={styles.h3}>Select NFT Network</Typography>
              <FormControl
                variant="standard"
                sx={{ display: "flex", flex: 1 / 2 }}
              >
                <Select
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    borderRadius: "0.594rem",
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiSelect-select:not(:focus):not([multiple]):not([disabled])":
                      {
                        color: "white",
                      },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                  }}
                  value={""}
                >
                  <MenuItem value="">Select an option</MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography
              sx={{
                color: "#6C6C6C",
                fontSize: "1.125rem",
              }}
            >
              If a collection address is added, users MUST have at least one NFT
              from the specified collection in order to view the video
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "justify-between",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#3D3D3D",
                  color: "#151515",
                  flex: 1,
                }}
                type="submit"
                variant="contained"
              >
                CANCEL
              </Button>
              <Button
                sx={{
                  backgroundColor: "#F78C09",
                  color: "#151515",
                  flex: 1,
                }}
                type="submit"
                variant="contained"
                color="primary"
              >
                SAVE
              </Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Box sx={styles.videoContainer}>
          {videoUrl && (
            <Box sx={styles.videoBox}>
              <Iframe
                sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                src={videoUrl}
                allowFullScreen
                width="100%"
              />
            </Box>
          )}
          <Box sx={styles.descriptionContainer}>
            <Box sx={styles.textContainer}>
              <Typography sx={styles.h1}>{videoTitle}</Typography>
              <Typography sx={styles.p}>{videoDesc}</Typography>
            </Box>
            <Box sx={styles.rContainer}>
              <Box sx={styles.ownerContainer}>
                <Box sx={styles.ownerBox}>
                  <Typography sx={styles.h2}>Theta Punks</Typography>
                  <Typography sx={styles.pGray}>Theta Punks</Typography>
                  <Typography sx={styles.pWhite}>
                    Following NFT Collection is required to Play the video.
                  </Typography>
                </Box>
                <img
                  src={thetaImage}
                  alt="profile"
                  style={{
                    width: "140px",
                    height: "100%",
                    borderRadius: ".594rem",
                  }}
                />
              </Box>
              <Tooltip
                title={
                  !isOwner && (
                    <Typography fontSize={"0.83rem"}>
                      Only owners of the collection can upload video.
                    </Typography>
                  )
                }
              >
                <spin style={{ fontSize: "smaller" }}>
                  <Button
                    onClick={() => {
                      if (!isOwner) {
                        toast(
                          "Only the owners of collections can upload videos.",
                          {
                            type: "info",
                          }
                        );
                        return;
                      }

                      setOpenAddVideo(true);
                    }}
                    sx={styles.orangeButton}
                    disabled={!isOwner}
                  >
                    Add Video
                  </Button>
                </spin>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}
      {/* <NFTlist activeListings={activeListings.slice(0, 6)} view={view} /> */}
    </Container>
  );
}

const Iframe = styled("iframe")(({ theme }) => ({
  height: "800px",
  [theme.breakpoints.down(992)]: {
    height: "672px",
  },
  [theme.breakpoints.down(768)]: {
    height: "492px",
  },
  [theme.breakpoints.down(420)]: {
    height: "400px",
  },
}));

export default Content;
