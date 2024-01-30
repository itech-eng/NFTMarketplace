import classes from "./PlaceBid.module.css";
import classesCommon from "../Common.module.css";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import useBalance from "../../../../hooks/useBalance";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import { InputError } from "../../../InputField";
import { formatPriceK } from "src/helpers/functions";
import { TokenInput } from "components/WalletSidebar/WrapToken/TokenInput";

export const PlaceBidModal = ({
  sellOffer,
  bidPrice,
  setBidPrice,
  minPrice,
  isSubmitting,
  onClick,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // console.log(bidPrice, " : ", minPrice);

  const token = sellOffer.payment_token;

  const { balanceIsLoading, balance }: any = useBalance(token);

  // pricing
  const [priceError, setPriceError] = useState<any>(false);

  useEffect(() => {
    if (Number(bidPrice) < 0) {
      setPriceError(t("Invalid Amount!"));
    } else if (Number(bidPrice) < Number(minPrice)) {
      setPriceError(
        t("Amount cannot be less than the mimimum bidding price") +
          `: ${minPrice} ${token.token_symbol}`
      );
    } else if (Number(bidPrice) > Number(balance)) {
      setPriceError(
        t("You do not have enough fund to bid. You have") +
          ` ${balance} ${token.token_symbol}.`
      );
    } else {
      setPriceError(false);
    }
  }, [balance, bidPrice]);

  const formIsInValid = priceError || bidPrice == 0 || bidPrice == "";

  return (
    <>
      <h2 className={classesCommon.title}>{t("Place a bid")}</h2>

      <p className={classesCommon.text + " " + classes.priceInfo}>
        <strong>{t("Price")}</strong>

        {balanceIsLoading ? (
          <LoadingCircles />
        ) : (
          <>
            {t("Balance")}: {formatPriceK(balance)} {token.token_symbol} ($
            {formatPriceK(balance * token.usd_rate)})
          </>
        )}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <TokenInput
          token={token}
          idx={0}
          forPlaceBid={true}
          tokenBalance={bidPrice}
          setTokenBalance={setBidPrice}
        />

        <div className="d-flex justify-content-between align-items-center">
          <span>{priceError && <InputError error={priceError} />}</span>

          <small>
            {!balanceIsLoading && bidPrice > 0 && (
              <>${formatPriceK(bidPrice * token.usd_rate)}</>
            )}
          </small>
        </div>

        <div className={"text-center mt-5"}>
          {!isSubmitting ? (
            <button
              type="submit"
              className="primary-btn"
              disabled={formIsInValid}
              // onClick={onClick}
            >
              {t("Place Bid")}
            </button>
          ) : (
            <button
              type="button"
              disabled={true}
              className={classes.loaderButton}
            >
              <LoadingCircles />
            </button>
          )}
        </div>
      </form>
    </>
  );
};
