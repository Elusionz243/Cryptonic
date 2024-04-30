import { useEffect, useState } from "react";
import { Web3 } from "web3";
import { init, useConnectWallet } from "@web3-onboard/react";
import phantomModule from "@web3-onboard/phantom";
import { ethers } from "ethers";

import injectedModule from "@web3-onboard/injected-wallets";

import "./App.scss";

const phantom = phantomModule();
const ethApiKey = "a1a03582-97a2-4ffb-8e25-26a716c286da";
const solApiKey = "2FzG0c9TGITvoL6ssJk-AbGYVdWCi07p";

init({
  wallets: [phantom],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ethApiKey}`,
    },
    {
      id: "900",
      token: "SOL",
      label: "Solana Mainnet",
      rpcUrl: `https://solana-mainnet.g.alchemy.com/v2/${solApiKey}`,
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
  ],
  // appMetadata: {
  //   name: "Phantom Web3-Onboard Demo",
  //   icon: phantomLogo,
  //   description: "My phantom wallet dapp using Onboard",
  // },
});
// const injected = injectedModule();
// const infuraKey = "<INFURA_KEY>";
// const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// init({
//   apiKey,
//   wallets: [injected],
//   chains: [
//     {
//       id: "0x1",
//       token: "ETH",
//       label: "Ethereum Mainnet",
//       rpcUrl,
//     },
//     {
//       id: 42161,
//       token: "ARB-ETH",
//       label: "Arbitrum One",
//       rpcUrl: "https://rpc.ankr.com/arbitrum",
//     },
//     {
//       id: "0xa4ba",
//       token: "ARB",
//       label: "Arbitrum Nova",
//       rpcUrl: "https://nova.arbitrum.io/rpc",
//     },
//     {
//       id: "0x2105",
//       token: "ETH",
//       label: "Base",
//       rpcUrl: "https://mainnet.base.org",
//     },
//   ],
// });

export default function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  console.log(connecting);
  // if (connecting) {
  //   console.log(wallet.accounts[0].balance);
  // }

  return (
    <div className="App">
      <div className="App__header">
        <h1>Cryptonic</h1>
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
        >
          {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
        </button>
      </div>
      <div className="App__content">
        {/* {balance !== null && (
          <div className="App__content-item">
            <h2>Account Balance</h2>
            <p>{balance} ETH</p>
          </div>
        )} */}
        {/* {blockNumber} */}
        {/* {chainId} */}
      </div>
      <div className="App__footer">
        <p>&copy; 2024 Cryptonic. All rights reserved.</p>
      </div>
    </div>
  );
}
