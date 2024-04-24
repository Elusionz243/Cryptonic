import { useEffect, useState } from "react";
import { Web3 } from "web3";

import "./App.scss";

export default function App() {
  const web3 = new Web3("https://eth.llamarpc.com");
  const [blockNumber, setBlockNumber] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      const tempBlockNumber = await web3.eth.getBlockNumber();
      const tempChainId = await web3.eth.getChainId();
      const tempBalance = await web3.eth.getBalance(
        "0x637e62f6d840FE43717c5430551Daf28Bb4E3CA9"
      );
      setBalance((temp) => (temp = web3.utils.fromWei(tempBalance, "ether")));
      setBlockNumber((temp) => (temp = tempBlockNumber));
      setChainId((temp) => (temp = tempChainId));
    };
    fetchBlockchainData();
  }, []);

  console.log("Block Number:", blockNumber);

  return (
    <div className="App">
      <div className="App__header">
        <h1>Cryptonic</h1>
      </div>
      <div className="App__content">
        {balance !== null && (
          <div className="App__content-item">
            <h2>Account Balance</h2>
            <p>{balance} ETH</p>
          </div>
        )}
        {blockNumber}
        {chainId}
      </div>
      <div className="App__footer">
        <p>&copy; 2024 Cryptonic. All rights reserved.</p>
      </div>
    </div>
  );
}
