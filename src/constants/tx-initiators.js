 export const txInitiators = {
    NO_INITIATOR: "no_initiator",
    POST_NFT_COMMENT: "post_nft_comment",
    POST_COLLECTION_COMMENT: "post_collection_comment",
    ADD_SWAP_LISTING: 'add_swap_listing',
    ADD_SWAP_LISTING_APPROVE: "add_swap_listing_approve",
    REMOVE_SWAP_LISTING: "remove_swap_listing",
    TRANSFER_NFT: "transfer_nft",
    ADD_MARKET_LISTING: "add_market_listing",
    ADD_MARKET_LISTING_APPROVE: "add_market_listing_approve",
    UPDATE_MARKET_LISTING_PRICE: "update_market_listing_price",
    REMOVE_MARKET_LISTING: "remove_market_listing",
    ADD_SWAP_OFFER_APPROVE: "add_swap_offer_approve",
    ADD_SWAP_OFFER: "add_swap_offer",
    WITHDRAW_SWAP_OFFER: "withdraw_swap_offer",
    DECLINE_SWAP_OFFER: "decline_swap_offer",
    ACCEPT_SWAP_OFFER: "accept_swap_offer",
}

export const txStatus = {
    IDLE: "no_tx",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed"
}