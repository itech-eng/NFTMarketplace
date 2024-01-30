import { getBlockchainListForChainIds, syncItemOwner } from "src/ssr/data";
import { FilterItemType } from "src/types";
import ServicesConfig from "../config/services";
import { CHAIN_SLUG_MAPPING, itemEvents } from "./corearray";
import { NULL_ETH_ADDRESS, SUPPORTED_CHAIN_IDS } from "./coreconstants";

// Number.prototype["noExponents"] = function (){
//   const data = String(this).split(/[eE]/);
//   if (data.length == 1) return data[0];

//   let z = "";
//   const sign = this < 0 ? "-" : "";
//   const str = data[0].replace(".", "");
//   let mag = Number(data[1]) + 1;

//   if (mag < 0) {
//     z = sign + "0.";
//     while (mag++) z += "0";
//     return z + str.replace(/^\-/, "");
//   }
//   mag -= str.length;
//   while (mag--) z += "0";
//   return str + z;
// };

export const collapseAddress = (address: string) =>
  address.slice(0, 7) + "..." + address.slice(-7);

export function formatCount(number: number) {
  return number;
}

export const formatAmountWithThousandSeparator = (amount: number): string =>
  new Intl.NumberFormat("en-US").format(amount);

export const formatPriceK = (price: number, decimal: number = 4): string => {
  if (Math.abs(price) > 999999999) {
    return (
      String(
        Math.round(
          Number(
            (
              (Math.sign(price) * Math.round(Math.abs(price) / 100000000)) /
              10
            ).toFixed(decimal)
          )
        )
      ) + "B"
    );
  } else if (Math.abs(price) > 999999) {
    return (
      String(
        Math.round(
          Number(
            (
              (Math.sign(price) * Math.round(Math.abs(price) / 100000)) /
              10
            ).toFixed(decimal)
          )
        )
      ) + "M"
    );
  } else if (Math.abs(price) > 999) {
    return (
      String(
        Math.round(
          Number(
            (
              (Math.sign(price) * Math.round(Math.abs(price) / 100)) /
              10
            ).toFixed(decimal)
          )
        )
      ) + "K"
    );
  } else {
    price = Number((Math.sign(price) * Math.abs(price)).toFixed(decimal));
    return String(Math.sign(price) * Math.abs(price));
  }
};

export function trimUnwantedZeros(amount: number) {
  return Math.sign(amount) * Math.abs(amount);
}

export function etherScanUrl(suffix: string) {
  return ServicesConfig.ether_scan_url + suffix;
}

export function clearTrailingSlash(str: string) {
  return str.replace(/\/$/, "");
}

export const chainIdToString = (id: string) => {
  let txt;
  if (id === "0x1") txt = "Ethereum Main Network (Mainnet)";
  else if (id === "0x3") txt = "Ropsten Test Network";
  else if (id === "0x4") txt = "Rinkeby Test Network";
  else if (id === "0x5") txt = "Goerli Test Network";
  else if (id === "0x2a") txt = "Kovan Test Network";
  else txt = "Unknown Network";

  return txt;
};

export function imageAsset(url: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_URL || "";
  return basePath + "/" + url;
}

export function absPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_URL || "";
  return basePath + "/" + path;
}

export async function getSupportedChainIds() {
  const arr: number[] = [];
  const res = await getBlockchainListForChainIds();
  res.map((el: any) => arr.push(el.chain_id));
  return arr;
}

export function checkAndProcessUnsupportedChainMsg(msg: string): string {
  if (msg.search("Unsupported chain id:") >= 0) {
    const chainId = msg.split(".")[0].replace("Unsupported chain id: ", "");
    msg = `Unsupported Network: ${ucfirst(
      CHAIN_SLUG_MAPPING[chainId] || chainId
    )}, 
    Please change the network to a supported one from your wallet`;
  }
  return msg;
}

export function ucfirst(str: string) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

export function checkSlug(str: string) {
  const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
  return regexExp.test(str);
}

export function containsSpecialChars(str: string) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export function getItemEvents(event: number | null): any {
  if (event) return itemEvents[event];
  else return itemEvents;
}

export function noExponents(num: number, decimal?: number): any {
  let result;
  const data = String(num).split(/[eE]/);
  if (data.length == 1) {
    result = data[0];
    if (decimal) {
      result = Number(result).toFixed(decimal);
    }
    return result;
  }

  let z = "";
  const sign = num < 0 ? "-" : "";
  const str = data[0].replace(".", "");
  let mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    result = z + str.replace(/^\-/, "");
    if (decimal) {
      result = Number(result).toFixed(decimal);
    }
    return result;
  }
  mag -= str.length;
  while (mag--) z += "0";
  result = str + z;
  if (decimal) {
    result = Number(result).toFixed(decimal);
  }
  return result;
}

export function convertTokenAmountToInt(
  amount: number,
  decimal: number
): string {
  let multiplier: any = "1";
  for (let i = 0; i < decimal; i++) {
    multiplier += "0";
  }
  return noExponents(Number(amount) * Number(multiplier)).split(".")[0];
}

export function getRandomNumber(length: number) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function checkOwner(
  contract: any,
  token_id: number,
  ownerAddress: string,
  item_id: number
): Promise<boolean> {
  const owner = await contract.ownerOf(token_id);

  if (owner != ownerAddress) {
    syncItemOwner(item_id);
    return false;
  }
  return true;
}

// for sell -> settings[SETTINGS_BUY_SELL_FEE_PERCENTAGE], item.collection.royalties, itemPrice
export function calculateOfferAmounts(
  settingsFeePercent: number,
  itemRoyalties: number,
  givenPrice: number,
  tokenDecimal: number
) {
  const feePercent = settingsFeePercent;
  let feeAmount: any = feePercent
    ? getPercantageValue(givenPrice, feePercent)
    : 0;

  const royaltyPercent = itemRoyalties;
  let royaltyAmount: any = royaltyPercent
    ? getPercantageValue(givenPrice, royaltyPercent)
    : 0;

  let sellerAmount: any = givenPrice - feeAmount - royaltyAmount;

  const totalAmount: any = convertTokenAmountToInt(givenPrice, tokenDecimal);
  // const feeWithRoyalty = convertTokenAmountToInt(feeAmount + royaltyAmount, tokenDecimal);
  sellerAmount = convertTokenAmountToInt(sellerAmount, tokenDecimal);
  feeAmount = convertTokenAmountToInt(feeAmount, tokenDecimal);
  royaltyAmount = convertTokenAmountToInt(royaltyAmount, tokenDecimal);

  return { sellerAmount, feeAmount, royaltyAmount, totalAmount };
}

export async function sellOfferConfirm(data: any, signer: any, sellType: any) {
  const domainData = {
    name: data.domainDataName || "NFTexchange",
    version: data.domainDataVersion || "1",
    chainId: data.chainId,
    verifyingContract: data.verifyingContract,
  };

  const { sellerAmount, feeAmount, royaltyAmount, totalAmount } =
    calculateOfferAmounts(
      data.settingsFeePercent,
      data.itemRoyalties,
      data.givenPrice,
      data.tokenDecimal
    );

  const sellValue = {
    _nonce: getRandomNumber(6),
    _startsAt: parseInt((+new Date(data.startDate / 1000)).toString()),
    _expiresAt: parseInt((+new Date(data.endDate / 1000)).toString()),
    _nftContract: data.nftContract,
    _nftTokenId: data.tokenId,
    _paymentTokenContract: data.paymentTokenContract,
    _seller: data.walletAddress,
    _royaltyPayTo: data.royaltyPayTo || NULL_ETH_ADDRESS,
    _sellerAmount: sellerAmount,
    _feeAmount: feeAmount,
    _royaltyAmount: royaltyAmount,
    _totalAmount: totalAmount, // my given amount
  };
  
  // console.log(sellValue);
  
  const sig = await signer._signTypedData(domainData, sellType, sellValue);
  return { signature: sig, nonce: sellValue._nonce };
}

export function getPercantageValue(value: number, percentage: number) {
  return (value * percentage) / 100;
}

export async function buyOfferConfirm(data: any, signer: any, sellType: any) {
  const domainData = {
    name: data.domainDataName || "NFTexchange",
    version: data.domainDataVersion || "1",
    chainId: data.chainId,
    verifyingContract: data.verifyingContract,
  };

  const { sellerAmount, feeAmount, royaltyAmount, totalAmount } =
    calculateOfferAmounts(
      data.settingsFeePercent,
      data.itemRoyalties,
      data.givenPrice,
      data.tokenDecimal
    );

  const buyValue = {
    _nonce: getRandomNumber(6),
    _startsAt: parseInt((+new Date(data.startDate / 1000)).toString()),
    _expiresAt: parseInt((+new Date(data.endDate / 1000)).toString()),
    _nftContract: data.nftContract,
    _nftTokenId: data.tokenId,
    _paymentTokenContract: data.paymentTokenContract,
    _buyer: data.walletAddress,
    _royaltyPayTo: data.royaltyPayTo || NULL_ETH_ADDRESS,
    _sellerAmount: sellerAmount,
    _feeAmount: feeAmount,
    _royaltyAmount: royaltyAmount,
    _totalAmount: totalAmount,
  };

  const sig = await signer._signTypedData(domainData, sellType, buyValue);
  return { signature: String(sig), nonce: buyValue._nonce };
}

export const processWalletErrorMessage = (message: string, err: any) => {
  const msg = message.split('message":')[1];
  if (msg) {
    return message
      .split('message":')[1]
      ?.split(",")[0]
      ?.split("}")[0]
      ?.replace(/"/g, "");
  } else {
    if (err?.data?.message) {
      return err.data.message
    } else {
      return message
    }
  };
};

export const handleSelectedFilterData = (
  el: FilterItemType,
  selected: FilterItemType[],
  setSelected: React.Dispatch<React.SetStateAction<FilterItemType[]>>
) => {
  let newEl = { id: el.id, title: el.title };

  const findObj = selected.filter(
    (item: FilterItemType) => item.id === newEl.id
  );

  if (findObj.length > 0) {
    setSelected([
      ...selected.filter((item: FilterItemType) => item.id !== newEl.id),
    ]);
  } else {
    const pre = selected;
    pre.push(newEl);
    setSelected([...pre]);
  }
};

export const handleRemoveFilterData = (
  item: FilterItemType,
  state: FilterItemType[],
  setState: React.Dispatch<React.SetStateAction<FilterItemType[]>>
) => setState(state.filter((el) => el.id !== item.id));

export function base_url() {
  return clearTrailingSlash(process.env.NEXT_PUBLIC_BASE_URL ?? "");
}

export function convertIpfsToHttps(url: string) {
  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export const hexToRgba = (hex: any, alpha?: string | number) => {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export function clearTrailingZeros(str: string): string {
  return str.replace(/0+$/g, '');
}

export function formatTokenDecimalAmount(amount: number, tokenDecimal= 18): string {
  return clearTrailingZeros(noExponents(amount, tokenDecimal));
}