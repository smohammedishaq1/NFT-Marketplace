import ContractInstance from "../useContract";
import { web3 } from "../useContract";
import axios from "axios";

import { fetchAllNFTs } from "../../apis/FetchNFTs";

function extractHashFromUrl(url) {
  const parts = url.split("/"); // Split the URL by '/'
  return parts[parts.length - 2]; // Return the second to last element, which is the hash
}

const fetchNFTById = async (NftId) => {
  try {
    console.log("worked try");
    const allNFTs = await fetchAllNFTs("", "", 10);
    console.log(allNFTs);
    const numericNftId = Number(NftId);
    console.log(NftId);

    // Filter the NFTs to only include those where NFTid matches the passed NftId
    const response = allNFTs.filter((nft) => nft.NFTid === numericNftId);

    const hashMap = {
      0: "bafyreieobzh55clbrfphdhhauqlropevyzzm2s7mvwynh7smduie4m6haq",
      1: "bafyreidtn5dzuyl5dzzegco5qqauhvxnq4dagzixfwefuzrfu2iiy47qia",
      2: "bafyreicvtpkprdwa4v336xy24fvypcvfsegow2b7xpzvrtpjo4faxb2nry",
      5: "bafyreib4nwfxit4ymucubyet43v5mdhw2p3jedlnwhgytipi2gni4mggsi",
      6: "bafyreicb2i6otiqavfqoenbccizuozmmmwqinakyc6zrdql5lowhgslyve",
      7: "bafyreihykcgx4iszjjiiybshr2n453e5yak6lged27w5mo2xsakrwr3ceu",
      3: "bafyreihfqgkynasnoczluh5qpf34wus5lz3i2a6f3cbqmgpybqcxwazrim",
    };

    const hash = hashMap[numericNftId] || "Default hash if NFT ID is not found"; // Fallback hash

    const metadataJson = (await getMetadata(hash)).data;
    console.log(metadataJson);
    console.log(response[0].price);
    console.log(web3.utils.fromWei(response[0].price, "ether"));
    return {
      IsListed: true,
      NFTId: NftId,
      Price: response[0].price,
      CurrentOwner: response[0].createdBy,
      Image: `https://cloudflare-ipfs.com/ipfs/${metadataJson.image.slice(7)}`,
      Name: `${metadataJson.name} #${NftId}`,
      Properties: metadataJson.properties,
      Description: metadataJson.description,
      Creator: response[0].createdBy,
      Category: metadataJson.category,
    };
  } catch (error) {
    console.log(error);
    console.log("worked catch");
  }
};

const getMetadata = async (uri) => {
  return await axios.get(
    `https://cloudflare-ipfs.com/ipfs/${uri}/metadata.json`
  );
};

export { fetchNFTById };
