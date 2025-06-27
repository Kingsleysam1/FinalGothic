import { Abi } from "viem";
import YourCollectibleAbi from "@/constants/YourCollectible.json";

export const yourCollectible = {
  address: "0x375c30dd53A6e34D516b69edb66E59A4A5e25921", // your deployed address
  abi: YourCollectibleAbi.abi as Abi,
} as const;
