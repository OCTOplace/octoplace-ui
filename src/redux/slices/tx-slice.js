import { createSlice } from "@reduxjs/toolkit";
import { txInitiators, txStatus } from "../../constants/tx-initiators";

const initialState = {
    txHash: "",
    txInitiator: txInitiators.NO_INITIATOR,
    status: txStatus.IDLE
}

const txProcessSlice = createSlice({
    name: "tx-process",
    initialState,
    reducers: {
        startTxProcess: (state, action) => {
            state.txHash = action.payload.txHash;
            state.txInitiator = action.payload.initiator;
            state.status = txStatus.PROCESSING;
        },
        completeTxProcess: (state, action) => {
            state.txHash = "";
            state.txInitiator = txInitiators.NO_INITIATOR;
            state.status = txStatus.COMPLETED;
        },
        abortTxProcess: (state, action) => {
            state.txHash = "";
            state.txInitiator = txInitiators.NO_INITIATOR;
            state.status = txStatus.FAILED;
        },
        setTxStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const {
    abortTxProcess,completeTxProcess,startTxProcess, setTxStatus
  } = txProcessSlice.actions;

  export default txProcessSlice.reducer;