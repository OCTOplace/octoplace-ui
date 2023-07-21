import { Box } from "@mui/material";
import React from "react";

function RecentMessages({ messages }) {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "1rem",
      width: "100%",
      height: "100%",
      maxHeight: "400px",
      overflowY: "auto",
      padding: "1rem",
      backgroundColor: "transparent",
      border: "1px solid #6C6C6C",
      borderRadius: "1rem",
    },
    messageRow: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "1rem",
      width: "100%",
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#6C6C6C",
    },
    textCol: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "0.5rem",
    },
    name: {
      fontSize: "0.938rem",
      fontWeight: "600",
      color: "#F78C09",
    },
    clipBordIcon: {
      fontSize: "0.938rem",
      color: "#6C6C6C",
    },
    message: {
      fontSize: "0.938rem",
      fontWeight: "400",
      color: "#F4F4F4",
    },
  };

  // const messages = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe 2",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe 3",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   },
  // ];

  const RecentMessages = messages.slice(0, 3);

  return (
    <Box sx={styles.container}>
      {RecentMessages &&
        RecentMessages.map((message) => (
          <Box key={message.id} sx={styles.messageRow}>
            <Box sx={styles.avatar}>
              {message.avatarImage && (
                <img
                  src={process.env.REACT_APP_API_URL + message.avatarImage}
                  alt="collection-avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
            <Box sx={styles.textCol}>
              <Box sx={styles.name}>
                {message.title ? message.title : message.senderAddress}
              </Box>
              <Box sx={styles.message}>
                {message.message.length > 80
                  ? message.message.slice(0, 50) + "..."
                  : message.message}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
}

export default RecentMessages;
