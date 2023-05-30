import { Box } from "@mui/material";
import React from "react";

function RecentMessages() {

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

  const messages = [
    {
      id: 1,
      name: "John Doe",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 2,
      name: "John Doe 2",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 3,
      name: "John Doe 3",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  return (
    <Box sx={styles.container}>
      {messages.map((message) => (
        <Box key={message.id} sx={styles.messageRow}>
          <Box sx={styles.avatar}></Box>
          <Box sx={styles.textCol}>
            <Box sx={styles.name}>{message.name}</Box>
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
