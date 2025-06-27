// packages/nextjs/utils/getContract.ts
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants/contract";
import { ethers } from "ethers";
import type { Provider } from "@ethersproject/providers";

export const getContract = (providerOrSigner: ethers.Signer | Provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};
