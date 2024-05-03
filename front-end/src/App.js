import { init, useConnectWallet } from "@web3-onboard/react";
import phantomModule from "@web3-onboard/phantom";
import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

import "./App.scss";

const phantom = phantomModule();
const ethApiKey = process.env.ETHERIUM_API_KEY;
const solApiKey = process.env.SOLANA_API_KEY;

const keypair = getKeypairFromEnvironment(process.env.SECRET_KEY);

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
});

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
