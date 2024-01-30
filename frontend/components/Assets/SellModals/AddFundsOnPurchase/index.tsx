import { MdContentCopy } from "react-icons/md";
import classes from "./AddFundsOnPurchase.module.css";
import classesCommon from "../Common.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store";
import useBalance from "hooks/useBalance";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";

export const AddFundsOnPurchase = ({ token }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { balanceIsLoading, balance }: any = useBalance(token);

  const [copied, setCopied] = useState(false);

  const handleCopyListener = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  return (
    <>
      <h2 className={classesCommon.title}>{t("Add funds to purchase")}</h2>
      <h3 className={classes.subTitle}>
        {t("You nedd 0.001")} {token.token_symbol}
        {" + "}
        <a href={"/"}>{t("gas fees")}</a>
      </h3>

      <p className={classes.description}>
        {t(
          "Transfer funds to your wallet or add funds with a card. It can take up to a minute for your balance to update."
        )}{" "}
      </p>

      <div className={classes.walletInfo}>
        <p className={classes.wallet}>
          {t("Your")} {token.token_symbol} {t("wallet")}:
        </p>
        <p className={classes.balance}>
          {" "}
          {t("Balance")}:{" "}
          {balanceIsLoading ? (
            <LoadingCircles />
          ) : (
            <span>{balance + " " + token.token_symbol}</span>
          )}
        </p>
      </div>

      <div className={classes.address}>
        <small className="overflow-text">
          {userData.wallet_address ? userData.wallet_address : "..."}
        </small>

        <CopyToClipboard
          text={userData.wallet_address || "No Account Found"}
          onCopy={handleCopyListener}
        >
          {copied ? <FiCheck className="text-success" /> : <MdContentCopy />}
        </CopyToClipboard>
      </div>

      <hr />

      <button type="button" className={classesCommon.wideBtn + " mt-4"}>
        {t("Continue")}
      </button>
    </>
  );
};
//lang ok
