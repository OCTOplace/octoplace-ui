/* eslint-disable react-hooks/exhaustive-deps */
import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNetworkInfo } from "../../connectors/networks";
import { JsonRpcProvider } from "@ethersproject/providers";
import { setTxStatus } from "../../redux/slices/tx-slice";
import { txStatus } from "../../constants/tx-initiators";

export const TxProcess = () => {
  const txHash = useSelector((state) => state.txProcess.txHash);
  const chainId = useSelector((state) => state.account.chainId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (txHash && txHash !== "" && chainId && chainId !== "") {
        processTx();
    }
  }, [txHash, chainId]);

  const processTx = async () => {
    do{
        try{
            const { dataNetwork } = getNetworkInfo(getNetworkName(chainId));
            const provider = new JsonRpcProvider(dataNetwork.RPC);
            const receipt = await provider.getTransactionReceipt(txHash);
            if(receipt){
                if(receipt.status === 1){
                    dispatch(setTxStatus(txStatus.COMPLETED));
                    break;
                }else if(receipt.status !==1){
                    dispatch(setTxStatus(txStatus.FAILED));
                    break;
                }
            }
        }catch{
            continue;
        }
    }while(true);
  };

  return <CssBaseline />;
};

const getNetworkName = (chanId) => {
  switch (chanId) {
    case 361:
      return "theta";
    case 2222:
      return "kava";
    default:
      return "theta";
  }
};
