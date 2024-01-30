import Link from "next/link";
import classes from "./TopSection.module.css";
import { Modal } from "../../../../components/Modal";
import { useEffect, useState } from "react";
import { CancelModal } from "../../../../sections/Asset/AssetItem/AssetModal";
import { useToasts } from "react-toast-notifications";
import {
  useCancelSellOfferMutation,
  useItemExchangeInProgressQuery,
} from "../../../../src/graphql/generated";
import useWallet from "../../../../hooks/useWallet";
import { checkOnPageAuthentication } from "../../../../src/ssr/data";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export const TopSection = ({ token, myItem, item }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [showCancel, setShowCancel] = useState(false);

  const router = useRouter();
  const { addToast } = useToasts();
  const { disConnectWallet } = useWallet();

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const isBuyOrAcceptSlice = useSelector(
    (state: RootState) => state.isBuyOrAcceptSlice
  );

  const [authenticateAction, setAutheticateAction] = useState(false);

  const [exchangeInProgress, setExchangeInProgress] = useState(
    item?.exchange_in_progress
  );

  //
  const { data: exchangeInProgressQuery, refetch: refetchExInProg } =
    useItemExchangeInProgressQuery(
      {
        slugOrTokenId: token,
      },
      {
        refetchOnWindowFocus: true,
      }
    );

  const fetchedExchangeInProg =
    exchangeInProgressQuery?.ItemDetailsBySlugOrTokenId.exchange_in_progress;

  useEffect(() => {
    let mount = true;

    if (mount) {
      let exInProgInterval: any;
      // clearInterval(exInProgInterval);
      if (fetchedExchangeInProg) {
        exInProgInterval = setInterval(() => {
          refetchExInProg();
        }, 30000);
      }

      if (
        exchangeInProgress !== undefined &&
        fetchedExchangeInProg !== undefined &&
        exchangeInProgress &&
        !fetchedExchangeInProg &&
        !isBuyOrAcceptSlice.isBuying &&
        !isBuyOrAcceptSlice.isAccepting
      ) {
        window.location.reload();
        // router.push(router.asPath);
      }

      setExchangeInProgress(fetchedExchangeInProg);
    }

    return () => {
      mount = false;
    };
  }, [fetchedExchangeInProg]);

  // calcel listing
  const uid = item?.active_sell?.uid;
  const cancelOfferMutation = useCancelSellOfferMutation();

  const handleCancel = async () => {
    try {
      await checkOnPageAuthentication(
        userData.wallet_address,
        setAutheticateAction
      );

      const res = await cancelOfferMutation.mutateAsync({ sell_uid: uid });
      const data = res?.cancelSellOffer;

      if (!data.success) {
        addToast(data.message, { appearance: "error" });
      } else {
        addToast(data.message, { appearance: "success" });
      }

      setShowCancel(false);
      router.push(router.asPath);
    } catch (err: any) {
      if (err.code === 401) {
        addToast(err.message, { appearance: "error" });
        setShowCancel(false);
        // disconnect
        disConnectWallet();
      } else {
        addToast(err.message, { appearance: "error" });
        setShowCancel(false);
      }
    }
  };

  return (
    <>
      {exchangeInProgress &&
      !isBuyOrAcceptSlice.isBuying &&
      !isBuyOrAcceptSlice.isAccepting ? (
        <section
          style={{
            background: "var(--s3)",
          }}
        >
          <div className="container py-4 text-center">
            <small>
              <strong
                style={{
                  color: "black",
                }}
              >
                {t(
                  "A Sale process is in progress for this item. Please wait until it is resolved to do any kind of operation."
                )}
              </strong>
            </small>
          </div>
        </section>
      ) : !exchangeInProgress && myItem ? (
        <div className={classes.TopSectionWrapper}>
          <div className="container">
            <div className={classes.topSection}>
              {myItem && !item.active_sell && (
                <Link href={`/assets/edit/${token}`}>
                  <a className="">{t("Edit")}</a>
                </Link>
              )}

              {myItem && item.active_sell && item.is_minted && (
                <>
                  <button
                    type="button"
                    className={classes.cancelBtn}
                    onClick={() => setShowCancel(true)}
                  >
                    {t("Cancel Listing")}
                  </button>
                </>
              )}

              {myItem && !item.active_sell && item.is_minted ? (
                <Link href={`/assets/sell/${token}`}>
                  <a className={"primary-btn " + classes.btnFilled}>
                    {t("Sell")}
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <Modal
        show={showCancel}
        onClose={() => setShowCancel(false)}
        title={t("Are you sure you want to cancel this?")}
      >
        <CancelModal
          onClose={() => setShowCancel(false)}
          onClick={handleCancel}
          description={t(
            "Canceling your listing will unpublish this sale from NFT."
          )}
        />
      </Modal>
    </>
  );
};
