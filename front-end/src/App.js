import { init, useConnectWallet } from "@web3-onboard/react";
import phantomModule from "@web3-onboard/phantom";
import {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import "./App.scss";

const phantom = phantomModule();
const ethApiKey = process.env.REACT_APP_PHANTOM_API_KEY;
const solApiKey = process.env.REACT_APP_SOLANA_API_KEY;

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("BkuexoV2sfmCgKgNyiEux6Xj8Yob2sYfsrHFDLk5LyMt");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

const keypair = Keypair.generate();
console.log(keypair.publicKey.toBase58());
console.log(keypair.secretKey.toString());

console.log(
  `Connecting to Ethereum Mainnet with API key: ${ethApiKey}\nConnecting to Solana Mainnet with API key: ${solApiKey}`
);

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

  return (
    <div className="App">
      <div className="App__header">
        <h1>Cryptonic</h1>
      </div>
      <div className="App__content">
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
        >
          {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
        </button>
        <h4>Address: {address.toBase58()}</h4>
        <p>Balance: {balance}</p>
        <p>Balance in SOL: {balanceInSol} SOL</p>
      </div>
      <div className="App__footer">
        <p>&copy; 2024 Cryptonic. All rights reserved.</p>
      </div>
    </div>
  );
}
