import { ImageItem, ImageProfile } from "components/Images";
import { ethers } from "ethers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { NULL_ETH_ADDRESS } from "src/helpers/coreconstants";
import { RootState } from "src/store";
import { setIsAccepting } from "src/store/slices/isBuyOrAcceptSlice";
import { nftAbi } from "src/wallet/nftAbi";
import {
  useAcceptOfferMutation,
  useCancelExchangeMutation,
} from "../../../../src/graphql/generated";
import {
  convertTokenAmountToInt,
  formatPriceK,
  formatTokenDecimalAmount,
  processWalletErrorMessage,
} from "../../../../src/helpers/functions";
import { exchangeAbi } from "../../../../src/wallet/exchangeAbi";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import { InfoIcon, RcTooltip } from "../../../Tooltip/rcTooltip";
import classesCommon from "../Common.module.css";
import classes from "./AcceptOffer.module.css";

export const AcceptOfferModal = ({
  library,
  item,
  setAcceptOfferModalNumber,
  setShowAcceptOfferModal,
  setAcceptOfferFinishData,
  buyOffer,
  setLoading,
  setShowModalCloseButton,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  // userData
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const acceptOfferMutation = useAcceptOfferMutation();
  const cancelExchangeMutation = useCancelExchangeMutation();

  const [acceptOfferLoading, setAcceptOfferLoading] = useState<boolean>(false);

  const processAcceptOffer = async () => {
    try {
      setAcceptOfferLoading(true);
      setShowModalCloseButton(false);
      if (!buyOffer) {
        throw new Error("Invalid buy offer!");
      }
      const blockchain = item.collection.blockchain;
      const payment_token = buyOffer.payment_token;
      const signer = library?.getSigner();
      let exchangeId;

      try {
        const checkApproval = await checkAndSetApproval(blockchain, signer);

        if (checkApproval) {
          const buy = [
            buyOffer.nonce,
            parseInt((Number(new Date(buyOffer.start_date)) / 1000).toString()),
            parseInt((Number(new Date(buyOffer.end_date)) / 1000).toString()),
            blockchain.nft_contract,
            item.token_id,
            payment_token.contract_address,
            buyOffer.user.wallet_address,
            buyOffer.royalty_address || NULL_ETH_ADDRESS,
            convertTokenAmountToInt(
              buyOffer.seller_amount,
              payment_token.total_decimal
            ),
            convertTokenAmountToInt(
              buyOffer.fee_amount,
              payment_token.total_decimal
            ),
            convertTokenAmountToInt(
              buyOffer.royalty_amount,
              payment_token.total_decimal
            ),
            /* convertTokenAmountToInt(
              Number(buyOffer.fee_amount) + Number(buyOffer.royalty_amount),
              payment_token.total_decimal
            ), */
            convertTokenAmountToInt(
              buyOffer.total_amount,
              payment_token.total_decimal
            ),
          ];

          const contract = new ethers.Contract(
            blockchain.exchange_contract,
            exchangeAbi,
            signer
          );
          const contractWithSigner = contract.connect(signer);

          const exchange: any = await acceptOfferMutation.mutateAsync({
            offerId: buyOffer.id,
          });
          exchangeId = exchange.acceptOffer.id;

          dispatch(setIsAccepting(true));

          const sellNftTx = await contractWithSigner.sellNFT(
            buy,
            exchange.acceptOffer.uid,
            buyOffer.signature
          );
          setAcceptOfferFinishData({
            sellNftTx: sellNftTx,
            exchange: exchange.acceptOffer,
          });

          setAcceptOfferModalNumber(2);
        }
      } catch (err: any) {
        try {
          if (exchangeId)
            await cancelExchangeMutation.mutateAsync({
              exchangeId: exchangeId,
            });
        } catch (e) {}

        dispatch(setIsAccepting(false));

        if (err.message) {
          const errMsg = processWalletErrorMessage(err.message, err);
          addToast(errMsg, { appearance: "error" });
        }
        setAcceptOfferLoading(false);
        setShowAcceptOfferModal(false);
        setLoading(false);
        setShowModalCloseButton(true);
      }
    } catch (e: any) {
      addToast(e.message, { appearance: "error" });
      setShowAcceptOfferModal(false);
      setLoading(false);
      setShowModalCloseButton(true);
    }
  };

  const checkAndSetApproval = async (blockchain: any, signer: any) => {
    const contract = new ethers.Contract(
      blockchain.nft_contract,
      nftAbi,
      signer
    );
    const contractWithSigner = contract.connect(signer);

    const isApproved = await contract.isApprovedForAll(
      userData.wallet_address,
      blockchain.exchange_contract
    );

    if (!isApproved) {
      const tx = await contractWithSigner.setApprovalForAll(
        blockchain.exchange_contract,
        true
      );

      await tx.wait();

      const checkApproval = await contract.isApprovedForAll(
        userData.wallet_address,
        blockchain.exchange_contract
      );

      if (checkApproval) {
        return true;
      } else {
        throw new Error(
          t("Nft approve process is not successful. Try agian later.")
        );
      }
    } else {
      return true;
    }
  };

  return (
    <>
      <h2 className={classesCommon.title}>{t("Accept this offer")}</h2>

      <p className={classesCommon.text}>
        <strong>{t("Item")}</strong>
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
                {item.collection.name}
              </a>
            </span>

            <span className={classes.labelBold}>{item.name}</span>
          </div>
        </div>

        <div className={classes.infoBox}>
          <span className={classes.labelBold}>
            <RcTooltip
              overlay={
                buyOffer?.payment_token?.token_symbol +
                " " +
                formatPriceK(buyOffer?.total_amount, 18)
              }
            >
              <img
                src={buyOffer?.payment_token?.logo}
                alt="token logo"
                width={13}
              />

              <span className="ml-3">
                {formatPriceK(buyOffer?.total_amount, 18)}
              </span>
            </RcTooltip>
          </span>

          {/* <span className={classes.label}>${formatPriceK(3526)}</span> */}
        </div>
      </div>

      {/* Fees */}
      <p className={classesCommon.text + " mt-4"}>
        <strong>{t("Fees")}</strong>

        <RcTooltip overlay={t("Fees for NFT")}>
          <InfoIcon />
        </RcTooltip>
      </p>

      <div className={classes.fees}>
        <p className={classesCommon.text}>{t("System Fee")}</p>

        <span className="" />

        <p className={classesCommon.text + " " + classes.feePercent}>
          {buyOffer?.fee_percentage}%
        </p>
      </div>

      <div className={classes.fees}>
        <p className={classesCommon.text}>{t("Royalty")}</p>

        <span className="" />

        <p className={classesCommon.text + " " + classes.feePercent}>
          {buyOffer?.royalty_percentage}%
        </p>
      </div>

      {/* Total */}
      <div className={classes.total}>
        <h3>
          {t("You will get")}

          <RcTooltip
            overlay={t(
              "This is the net seller amount. If you're the creator of this item, you'll get the royalty amount seperately after the successful sale."
            )}
          >
            <InfoIcon />
          </RcTooltip>
        </h3>

        <div className={classes.infoBox}>
          <span className={classes.labelBold}>
            <RcTooltip overlay={buyOffer?.payment_token?.token_symbol}>
              <img
                src={buyOffer?.payment_token?.logo}
                alt="token logo"
                width={13}
              />
            </RcTooltip>

            <span className={"ml-3 " + classes.totalAmount}>
              {formatTokenDecimalAmount(buyOffer?.seller_amount, buyOffer?.payment_token?.total_decimal)}
            </span>
          </span>

          {/* <span className={classes.label}>${formatPriceK(3526)}</span> */}
        </div>
      </div>

      {/* button  */}
      <div className="display-grid text-center">
        <button
          type="button"
          className={classesCommon.wideBtn}
          onClick={processAcceptOffer}
          disabled={acceptOfferLoading}
        >
          {acceptOfferLoading ? <LoadingCircles /> : t("Accept")}
        </button>
      </div>
    </>
  );
};
