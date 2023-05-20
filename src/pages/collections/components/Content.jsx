import { PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import thetaImage from "../../../assets/icon.png";
import NFTlist from "./NFTlist";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

function Content({ activeListings, view }) {
  const videoRef = useRef(null);
  const [isOwner, setIsOwner] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [openAddVideo, setOpenAddVideo] = useState(false);

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
    descriptionContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
      color: "#f4f4f4",
    },
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
    ownerBox: {
      display: "flex",
      flexDirection: "column",
      width: "200px",
      gap: 1,
      px: 3,
      py: 2,
    },
    orangeButton: {
      backgroundColor: "#F78C09",
      color: "#262626",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      borderRadius: "0.594rem",
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
  };

  const handlePlayVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Container>
      {openAddVideo ? (
        <Box sx={styles.formContainer}>
          <FormControl>
            <Typography sx={styles.h1}>New Video</Typography>
            <TextField
              fullWidth
              label="fullWidth"
              id="fullWidth"
              style={{ backgroundColor: "lightblue", borderRadius: "5px" }}
            />
            <Typography sx={styles.h1}>or</Typography>
          </FormControl>
        </Box>
      ) : (
        <Box sx={styles.videoContainer}>
          <Box sx={styles.videoBox}>
            {showButton && (
              <IconButton sx={styles.playIconButton} onClick={handlePlayVideo}>
                {isPlaying ? (
                  <PauseRounded sx={styles.playIcon} />
                ) : (
                  <PlayArrowRounded sx={styles.playIcon} />
                )}
              </IconButton>
            )}
            <video
              muted
              playsInline
              width="100%"
              height={800}
              controls
              ref={videoRef}
              src="https://d21ozv67drxbfu.cloudfront.net/appietoday.test/media/2017/09/04/asset-1175875-1504515710530864.mp4"
            ></video>
          </Box>
          <Box sx={styles.descriptionContainer}>
            <Box sx={styles.textContainer}>
              <Typography sx={styles.h1}>Video Title</Typography>
              <Typography sx={styles.p}>
                MATRËSHKA (Matryoshka) dollhouse is an NFT-based project
                revolving around storytelling and a series of tasks to be
                completed by the holders to acquire a prize with a real-life
                value in the end. The collection aims to entertain the
                supporters, while pushing the boundaries of classic
                straightforward lore development by adding interactivity and the
                need for progression. Lore-friendly breeding-like mechanic,
                advantages for completing a set, unique merchandise, blockchain
                DRM technologies and various tangible utilities - expect these
                and many more perks!
              </Typography>
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
                  alt="profile-image"
                  style={{
                    width: "140px",
                    height: "100%",
                    borderRadius: ".594rem",
                  }}
                />
              </Box>
              {isOwner ? (
                <Button
                  onClick={() => setOpenAddVideo(true)}
                  sx={styles.orangeButton}
                >
                  Add Video
                </Button>
              ) : null}
            </Box>
          </Box>
        </Box>
      )}
      <NFTlist activeListings={activeListings.slice(0, 6)} view={view} />
    </Container>
  );
}

export default Content;
