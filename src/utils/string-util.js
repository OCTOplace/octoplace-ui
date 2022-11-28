export function shortenAddress(address) {
  const first = address.substring(0, 8);
  const last = address.substring(address.length - 5, address.length - 1);

  return `${first}...${last}`;
}

export function getImageUrl(uri) {
  if (uri.includes("ipfs://")) {
    let url = uri;
    const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
    return newUrl;
  } else {
    return uri;
  }
}
