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
const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.REACT_APP_SECRET_KEY))
);
const address = new PublicKey(keypair.publicKey.toBase58());
console.log(address.toBase58());
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

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
        <p>{balanceInSol.toPrecision(10)} SOL</p>
      </div>
      <div className="App__footer">
        <p>&copy; 2024 Cryptonic. All rights reserved.</p>
      </div>
    </div>
  );
}
