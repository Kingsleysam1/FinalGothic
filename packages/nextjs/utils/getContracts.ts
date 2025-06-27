// packages/nextjs/utils/getContract.ts
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants/contract";
import { ethers, providers } from "ethers";

export const getContract = (providerOrSigner: ethers.Signer | providers.Provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};
