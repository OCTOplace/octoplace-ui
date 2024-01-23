 export const txInitiators = {
    NO_INITIATOR: "no_initiator",
    POST_NFT_COMMENT: "post_nft_comment",  //done
    POST_COLLECTION_COMMENT: "post_collection_comment", //done
    ADD_SWAP_LISTING: 'add_swap_listing', //done
    ADD_SWAP_LISTING_APPROVE: "add_swap_listing_approve", //done
    REMOVE_SWAP_LISTING: "remove_swap_listing", //done
    TRANSFER_NFT: "transfer_nft", //done
    ADD_MARKET_LISTING: "add_market_listing", //done
    ADD_MARKET_LISTING_APPROVE: "add_market_listing_approve", //done
    UPDATE_MARKET_LISTING_PRICE: "update_market_listing_price", //done
    REMOVE_MARKET_LISTING: "remove_market_listing",//done
    ADD_SWAP_OFFER_APPROVE: "add_swap_offer_approve", //done
    ADD_SWAP_OFFER: "add_swap_offer", //done
    WITHDRAW_SWAP_OFFER: "withdraw_swap_offer", //done
    DECLINE_SWAP_OFFER: "decline_swap_offer", //done
    ACCEPT_SWAP_OFFER: "accept_swap_offer", //done
    BUY_MARKET_LISTING: "buy_market_listing"
}

export const txStatus = {
    IDLE: "no_tx",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed"
}