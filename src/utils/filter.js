export function filterListedNFTs(nfts, activeListings, activeOffers) {
  const result = [];
  nfts.forEach((nft) => {
    const found = activeListings.find(
      (x) =>
        x.listingDetails.tokenId === nft.tokenId &&
        x.listingDetails.tokenAddress === nft.contractAddress &&
        !x.listingDetails.isCompleted &&
        !x.listingDetails.isCancelled
    );
    const found2 = activeOffers.find(
      (x) =>
        x.isCompleted ===false &&
        x.isCancelled ===false &&
        Number(x.offerTokenId) === Number(nft.tokenId) &&
        x.offerTokenAddress === nft.contractAddress
    );
    if (!found ) {
      if(!found2){
        result.push(nft);
      }
    }
  });
  return result;
}
