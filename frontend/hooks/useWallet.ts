import { useWeb3React } from "@web3-react/core";
import { getCookie, getCookies, removeCookies, setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  checkAndProcessUnsupportedChainMsg,
  processWalletErrorMessage,
} from "src/helpers/functions";
import { loadConnector } from "src/wallet/connectors";
import { setUserData } from "../src/store/slices/userDataSlice";
// import { connectors } from "../src/wallet/connectors";

const useWallet = () => {
  const { account, active, activate, deactivate } = useWeb3React();
  const { addToast } = useToasts();
  const router = useRouter();
  const query: any = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (walletConnected(active)) setCookies("wallet_address", account);
  }, [account]);

  const connectMetaMask = useCallback(
    async (supportedChains) => {
      let status = true;

      // console.log("%cFrom the connectMM", "font-size: 2rem;color: orange;");

      if ((window as any).ethereum && !(window as any).ethereum.isMetaMask) {
        deactivate();
        clearWalletCookies();
        window.open("https://metamask.io/download/", "_blank");
      } else {
        await activate(
          (
            await loadConnector(supportedChains)
          ).metamask,
          (err: any) => {
            status = false;
            if (
              err.message &&
              err.message.search(/No Ethereum provider/) >= 0
            ) {
              clearWalletCookies();
              window.open("https://metamask.io/download/", "_blank");
            } else if (err.message) {
              let msg: any = processWalletErrorMessage(err.message, err);
              msg = checkAndProcessUnsupportedChainMsg(msg);
              addToast(msg, { appearance: "error" });
            }
          }
        );

        if (status) setCookies("walletIsConnectedTo", "metamask");
        if (status && query.redirect) {
          setTimeout(() => {
            router.push(query.redirect);
          }, 1000);
        }
      }
    },
    [activate, addToast, router, query]
  );

  const connectCoinbase = useCallback(
    async (supportedChains) => {
      if (!(window as any).ethereum) {
        deactivate();
        clearWalletCookies();
        return;
      }
      let status = true;
      await activate(
        (
          await loadConnector(supportedChains)
        ).coinbaseWallet,
        (err: any) => {
          if (err.message) {
            let msg = processWalletErrorMessage(err.message, err);
            msg = checkAndProcessUnsupportedChainMsg(msg);
            addToast(msg, { appearance: "error" });
          }
          status = false;
        }
      );

      if (status) setCookies("walletIsConnectedTo", "coinbase");
      if (status && query.redirect) {
        router.push(query.redirect);
      }

    },
    [activate, addToast, router, query]
  );

  const connectWalletConnect = useCallback(
    async (supportedChains) => {
      let status = true;
      await activate(
        (
          await loadConnector(supportedChains)
        ).walletConnect,
        (err: any) => {
          let msg = processWalletErrorMessage(err.message, err);
          msg = checkAndProcessUnsupportedChainMsg(msg);
          addToast(msg, { appearance: "error" });
          status = false;
        }
      );

      if (status) setCookies("walletIsConnectedTo", "walletConnect");
      if (status && query.redirect) {
        router.push(query.redirect);
      }

    },
    [activate, addToast, router, query.redirect]
  );

  const disConnectWallet = async () => {
    deactivate();

    clearWalletCookies();

    // to add-wallet
    router.push("/connect-wallet?redirect=" + router.asPath);

    // empty user data from redux
    dispatch(setUserData({}));

    addToast("Disconnected", { appearance: "info" });
  };

  return {
    connectMetaMask,
    connectCoinbase,
    connectWalletConnect,
    disConnectWallet,
  };
};

export default useWallet;

export function clearWalletCookies() {
  removeCookies("walletIsConnectedTo");
  removeCookies("token");
  removeCookies("wallet_address");
}

export function walletConnected(activeFromWeb3React: boolean): boolean {
  return activeFromWeb3React && !!getCookie('walletIsConnectedTo')
}