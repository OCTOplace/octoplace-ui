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
    if (!found) {
      result.push(nft);
    }
  });
  return result;
}
