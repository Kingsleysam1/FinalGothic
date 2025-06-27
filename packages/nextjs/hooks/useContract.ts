import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/contract";

export function useContract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const connect = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(instance);
      }
    };
    connect();
  }, []);

  return { contract, account };
}
