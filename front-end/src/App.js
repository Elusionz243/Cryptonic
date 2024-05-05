// import { init, useConnectWallet } from "@web3-onboard/react";
// import phantomModule from "@web3-onboard/phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import "./App.scss";
import { useMemo } from "react";

const { REACT_APP_SECRET_KEY } = process.env;

const connection = new Connection(clusterApiUrl("devnet"));
const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(REACT_APP_SECRET_KEY))
);
const address = new PublicKey(keypair.publicKey.toBase58());
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

export default function App() {
  // NEW IMPLEMENTATION (PHANTOM)
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <div className="App">
          <div className="App__header">
            <h1>Cryptonic</h1>
          </div>
          <div className="App__content">
            <h3>Address: {address.toBase58()}</h3>
            <p>{balanceInSol.toPrecision(10)} SOL</p>
            <WalletModalProvider>
              <WalletMultiButton>
                <div className="App__wallet-btn">Connect Wallet</div>
              </WalletMultiButton>
            </WalletModalProvider>
          </div>
          <div className="App__footer">
            <p>&copy; 2024 Cryptonic. All rights reserved.</p>
          </div>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}
