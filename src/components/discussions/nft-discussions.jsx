/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ContentCopy, ExpandMore, QuestionAnswer } from "@mui/icons-material";
import { shortenAddress } from "../../utils/string-util";
import { getNetworkInfo } from "../../connectors/networks";
import {  JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setTxDialogFailed,
  setTxDialogHash,
  setTxDialogPending,
  setTxDialogSuccess,
  showTxDialog,
} from "../../redux/slices/app-slice";
import copy from "clipboard-copy";
import { setNFTDiscussions } from "../../redux/slices/discussions-slice";
import {
  createNFTDiscussion,
  getNftDiscussions,
} from "../../redux/thunk/get-discussions";

import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import { formatUnits } from "@ethersproject/units";

export const NFTDiscussions = ({ address, tokenId, network, isAccordion }) => {
  const sendDataToGTM = useGTMDispatch();
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [commentFee, setCommentFee] = useState(0);
  const [feeBalance, setFeeBalance] = useState("");
  const [feeSymbol, setFeeSymbol] = useState("");
  const { account, chainId } = useWeb3React();
  const discussions = useSelector(
    (state) => state.discussion.selectedNFTDiscussions
  );

  const dispatch = useDispatch();
  const styles = {
    accordion2: {
      backgroundColor: "transparent",
      color: expanded ? "#f4f4f4" : "#6c6c6c",
      border: "1px solid  #6C6C6C",
      borderRadius: ".5rem",
      marginBottom: "1rem",
      "&:hover": {
        border: "1px solid #f4f4f4",
        color: "#f4f4f4",
      },
      "&:hover .MuiSvgIcon-root": {
        color: "#f4f4f4",
      },
    },
    accordionHeader: {
      fontWeight: 400,
      fontsize: "1.125rem",
      lineHeight: "105.02%",
    },
    accordionBody: {
      backgroundColor: "#151515",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      maxHeight: "470px",
      overflowY: "scroll",
      borderRadius: ".5rem",
    },
    detailsBox: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxHeight: "470px",
      overflowY: "scroll",
      justifyContent: "flex-start",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: "8px",
    },
    comments: {
      width: "100%",
    },
    address: {
      fontWeight: 600,
      fontSize: ".875rem",
      color: "#FF9719",
      textTransform: "none",
      display: "flex",
      alignItems: "center",
    },
    copyButton: {
      color: "#6C6C6C",
      fontSize: ".75rem",
    },
    message: {
      color: "white",
      fontSize: ".875rem",
      fontWeight: 400,
    },
    textContainer: {
      width: "80%",
      pt: 2,
      pr: 1,
    },
    sendButton: {
      background: "#F78C09",
      borderRadius: ".375rem",
      color: "#262626",
      fontWeight: 600,
      width: "20%",
      textTransform: "none",
      "&:disabled": {
        opacity: 0.3,
        cursor: "not-allowed",
        background: "#F78C09",
        color: "#262626",
      },
    },
  };

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const getCommentFee = async () => {
    const netInfo = getNetworkInfo(network);
    const provider = new JsonRpcProvider(netInfo.dataNetwork.RPC);
    const contract = new Contract(
      netInfo.dataNetwork.NFT_DISCUSSION_CONTRACT,
      netInfo.dataNetwork.NFT_DISCUSSION_ABI,
      provider
    );
    const bal = await provider.getBalance(account);
    const fee = await contract.commentFee();
    setFeeBalance(Number(formatUnits(bal,0)));
    setCommentFee(Number(formatUnits(fee,0)));
  }
  const format = (x) => {
    return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  useEffect(() => {
    return () => {
      dispatch(setNFTDiscussions([]));
    };
  }, []);

  
  const getDiscussions = async () => {
    dispatch(getNftDiscussions({ address, tokenId, network }));
  };

  useEffect(() => {
    if (address && tokenId) {
      getDiscussions();
      getCommentFee();
    }
  }, [address, tokenId]);



  useEffect(() => {
    // if isAccordion is false expand the accordion default
    if (!isAccordion) {
      setExpanded(true);
    }
    if (account) {
      getCommentFee();
    }
  }, [account]);

  //useEffect(() => { }, [discussions]);

  
  const handleSendMessage = async () => {
    if (!message) {
      return;
    }

    const netInfo = getNetworkInfo("theta");
    dispatch(showTxDialog());
    try {
      if (chainId !== parseInt(netInfo.dataNetwork.CHAIN_ID)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [netInfo.switch],
        });
      }
      const provider = new Web3Provider(window.ethereum, "any");
      const signer = await provider.getSigner();
      const contract = new Contract(
        netInfo.dataNetwork.NFT_DISCUSSION_CONTRACT,
        netInfo.dataNetwork.NFT_DISCUSSION_ABI,
        signer, {value: 0}
      );

      const txResult = await contract.addComment_native(
        address,
        tokenId,
        message,
        {value: commentFee}
      );
      dispatch(setTxDialogHash(txResult.hash));
      await txResult.wait();
      dispatch(
        createNFTDiscussion({
          address,
          tokenId,
          network,
          sender: account,
          message,
        })
      );
      toast.success("Comment Posted Successfuly!");
      setMessage("");
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(false));
    } catch (err) {
      console.log("Error", err);
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
    }
  };

  return (
    <Accordion
      sx={styles.accordion2}
      expanded={expanded}
      onChange={handleChange}
    >
      {isAccordion ? (
        <AccordionSummary
          expandIcon={
            <ExpandMore sx={{ color: expanded ? "#f4f4f4" : "#6c6c6c" }} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={styles.accordionHeader}>
            <QuestionAnswer /> &nbsp;&nbsp;Discussion
          </Typography>
        </AccordionSummary>
      ) : (
        <></>
      )}
      <AccordionDetails sx={styles.accordionBody}>
        <Box sx={styles.detailsBox}>
          {discussions.map((item) => {
            return (
              <Box key={item._id} sx={styles.comments}>
                <Typography sx={styles.address}>
                  {shortenAddress(item.senderAddress)}
                  <IconButton
                    onClick={() => {
                      copy(item.senderAddress);
                      toast.success("Address copied!");
                    }}
                    sx={styles.copyButton}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Typography>
                <Typography sx={styles.message} variant="body1">
                  {item.message}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box sx={styles.row}>
          <Box sx={styles.textContainer}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              maxRows={5}
              autoComplete="no"
              autofill="no"
              sx={{ color: "white" }}
              variant="standard"
              fullWidth
              placeholder="Enter your message here"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Box>
          <LoadingButton
            fullWidth
            variant="contained"
            loading={false}
            loadingPosition="start"
            onClick={() => {
              if (!message) {
                return;
              }

              if (!account) {
                toast.info("Please connect your wallet!");
                return;
              }

              if (feeBalance < commentFee) {
                toast.warn("Insufficient funds for gas.");
                return;
              }

              sendDataToGTM({
                event: "Opened Add Comment Popup (NFT Discussion)",
                customData: {
                  "Collection Address": address,
                  "token Id": tokenId,
                },
              });

              handleSendMessage();
            }}
            sx={styles.sendButton}
          >
            Send
          </LoadingButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};