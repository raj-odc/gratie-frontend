// app/src/App.js

import React, { useEffect, useState } from "react";
// import "./App.css";
import idl from '../lib/gratie_solana.json' //copy from target folder inside idl.json
import * as anchor from "@project-serum/anchor";
import { Program, Wallet, AnchorProvider, SystemProgram } from "@project-serum/anchor";
import { GratieSolana } from "../gratie_solana_contract/types/gratie_solana";


declare const window: Window &
  typeof globalThis & {
    solana: any
  }

const App = () => {
  const [walletAddress, setWalletAdresss] = useState("");
  const [Loding, setLoading] = useState(false)
  const [solana, setSolana] = useState({})

  useEffect(() => {
    console.log("coming in the ---", window.solana)
    setSolana(window.solana)
    checkIfWalletConnected();
    const onLoad = () => {

      console.log("sdadsadasdsadsa");
      const provider = anchor.AnchorProvider.env();
      console.log("provider", provider);
      anchor.setProvider(provider);

      const program = anchor.workspace.GratieSolana as Program<GratieSolana> | any
      console.log("program", program);

      const wallet = anchor.AnchorProvider.env().wallet as Wallet;
      console.log("wallet", wallet);
      checkIfWalletConnected();

    };
    globalThis.addEventListener("load", onLoad);
    return () => globalThis.removeEventListener("load", onLoad);
  }, []);

  const checkIfWalletConnected = async () => {
    // let FB = window.solana; // ok now
    const { solana } = window.solana;
    console.log("solana", solana)
    try {
      setLoading(true)
      if (solana) {
        if (solana.isPhantom) {
          console.log("phatom is connected");
          const response = await solana.connect({
            onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
          });
          setWalletAdresss(response.publicKey.toString());
          console.log("public key", response.publicKey.toString());
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const connectWallet = async () => {
    // const { solana } = window.solana;
    console.log("solana---", solana);
    try {
      setLoading(true)
      if (solana) {
        const response = await solana.connect(); //to disconnect use "solana.disconnect()"
        setWalletAdresss(response.publicKey.toString());
      } else {
        alert("Please Install Solana's Phantom Wallet");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          <p>
            {!Loding ? (
              <button
                className="cta-button connect-wallet-button"
                onClick={!walletAddress ? connectWallet : undefined}
              >
                {!walletAddress ? (
                  <span> Connect Wallet </span>
                ) : (
                  <span> Connected </span>
                )}
              </button>
            ) : (
              <button className="cta-button connect-wallet-button">
                Loading...
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;