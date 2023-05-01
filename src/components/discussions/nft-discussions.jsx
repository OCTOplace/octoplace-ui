/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ContentCopy,
  ExpandMore,
  QuestionAnswer,
  Send,
} from "@mui/icons-material";
import { shortenAddress } from "../../utils/string-util";
import { getNetworkInfo } from "../../connectors/networks";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { formatEther, formatUnits, parseUnits } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setTxDialogFailed,
  setTxDialogHash,
  setTxDialogPending,
  setTxDialogSuccess,
  showTxDialog,
} from "../../redux/slices/app-slice";

export const NFTDiscussions = ({ metadata, address, tokenId }) => {
  const styles = {
    accordion2: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid  #6C6C6C",
      borderRadius: "5px",
      marginBottom: "24px",
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
      borderBottom: "1px solid  #6C6C6C",
    },
    address: {
      fontWeight: 700,
      fontSize: "18px",
      color: "#FF9719",
      textTransform: "uppercase",
      marginTop: "8px",
    },
  };

  const [openSendDlg, setOpenSendDlg] = useState(false);
  const [message, setMessage] = useState("");
  const [feeToken, setFeeToken] = useState("");
  const [commentFee, setCommentFee] = useState(0);
  const [feeBalance, setFeeBalance] = useState("");
  const [feeSymbol, setFeeSymbol] = useState("");
  const { account, chainId } = useWeb3React();
  const [feeAllowance, setFeeAllowance] = useState(0);
  const [allowanceRefreshTrigger, setAllowanceRefreshTrigger] = useState(0);
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const format = (x) => {
    return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  const getFeeToken = async () => {
    const netInfo = getNetworkInfo("theta");
    const provider = new JsonRpcProvider(netInfo.dataNetwork.RPC);
    const contract = new Contract(
      netInfo.dataNetwork.DISCUSSION_CONTRACT,
      netInfo.dataNetwork.DISCUSSION_ABI,
      provider
    );

    const feeTokenAddress = await contract.erc20Token();
    setFeeToken(feeTokenAddress);

    const fee = await contract.commentFee();
    setCommentFee(Number(formatEther(fee)));

    const tokenContract = new Contract(
      feeTokenAddress,
      netInfo.dataNetwork.FEE_ABI,
      provider
    );
    const symb = await tokenContract.symbol();
    setFeeSymbol(symb);
    const bal = await tokenContract.balanceOf(account);
    setFeeBalance(format(Number(formatEther(bal))));
    getAllowance();
  };

  const getAllMessages = async () => {
    const netInfo = getNetworkInfo("theta");
    const provider = new JsonRpcProvider(netInfo.dataNetwork.RPC);
    const discussionContract = new Contract(
      netInfo.dataNetwork.DISCUSSION_CONTRACT,
      netInfo.dataNetwork.DISCUSSION_ABI,
      provider
    );

    const comments = await discussionContract.getAllCommentsOf(
      address,
      tokenId
    );
    let objs = [];
    for(var comment of comments){
      const obj = {
        from: comment.commenter,
        msg: comment.contents,
        timestamp: formatUnits(comment.timestamp, 0)
      }
      objs = [...objs, obj];
    }
    setMessages(objs);
  };

  useEffect(() => {
    if (address && tokenId) {
      getAllMessages();
    }
  }, [address, tokenId]);
  const getAllowance = async () => {
    const netInfo = getNetworkInfo("theta");
    const provider = new JsonRpcProvider(netInfo.dataNetwork.RPC);
    const tokenContract = new Contract(
      feeToken,
      netInfo.dataNetwork.FEE_ABI,
      provider
    );
    const allowedAmt = await tokenContract.allowance(
      account,
      netInfo.dataNetwork.DISCUSSION_CONTRACT
    );
    setFeeAllowance(Number(formatEther(allowedAmt)));
    console.log("Allowed:", Number(formatEther(allowedAmt)));
  };
  useEffect(() => {
    if (account && feeToken) {
      getAllowance();
    }
  }, [account, allowanceRefreshTrigger, feeToken]);
  useEffect(() => {
    if (account) {
      getFeeToken();
    }
  }, [account]);

  const handleFeeApprove = async () => {
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
        feeToken,
        netInfo.dataNetwork.FEE_ABI,
        signer
      );
      const txResult = await contract.approve(
        netInfo.dataNetwork.DISCUSSION_CONTRACT,
        parseUnits(commentFee.toString(), "ether")
      );
      dispatch(setTxDialogHash(txResult.hash));
      await txResult.wait();
      toast.success("Approval Successful!");
      getAllowance();
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(false));
    } catch (err) {
      console.log("Error");
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
    }
  };

  const handleSendMessage = async () => {
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
        netInfo.dataNetwork.DISCUSSION_CONTRACT,
        netInfo.dataNetwork.DISCUSSION_ABI,
        signer
      );
      const txResult = await contract.addComment_erc20(
        address,
        tokenId,
        message
      );
      dispatch(setTxDialogHash(txResult.hash));
      await txResult.wait();
      toast.success("Comment Posted Successfuly!");
      setOpenSendDlg(false);
      setMessage("");
      getAllowance();
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
    <Accordion sx={styles.accordion2} variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{ fontWeight: "700", alignItems: "center", display: "flex" }}
        >
          <QuestionAnswer /> &nbsp;&nbsp;Discussion
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "1px solid #6C6C6C",
        }}
      >
        <Box sx={styles.detailsBox}>
         {
          messages.map((item) => {
            return (
              <Box key={item.timestamp} sx={styles.comments}>
              <Typography sx={styles.address}>
                {shortenAddress(item.from)}
                <IconButton sx={{ ml: 2, color: "#FF9719" }}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Typography>
              <Typography sx={{ mb: 2 }} variant="body1">
                {item.msg}
              </Typography>
            </Box>
            )
          })
         }
          
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box sx={{ width: "80%", pt: 2, pr: 1 }}>
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
            />
          </Box>
          <Box sx={{ width: "20%", pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenSendDlg(true)}
              endIcon={<Send />}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Dialog maxWidth={"xs"} fullWidth open={openSendDlg}>
          <DialogTitle
            sx={{ color: "white", textTransform: "uppercase", fontWeight: 700 }}
            className="tx-dialog"
          >
            Add Comment
          </DialogTitle>
          <DialogContent className="tx-dialog">
            <Typography>
              Your {feeSymbol} Balance: {`${feeBalance} ${feeSymbol}`}
            </Typography>
            <Typography>
              {feeSymbol} Required: &nbsp; &nbsp; {`${commentFee} ${feeSymbol}`}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ pb: 2, pr: 2 }} className="tx-dialog">
            {feeAllowance >= commentFee ? (
              <Button onClick={handleSendMessage} variant="contained">
                Send Message
              </Button>
            ) : (
              <Button onClick={handleFeeApprove} variant="contained">
                Approve
              </Button>
            )}

            <Button
              color="error"
              variant="contained"
              onClick={() => setOpenSendDlg(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};
