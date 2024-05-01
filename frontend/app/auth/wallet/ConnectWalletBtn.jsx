import React from "react";
import { connectWallet } from "../../utils/ethereum";
import WalletIcon from "../../../public/icons/WalletIcon";
import { useWallet } from "../../contexts/WalletContext";

const ConnectWalletBtn = () => {
  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      alert(`Wallet conectada: ${address}`);
    }
  };

  return (
    <button onClick={handleConnectWallet} className="btn">
      <WalletIcon />
      Conectar Wallet
    </button>
  );
};

export default ConnectWalletBtn;
