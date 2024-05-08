import React, { useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";
import "./App.scss";

const App = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [address, setAddress] = useState();

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };

  const connectPhantom = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.connect({ onlyIfTrusted: true });
        setAddress(provider.publicKey.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="App">
      <h1 className="App__header">Cryptonic</h1>
      <div className="App__content">
        <button onClick={connectPhantom}>Connect</button>
        {accountInfo && (
          <div>
            <p>Address: {address}</p>
            <p>Balance: {accountInfo.lamports / web3.LAMPORTS_PER_SOL} SOL</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// import { useEffect, useState } from "react";
// import * as web3 from "@solana/web3.js";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// import "./App.scss";

// const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// const network = WalletAdapterNetwork.Devnet;

// export default function App() {
//   const [accountInfo, setAccountInfo] = useState(null);
//   const [transactionHistory, setTransactionHistory] = useState([]);

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       const publicKey = window.phantom?.solana?.toString();
//       if (publicKey) {
//         const accountInfo = await connection.getAccountInfo(
//           new web3.PublicKey(publicKey)
//         );
//         setAccountInfo(accountInfo);
//       }
//     };

//     const fetchTransactionHistory = async () => {
//       const publicKey = window.solana.publicKey?.toString();
//       if (publicKey) {
//         const signatures = await connection.getConfirmedSignaturesForAddress2(
//           new web3.PublicKey(publicKey)
//         );
//         const transactions = await Promise.all(
//           signatures.map(async (signature) => {
//             const transaction = await connection.getConfirmedTransaction(
//               signature.signature
//             );
//             return transaction;
//           })
//         );
//         setTransactionHistory(transactions);
//       }
//     };

//     fetchAccountInfo();
//     fetchTransactionHistory();
//   }, [connection]);

//   return (
//     <div className="App">
//       <div className="App__header">
//         <h1>Cryptonic</h1>
//       </div>
//       <div className="App__content">
//         <h3>Connected Wallet</h3>
//         {accountInfo && (
//           <div>
//             <p>Address: {accountInfo.owner.toBase58()}</p>
//             <p>Balance: {accountInfo.lamports / web3.LAMPORTS_PER_SOL} SOL</p>
//           </div>
//         )}
//         <h4>Transaction History</h4>
//         <ul>
//           {transactionHistory.map((transaction) => (
//             <li key={transaction.signature}>
//               {transaction.transaction.message.instructions.map(
//                 (instruction) => (
//                   <p>
//                     {instruction && instruction.parsed && (
//                       <pre>{JSON.stringify(instruction.parsed, null, 2)}</pre>
//                     )}
//                   </p>
//                 )
//               )}
//             </li>
//           ))}
//         </ul>
//         <button onClick={() => window.phantom?.connect()}>
//           Connect Wallet
//         </button>
//       </div>
//     </div>
//   );
// }

// // // import { init, useConnectWallet } from "@web3-onboard/react";
// // // import phantomModule from "@web3-onboard/phantom";
// // import { useEffect, useState } from "react";
// // import {
// //   ConnectionProvider,
// //   WalletProvider,
// // } from "@solana/wallet-adapter-react";
// // import {
// //   WalletModalProvider,
// //   WalletMultiButton,
// // } from "@solana/wallet-adapter-react-ui";
// // import { Connection, PublicKey, Keypair, clusterApiUrl } from "@solana/web3.js";

// // import "./App.scss";

// // const { REACT_APP_SECRET_KEY } = process.env;

// // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// // const keypair = Keypair.fromSecretKey(
// //   new Uint8Array(JSON.parse(REACT_APP_SECRET_KEY))
// // );
// // const address = connection.getAccountInfo(keypair.publicKey);

// // export default function App() {
// //   const [transactionHistory, setTransactionHistory] = useState([]);

// //   useEffect(() => {
// //     const fetchTransactionHistory = async () => {
// //       const signatures = await connection.getConfirmedSignaturesForAddress2(
// //         address
// //       );
// //       const transactions = await Promise.all(
// //         signatures.map(async (signature) => {
// //           const transaction = await connection.getConfirmedTransaction(
// //             signature.signature
// //           );
// //           return transaction;
// //         })
// //       );
// //       setTransactionHistory(transactions);
// //     };

// //     fetchTransactionHistory();
// //   }, []);
// //   return (
// //     <div className="App">
// //       <div className="App__header">
// //         <h1>Cryptonic</h1>
// //       </div>
// //       <div className="App__content">
// //         {/* <h3>Address: {address}</h3> */}
// //         <ul>
// //           {transactionHistory.map((transaction) => (
// //             <li key={transaction.signature}>
// //               {transaction.transaction.message.instructions.map(
// //                 (instruction) => (
// //                   <p>{instruction.parsed}</p>
// //                 )
// //               )}
// //             </li>
// //           ))}
// //         </ul>
// //         <WalletModalProvider>
// //           <WalletMultiButton>Connect Wallet</WalletMultiButton>
// //         </WalletModalProvider>
// //       </div>
// //     </div>
// //   );
// // }
