"use client";

import { useState } from "react";
import { useContract } from "@/hooks/useContract";

export default function Home() {
  const { contract, account } = useContract();
  const [uri, setUri] = useState("");
  const [status, setStatus] = useState("");

  const mint = async () => {
    if (!contract || !uri) return;
    try {
      const tx = await contract.mintNFT(account, uri);
      setStatus("Minting...");
      await tx.wait();
      setStatus("Minted successfully!");
    } catch (e) {
      console.error(e);
      setStatus("Mint failed.");
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Mint NFT</h1>
      <input
        type="text"
        placeholder="IPFS Metadata URI"
        className="border p-2 mb-4 w-80"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
      />
      <button onClick={mint} className="bg-purple-600 text-white px-4 py-2 rounded">
        Mint NFT
      </button>
      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}
