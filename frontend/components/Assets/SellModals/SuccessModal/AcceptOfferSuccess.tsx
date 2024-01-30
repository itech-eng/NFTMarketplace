import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { collapseAddress } from "../../../../src/helpers/functions";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import classesCommon from "../Common.module.css";
import classes from "./SuccesModal.module.css";
import { ShareableLink } from "../../../ShareableLink";
import { useCallback, useEffect, useState } from "react";
import { useFinishExchangMutation } from "../../../../src/graphql/generated";
import { useToasts } from "react-toast-notifications";
import { ImageItem, ImageProfile } from "components/Images";
import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";
import { setIsAccepting } from "src/store/slices/isBuyOrAcceptSlice";

export const AcceptOfferSuccessModal = ({
  acceptOfferFinshData,
  item,
  setShowModalCloseButton,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const dispatch = useDispatch();

  const finishExchange = useFinishExchangMutation();
  const { addToast } = useToasts();

  const [isSuccess, setSuccess] = useState<boolean>(false);

  const { sellNftTx, exchange } = acceptOfferFinshData;

  const acceptOfferFinish = useCallback(async () => {
    try {
      setShowModalCloseButton(false);
      await sellNftTx.wait();
      const finishExchangeResult = await finishExchange.mutateAsync({
        exchangeId: exchange.id,
        transactionHash: sellNftTx.hash,
      });
      setSuccess(true);
      return finishExchangeResult.finishExchang;
    } catch (error: any) {
      setShowModalCloseButton(true);
      dispatch(setIsAccepting(false));
      addToast(error.message, { appearance: "error" });
    }

  }, [exchange.id, sellNftTx]);

  useEffect(() => {
    acceptOfferFinish().then((data) => {
      if (data?.success === true) {
        //console.log(data?.message);
        // addToast(data.message, { appearance: "success" });
      } else {
        //console.log(data?.message);
        // addToast(data?.message, { appearance: "error" });
      }
    });
  }, []); // don't provide any dependency..

  const handleViewItem = () => {
    window.location.reload();
  }

  return (
    <>
      <h2 className={classesCommon.title}>
        {" "}
        {t("Your sale")} {isSuccess ? "has processed!" : "is in process!"}{" "}
      </h2>

      <p className={classes.subTitle}>
        {isSuccess
          ? t("Woot! you have sold the item. It's been confirmed on the blockchain!")
          : t("Your sale is almost done. It should be confirmed on the blockchain shortly!")}
      </p>

      {!isSuccess && (
        <p className="text-danger text-center">
          <i className="fa fa-exclamation-triangle"></i>
          {t("Please do not close or reload this page.")}
        </p>
      )}

      <div className={classes.imgWrapper}>
        <ImageProfile src={item.thumbnail_path} alt={item.name} />
      </div>

      <div className={`${classes.infoWrapper} list-group`}>
        <div className={`${classes.labelWrapper} list-group-item`}>
          <p className={classes.labelText}>{t("Status")}</p>
          <p className={classes.labelText}>{t("Transaction Hash")}</p>
        </div>

        <div className={`${classes.valueWrapper} list-group-item`}>
          <p className={classes.text}>
            {isSuccess ? (
              <>
                <span className={classes.successIcon}>
                  <FcApproval />
                </span>
                {t("Complete")}
              </>
            ) : (
              <>
                <LoadingCircles /> {t("Processing")}
              </>
            )}
          </p>

          <p className={classes.text}>
            <a
              href={`${item.collection.blockchain.explorer_url}/tx/${sellNftTx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {collapseAddress(sellNftTx.hash)}
            </a>
          </p>
        </div>
      </div>

      {isSuccess && (
        <div className="display-grid text-center">
          <ShareableLink />

          <Link href={"/assets/" + item.slug}>
            <a onClick={handleViewItem} className="primary-btn">{t("View Item")}</a>
          </Link>
        </div>
      )}
    </>
  );
};
//lang ok
