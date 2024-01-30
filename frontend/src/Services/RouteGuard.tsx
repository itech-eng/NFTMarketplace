import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthProvider";
import { absPath } from "../helpers/functions";
import {
  checkAuthentication,
  generateLoginMessage,
  walletLogin,
} from "../ssr/data";

import { ethers } from "ethers";
import { getCookie, removeCookies, setCookies } from "cookies-next";
import { useToasts } from "react-toast-notifications";
import useWallet, { clearWalletCookies, walletConnected } from "../../hooks/useWallet";
import { Loading } from "../../components/Loader/Loading";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function RouteGuard({ children }: any) {
  const authenticatedRoutes = [
    "/collections/edit/[slug]",
    "/assets/edit/[slug]",
    "/assets/sell/[slug]",
    "/assets/transfer/[slug]",
    "/settings",
    "/collections/create",
    "/assets/create",
    "/profile/edit",
    "/watchlist",
  ];

  const walletConnectedRoute = ["/profile", "/collections"];
  // const t = (s: string) => s;
  const { t } = useTranslation("common");

  const { addToast } = useToasts();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const path = router?.route.split("?")[0];
  const [authorized, setAuthorized] = useState(false);
  const { disConnectWallet } = useWallet();

  //&& (window as any).ethereum
  let provider: any;
  if (typeof window !== "undefined" && (window as any).ethereum) {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);
  }
  //  console.log(provider);

  useEffect(() => {
    authCheck(path, router.asPath);
  }, [router.asPath]);

  async function authCheck(url: any, redirect_url: string) {
    const active = !!getCookie("walletIsConnectedTo");
    const account = getCookie("wallet_address")?.toString();

    // redirect to login page if accessing a private page and not logged in

    const redirect_path = redirect_url.split("?")[0];

    if (![...authenticatedRoutes, ...walletConnectedRoute].includes(path)) {
      setAuthorized(true);
    } else if (
      !walletConnected(active) &&
      [...authenticatedRoutes, ...walletConnectedRoute].includes(path)
    ) {
      setAuthorized(false);
      router.push({
        pathname: absPath("connect-wallet"),
        query: {
          redirect: redirect_path,
        },
      });
      return;
    } else if (
      walletConnected(active) &&
      account &&
      [...authenticatedRoutes, ...walletConnectedRoute].includes(path)
    ) {
      if (walletConnectedRoute.includes(path)) {
        setAuthorized(true);
      } else {
        if (!isAuthenticated()) {
          try {
            setAuthorized(false);
            const data = await generateLoginMessage(account);
            const { login_message, nonce } = data.generateLoginMessage;

            if (provider) {
              const signer: any = await provider.getSigner();
              const signature = await signer.signMessage(login_message);
              if (signature) {
                const login = await walletLogin(account, nonce, signature);
                setCookies("token", JSON.stringify(login.walletLogin), {
                  expires: new Date(login.walletLogin.expireAt),
                });
                setAuthorized(true);
                // router.push(redirect_path);
              }
            }
          } catch (err: any) {
            if (err.code === 401) {
              disConnectWallet();
              addToast(err.message, { appearance: "error" });
              router.push("/");
            } else {
              addToast(err.message, { appearance: "error" });
              router.push("/");
            }
          }
        } else {
          const checkValid = await checkAuthentication(account);
          if (checkValid) {
            setAuthorized(true);
          } else {
            clearWalletCookies();
            router.push(router.asPath);
          }
        }
      }
    }
  }
  return ![...authenticatedRoutes].includes(path) || authorized ? (
    children
  ) : (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Loading />
    </div>
  );
}
