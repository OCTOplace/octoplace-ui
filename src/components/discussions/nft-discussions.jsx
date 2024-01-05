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
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
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
import {
  abortTxProcess,
  completeTxProcess,
  startTxProcess,
} from "../../redux/slices/tx-slice";
import { txInitiators, txStatus } from "../../constants/tx-initiators";
import avatarImage from "../../assets/default-user.jpg";

export const NFTDiscussions = ({ address, tokenId, network, isAccordion }) => {
  const sendDataToGTM = useGTMDispatch();
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [commentFee, setCommentFee] = useState(0);
  const [feeBalance, setFeeBalance] = useState("");
  const { account, chainId } = useWeb3React();
  const discussions = useSelector(
    (state) => state.discussion.selectedNFTDiscussions
  );
  const [discussion, setDiscussion] = useState(undefined);
  const { txInitiator, status } = useSelector((state) => state.txProcess);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      txInitiator === txInitiators.POST_NFT_COMMENT &&
      status === txStatus.COMPLETED
    ) {
      dispatch(createNFTDiscussion(discussion));
      toast.success("Comment Posted Successfuly!");
      setMessage("");
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(false));
      dispatch(completeTxProcess());
      setDiscussion(undefined);
    }
    if (
      txInitiator === txInitiators.POST_NFT_COMMENT &&
      status === txStatus.FAILED
    ) {
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
      dispatch(abortTxProcess());
    }
  }, [status]);

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
        padding: "2rem",
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
    setFeeBalance(Number(formatUnits(bal, 0)));
    setCommentFee(Number(formatUnits(fee, 0)));
  };

  useEffect(() => {
    return () => {
      dispatch(setNFTDiscussions([]));
    };
  }, []);

  const getDiscussions = async () => {
    dispatch(getNftDiscussions({ address, tokenId, network, owner: account }));
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
        signer,
        { value: 0 }
      );

      const txResult = await contract.addComment_native(
        address,
        tokenId,
        message,
        { value: commentFee }
      );
      dispatch(setTxDialogHash(txResult.hash));
      dispatch(
        startTxProcess({
          txHash: txResult.hash,
          initiator: txInitiators.POST_NFT_COMMENT,
        })
      );
      setDiscussion({
        address,
        tokenId,
        network,
        sender: account,
        message,
      });
      txResult.wait();
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
        <Box sx={styles.container}>
          {discussions.map((message) => (
            <Box key={message._id} sx={styles.messageRow}>
              <Box sx={styles.avatar}>
                {message.user && (
                  <img
                    src={
                      message.user.avatarImage
                        ? process.env.REACT_APP_API_URL + message.user.avatarImage
                        : avatarImage
                    }
                    alt="collection-avatar"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {!message.user && (
                  <img
                    src={avatarImage}
                    alt="collection-avatar"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                &nbsp;{(message.user && message.user.title) || shortenAddress(message.senderAddress)}
                <IconButton
                  onClick={() => {
                    copy(message.senderAddress);
                    toast.success("Address copied!");
                  }}
                  sx={styles.copyButton}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
                {message.message}

              </Box>
            </Box>
          ))}
        </Box>

        {
          /*
      <Box sx={styles.detailsBox}>
        discussions.map((item) => {
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
        })
      </Box>
      */
        }
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
    </Accordion >
  );
};
