import classes from "./MakeOffer.module.css";
import classesCommon from "../Common.module.css";
import useTranslation from "next-translate/useTranslation";
import useBalance from "../../../../hooks/useBalance";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import { InputError } from "../../../InputField";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import {
  SETTINGS_MIN_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN,
  SETTINGS_MAX_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN,
} from "src/helpers/slugcontanst";
import { RootState } from "../../../../src/store";
import { Price } from "components/Assets/Sell/Price";
import { formatPriceK } from "src/helpers/functions";
import { COMMON_COIN_DECIMAL_VISUAL } from "src/helpers/coreconstants";

export const MakeOfferModal = ({
  tokenList,
  selectedToken,
  setSelectedToken,
  offerPriceFixed,
  setOfferPriceFixed,
  offerEndDateFixed,
  setOfferEndDateFixed,
  isSubmitting,
  onClick,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // console.log("t: ", selectedToken);

  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );

  // get balance
  const { balanceIsLoading, convertRate, balance, setToken }: any =
    useBalance(selectedToken);

  useEffect(() => {
    if (selectedToken) {
      setToken(selectedToken);
    }
  }, [selectedToken]);

  // console.table({ balanceIsLoading, convertRate, balance });

  // pricing
  const [priceError, setPriceError] = useState<any>(false);

  useEffect(() => {
    if (Number(offerPriceFixed) < 0) {
      setPriceError("Invalid Amount!");
    } else if (Number(offerPriceFixed) > Number(balance)) {
      setPriceError(
        t("You do not have enough fund. You have") +
          ` ${balance} ${selectedToken.token_symbol}.`
      );
    } else {
      setPriceError(false);
    }
  }, [balance, offerPriceFixed, selectedToken.token_symbol]);

  // time error
  const [timeError, setTimeError] = useState<any>(false);

  useEffect(() => {
    const minSellDuration =
      settings[SETTINGS_MIN_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN];
    const maxSellDuration =
      settings[SETTINGS_MAX_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN];

    const diff =
      (new Date(offerEndDateFixed).getTime() - new Date().getTime()) /
      (1000 * 60);

    if (diff <= 0) {
      setTimeError(t("Invalid Time"));
    } else if (diff < minSellDuration) {
      setTimeError(
        t("Duration can't be less than ") + { minSellDuration } + t(" minutes")
      );
    } else if (diff > maxSellDuration) {
      setTimeError(
        t("Duration can't be more than ") +
          parseInt((maxSellDuration / (30 * 24 * 60)).toString()) +
          t(" months")
      );
    } else {
      setTimeError(false);
    }
  }, [offerEndDateFixed, settings]);

  const formIsInValid =
    priceError || timeError || offerPriceFixed == 0 || offerPriceFixed == "";

  return (
    <>
      <h2 className={classesCommon.title}>{t("Make an offer")}</h2>

      <p className={classesCommon.text + " " + classes.priceInfo}>
        <strong>{t("Price")}</strong>

        {balanceIsLoading ? (
          <LoadingCircles />
        ) : (
          <>
            {t("Balance")}: {formatPriceK(balance, COMMON_COIN_DECIMAL_VISUAL)}{" "}
            {selectedToken.token_symbol} ($
            {formatPriceK(balance * convertRate)})
          </>
        )}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <Price
          type={"offer"}
          tokenList={tokenList}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          itemPrice={offerPriceFixed}
          setItemPrice={setOfferPriceFixed}
        />

        <div className={classes.errorMessage}>
          {priceError && <InputError error={priceError} />}
        </div>

        <p className={classesCommon.text + " mt-5 mb-3"}>
          <strong>{t("Offer Expiration")}</strong>
        </p>

        <div className={classes.endDate}>
          <DatePicker
            selected={offerEndDateFixed}
            onChange={(date) => setOfferEndDateFixed(date)}
            showTimeSelect
            minDate={new Date()}
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          {timeError && <InputError error={timeError} />}
        </div>

        <div className={"text-center mt-5"}>
          {!isSubmitting ? (
            <button
              type="submit"
              className="primary-btn"
              disabled={formIsInValid}
              // onClick={onClick}
            >
              {t("Make Offer")}
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
//lang ok
