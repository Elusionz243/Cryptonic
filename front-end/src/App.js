import { useEffect, useState } from "react";
import { Web3 } from "web3";
import { init, useConnectWallet } from "@web3-onboard/react";
import phantomModule from "@web3-onboard/phantom";
import { ethers } from "ethers";

import injectedModule from "@web3-onboard/injected-wallets";

import "./App.scss";

const phantom = phantomModule();
const apiKey = "a1a03582-97a2-4ffb-8e25-26a716c286da";

init({
  wallets: [phantom],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
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
  // const web3 = new Web3("https://eth.llamarpc.com");
  // const [blockNumber, setBlockNumber] = useState(null);
  // const [chainId, setChainId] = useState(null);
  // const [balance, setBalance] = useState(null);
  // const [ethAddress, setEthAddress] = useState(
  //   "0x637e62f6d840FE43717c5430551Daf28Bb4E3CA9"
  // );

  // useEffect(() => {
  //   const fetchBlockchainData = async () => {
  //     const tempBlockNumber = await web3.eth.getBlockNumber();
  //     const tempChainId = await web3.eth.getChainId();
  //     const tempBalance = await web3.eth.getBalance(
  //       "0x637e62f6d840FE43717c5430551Daf28Bb4E3CA9"
  //     );
  //     setBalance((temp) => (temp = web3.utils.fromWei(tempBalance, "ether")));
  //     setBlockNumber((temp) => (temp = tempBlockNumber));
  //     setChainId((temp) => (temp = tempChainId));
  //   };
  //   fetchBlockchainData();
  // }, []);

  // console.log("Block Number:", blockNumber);

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
