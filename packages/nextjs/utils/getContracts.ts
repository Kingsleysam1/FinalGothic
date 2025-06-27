import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants/contract";
import { ethers } from "ethers";

export const getContract = (runner: ethers.ContractRunner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, runner);
};
