import { useWeb3React } from "@web3-react/core";
import { ImageProfile } from "components/Images";
import { ethers } from "ethers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { CHAIN_SLUG_MAPPING } from "src/helpers/corearray";
import { NULL_ETH_ADDRESS } from "src/helpers/coreconstants";
import { getEthBalance } from "src/ssr/web3";
import { setIsBuying } from "src/store/slices/isBuyOrAcceptSlice";
import {
  useBuyNowMutation,
  useCancelExchangeMutation,
} from "../../../../src/graphql/generated";
import {
  convertTokenAmountToInt,
  formatPriceK,
  processWalletErrorMessage,
} from "../../../../src/helpers/functions";
import { exchangeAbi } from "../../../../src/wallet/exchangeAbi";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import { InfoIcon, RcTooltip } from "../../../Tooltip/rcTooltip";
import classesCommon from "../Common.module.css";
import classes from "./CheckoutModal.module.css";

export const CheckoutModal = ({
  item,
  library,
  account,
  setBuyNowModalNumber,
  setShowBuyNowModal,
  setBuyNowFinshData,
  setLoading,
  setShowBuyNowModalCloseButton,
  setUserEthBalance,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [isLoadingCheckout, setLoadingCheckout] = useState<boolean>(false);

  const { addToast } = useToasts();
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();

  const buyNow = useBuyNowMutation();
  const cancelExchangeMutation = useCancelExchangeMutation();

  const sellOffer = item.active_sell;

  const blockchain = item.collection.blockchain;
  const payment_token = sellOffer.payment_token;
  const sellOfferId = sellOffer.id;

  // 1. Collection Name
  // 2. Collection Slug
  // 3. Item Name
  // 4. Item Image
  // 5. Token Logo
  // 6. Token Name
  // 7. Offered Price
  // 8. Checkout Function

  const handleBuyNowCheckout = async () => {
    try {
      setLoadingCheckout(true);

      if (!blockchain) {
        throw new Error(t("Invalid blockchain!"));
      }

      if (!payment_token) {
        throw new Error(t("Invalid payment token!"));
      }

      if (!sellOfferId) {
        throw new Error(t("Invalid Sell offer!"));
      }

      if (blockchain.chain_id !== chainId) {
        let msg = (
          <>
            {t("Please, switch your network from your wallet to")}{" "}
            <strong
              style={{
                color: "inherit",
                textTransform: "capitalize",
              }}
            >
              {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
            </strong>
          </>
        );

        setLoading(false);
        setLoadingCheckout(false);

        addToast(msg, { appearance: "error" });
        return;
      }

      const userEthBalance = await getEthBalance(library, account);
      setUserEthBalance(userEthBalance);

      const errMessage = t("You do not have enough funds to buy this asset!");

      if (Number(sellOffer?.total_amount) > Number(userEthBalance)) {
        addToast(errMessage, { appearance: "error" });

        setLoading(false);
        setLoadingCheckout(false);

        throw errMessage;
      }

      setShowBuyNowModalCloseButton(false);

      if (sellOfferId) {
        const signer = library?.getSigner();

        let exchangeId;
        try {
          const sell = [
            sellOffer.nonce,
            parseInt(
              (Number(new Date(sellOffer.start_date)) / 1000).toString()
            ),
            parseInt((Number(new Date(sellOffer.end_date)) / 1000).toString()),
            blockchain.nft_contract,
            item.token_id,
            payment_token.contract_address,
            item.owner.wallet_address,
            sellOffer.royalty_address || NULL_ETH_ADDRESS,
            convertTokenAmountToInt(
              sellOffer.seller_amount,
              payment_token.total_decimal
            ),
            convertTokenAmountToInt(
              sellOffer.fee_amount,
              payment_token.total_decimal
            ),
            convertTokenAmountToInt(
              sellOffer.royalty_amount,
              payment_token.total_decimal
            ),
            /* convertTokenAmountToInt(
              Number(sellOffer.fee_amount) + Number(sellOffer.royalty_amount),
              payment_token.total_decimal
            ), */
            convertTokenAmountToInt(
              sellOffer.total_amount,
              payment_token.total_decimal
            ),
          ];

          const contract = new ethers.Contract(
            blockchain.exchange_contract,
            exchangeAbi,
            signer
          );
          const contractWithSigner = contract.connect(signer);

          const exchange: any = await buyNow.mutateAsync({
            offerId: sellOfferId,
          });

          dispatch(setIsBuying(true));

          exchangeId = exchange.buyNow.id;

          const buyNftTx = await contractWithSigner.buyNFT(
            sell,
            exchange.buyNow.uid,
            sellOffer.signature,
            {
              value: convertTokenAmountToInt(sellOffer.total_amount, payment_token.total_decimal),
            }
          );

          setBuyNowFinshData({
            buyNftTx: buyNftTx,
            exchange: exchange.buyNow,
          });
          setBuyNowModalNumber(3);
        } catch (err: any) {
          try {
            if (exchangeId)
              await cancelExchangeMutation.mutateAsync({
                exchangeId: exchangeId,
              });
          } catch (e) {}

          dispatch(setIsBuying(false));

          if (err.message) {
            const errMsg = processWalletErrorMessage(err.message, err);
            addToast(errMsg, { appearance: "error" });
          }
          setLoadingCheckout(false);
          setShowBuyNowModalCloseButton(true);
        }
      }
    } catch (e: any) {
      //console.log(e);
      //To.do : Cancel exchange fail buynow process..
      addToast(e.message, { appearance: "error" });
      setShowBuyNowModal(false);
      setLoading(false);
      setLoadingCheckout(false);
      setShowBuyNowModalCloseButton(true);
    }
  };

  return (
    <>
      <h2 className={classesCommon.title}>{t("Complete checkout")}</h2>

      <p className={classesCommon.text}>
        <strong>{item.name}</strong>
      </p>

      {/* info  */}
      <div className={classes.info}>
        <div className={classes.infoBoxContainer}>
          <ImageProfile
            src={item.thumbnail_path}
            alt={item.name}
            className={classes.itemImage}
          />

          <div className={classes.infoBox}>
            <span className={classes.label}>
              <a
                href={`/collections/${item.collection.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.collection?.name}
              </a>
            </span>

            <span className={classes.labelBold}>{item.name}</span>
            <RcTooltip
              overlay={t(
                "The creator of this item will get the percentage every time after a sale from the total amount"
              )}
            >
              <InfoIcon />
              <small className="ml-2">
                {t("Royalty")}: {item.collection.royalties}%
              </small>
            </RcTooltip>
          </div>
        </div>

        <div className={classes.infoBox}>
          <span className={classes.labelBold}>
            <RcTooltip overlay={payment_token.token_symbol}>
              <img
                src={payment_token.logo}
                alt={payment_token.name}
                width={13}
              />
            </RcTooltip>
            <span className="ml-3">{formatPriceK(sellOffer?.total_amount, 18)}</span>
          </span>
          {/* <span className={classes.label}>{sellOffer?.total_amount}$</span> */}
        </div>
      </div>

      {/* Total */}
      <div className={classes.total}>
        <h3>{t("Total")}</h3>

        <div className={classes.infoBox}>
          <span className={classes.labelBold}>
            <RcTooltip overlay={payment_token.token_symbol}>
              <img
                src={payment_token.logo}
                alt={payment_token.name}
                width={13}
              />
            </RcTooltip>

            <span className={"ml-3 " + classes.totalAmount}>
              {formatPriceK(sellOffer?.total_amount, 18)}
            </span>
          </span>

          {/* <span className={classes.label}>{sellOffer?.total_amount}$</span> */}
        </div>
      </div>

      {/* button  */}
      <div className="display-grid text-center">
        <button
          type="button"
          disabled={isLoadingCheckout}
          className={classesCommon.wideBtn}
          onClick={handleBuyNowCheckout}
        >
          {isLoadingCheckout ? <LoadingCircles /> : t("Checkout")}
        </button>
      </div>
    </>
  );
};
//lang ok
