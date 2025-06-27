// packages/nextjs/utils/getContract.ts
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants/contract";
import { ethers } from "ethers";

export const getContract = (providerOrSigner: ethers.Signer | ethers.providers.Provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};
