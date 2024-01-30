import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { erc20Abi } from "../src/wallet/erc20Abi";

const useEathBalance = () => {
  const { active, library, account } = useWeb3React();
  const { addToast } = useToasts();

  // fns for weth balance
  const wethAddress = String(process.env.WETH_CONTRACT_ADDRESS);
  const wethContractFn = useCallback(
    () => new ethers.Contract(wethAddress, erc20Abi, library),
    [library, wethAddress]
  );
  const wethContract = wethContractFn();

  const getEthBalance = async ()=>{
    const hexBalance = await library.getBalance(account);
    const balance = ethers.utils.formatEther(hexBalance);
    return balance;
  }

  const getWethBalance = async ()=>{
    const balanceW = await wethContract.balanceOf(account);
    const formattedBalanceW = ethers.utils.formatUnits(balanceW, 18);
    return formattedBalanceW;
  }

  const getConvertRate = async ()=>{
    const res = await fetch(String(process.env.CRYPTO_CONVERT_URL));
    const data = await res.json();
    return data;
  }
  
  // check if you're active
  if (!active) {
    addToast("You are not connected to any wallet", { appearance: "warning" });
    return;
  }

  return {getEthBalance, getWethBalance, getConvertRate};
};

export default useEathBalance;
