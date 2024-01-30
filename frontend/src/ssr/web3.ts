import { ethers } from "ethers";
import { erc20Abi } from "../wallet/erc20Abi";

export async function getEthBalance (library:any, account:any){
  const hexBalance = await library.getBalance(account);
  const balance = ethers.utils.formatEther(hexBalance);
  return balance;
}

export async function getERC20Balance (library:any, account:any, tokenAddress: string){
  const wethContract = new ethers.Contract(tokenAddress, erc20Abi, library)
  const balanceW = await wethContract.balanceOf(account);
  const formattedBalanceW = ethers.utils.formatUnits(balanceW, 18);
  return formattedBalanceW;
}