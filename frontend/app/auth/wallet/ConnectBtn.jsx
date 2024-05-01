import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React from "react";
import WalletIcon from "../../../public/icons/WalletIcon";

const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-black border border-transparent hover:bg-yellow-500
                        py-2 px-4 text-white hover:text-black rounded-full hover:border-black
                        transition-all duration-300 ease-in-out drop-shadow-xl flex items-center justify-center"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <div className="flex items-center">
                      <WalletIcon className="mr-2" /> {/* Wallet Icon */}
                      <span>Conectar Billetera</span>
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="bg-black border border-transparent hover:bg-yellow-500
                    py-2 px-4 text-white hover:text-black rounded-full hover:border-black
                    transition-all duration-300 ease-in-out drop-shadow-xl flex items-center justify-center"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    className="bg-black border border-transparent hover:bg-yellow-500
                    py-2 px-4 text-white hover:text-black rounded-full hover:border-black
                    transition-all duration-300 ease-in-out drop-shadow-xl"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width="12"
                            height="12"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="bg-black border border-transparent hover:bg-yellow-500
                    py-2 px-4 text-white hover:text-black rounded-full hover:border-black
                    transition-all duration-300 ease-in-out drop-shadow-xl flex items-center justify-center"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectBtn;
