import { useWeb3React } from "@web3-react/core";
import { ImageItem } from "components/Images";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { CHAIN_SLUG_MAPPING } from "src/helpers/corearray";
import useWallet from "../../../hooks/useWallet";
import { CancelModal } from "../../../sections/Asset/AssetItem/AssetModal";
import {
  useCancelBuyOfferMutation,
  useItemBuyOfferListQuery,
  useItemExchangeInProgressQuery,
} from "../../../src/graphql/generated";
import {
  ACTIVE_MODAL_ACCEPT_OFFER,
  ACTIVE_MODAL_CANCEL_OFFER,
  COMMON_COIN_DECIMAL_VISUAL,
  DEFAULT_IMAGE,
} from "../../../src/helpers/coreconstants";
import { formatPriceK, noExponents } from "../../../src/helpers/functions";
import {
  checkOnPageAuthentication,
  getBuyOfferById,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";
import { LoadingCircles } from "../../Loader/LoadingCircles";
import { Modal } from "../../Modal";
import { RcTooltip } from "../../Tooltip/rcTooltip";
import { AcceptOfferModal } from "../SellModals/AcceptOffer";
import { AuthenticationModal } from "../SellModals/Authentication";
import { AcceptOfferSuccessModal } from "../SellModals/SuccessModal/AcceptOfferSuccess";
import classes from "./BuyOfferTable.module.css";

export const BuyOfferTable = ({
  item,
  owner,
  web3Data,
  isRefetch,
  setRefetch,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const router = useRouter();

  const { addToast } = useToasts();
  const { disConnectWallet } = useWallet();

  const { library } = web3Data;
  const { chainId } = useWeb3React();

  const blockchain = item.collection.blockchain;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const humanizeDifference = (endDate: string) => {
    const minutesDifference = moment(endDate).diff(new Date(), "minutes");

    const durationHumanize = moment
      .duration(minutesDifference, "minutes")
      .humanize();

    return durationHumanize;
  };

  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [showModalCloseButton, setShowModalCloseButton] = useState(true);
  const [showAcceptOfferModal, setShowAcceptOfferModal] = useState(false);
  const [acceptOfferModalNumber, setAcceptOfferModalNumber] =
    useState<number>(1);
  const [acceptOfferFinshData, setAcceptOfferFinishData] = useState<any>(null);
  const [buyOffer, setBuyOffer] = useState<any>(null);

  const [authenticateAction, setAutheticateAction] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [offerUid, setOfferUid] = useState<any>(null);
  const cancelBuyOfferMutation = useCancelBuyOfferMutation();

  const { data: buyOfferListQuery } = useItemBuyOfferListQuery(
    {
      item_id: item.id,
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const buyOfferList = buyOfferListQuery?.itemBuyOfferList;
  // console.log("buyOfferList", buyOfferList);

  // exchange in progress
  const [exchangeInProgress, setExchangeInProgress] = useState(
    item?.exchange_in_progress
  );

  const { data: exchangeInProgressQuery } = useItemExchangeInProgressQuery(
    {
      slugOrTokenId: item.slug,
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const exchangeInProg =
    exchangeInProgressQuery?.ItemDetailsBySlugOrTokenId.exchange_in_progress;

  useEffect(() => {
    // let mount = true;

    setExchangeInProgress(exchangeInProg);

    // return () => {
    //   mount = false;
    // };
  }, [exchangeInProg]);
  // exchange in progress end

  useEffect(() => {
    if (activeModal && activeModal === ACTIVE_MODAL_ACCEPT_OFFER) {
      setShowAcceptOfferModal(authenticateAction);
    }
    if (activeModal && activeModal === ACTIVE_MODAL_CANCEL_OFFER) {
      setShowCancel(true);
    }
  }, [activeModal, authenticateAction]);

  const handleAcceptOffer = async (id: number) => {
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

      addToast(msg, { appearance: "error" });

      return;
    }

    const buyOffer = await getBuyOfferById(id);
    setBuyOffer(buyOffer);
    setLoading(true);
    setShowAcceptOfferModal(true);
    setActiveModal(ACTIVE_MODAL_ACCEPT_OFFER);
    setAutheticateAction(false);
    try {
      await checkOnPageAuthentication(
        userData.wallet_address,
        setAutheticateAction
      );
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });
      setShowAcceptOfferModal(false);
      setLoading(false);
    }
  };

  const handleCancelBuyOffer = async (uid: string) => {
    // no chain id checking
    // if (blockchain.chain_id !== chainId) {
    //   let msg = (
    //     <>
    //       {t("Please, switch your network from your wallet to")}{" "}
    //       <strong
    //         style={{
    //           color: "inherit",
    //           textTransform: "capitalize",
    //         }}
    //       >
    //         {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
    //       </strong>
    //     </>
    //   );

    //   addToast(msg, { appearance: "error" });

    //   return;
    // }

    try {
      await checkOnPageAuthentication(
        userData.wallet_address,
        setAutheticateAction
      );
      const res = await cancelBuyOfferMutation.mutateAsync({ sell_uid: uid });
      const data = res?.cancelBuyOffer;
      setShowCancel(false);

      if (!data.success) {
        addToast(data.message, { appearance: "error" });
      } else {
        addToast(data.message, { appearance: "success" });
      }

      router.push(router.asPath);
      setRefetch(true);
    } catch (err: any) {
      if (err.code === 401) {
        addToast(err.message, { appearance: "error" });
        setLoading(false);
        setShowCancel(false);
        // disconnect
        disConnectWallet();
      } else {
        addToast(err.message, { appearance: "error" });
        setLoading(false);
        setShowCancel(false);
      }
    }
  };

  return (
    <>
      {buyOfferList?.length === 0 ? (
        <p className="text-center mt-2 mb-0">
          {t("No offer has been listed yet!")}
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="border-bottom">
              <tr>
                <th className="border-0">{t("Price")}</th>
                <th className="border-0">{t("USD Price")}</th>
                {/* <th className="border-0">{t("Floor Difference")}</th> */}
                <th className="border-0">{t("Expiraton")}</th>
                <th className="border-0">{t("From")}</th>
                <th className="border-0"></th>
              </tr>
            </thead>

            <tbody className={classes.tableBody}>
              {buyOfferList?.map((offerItem: any) => (
                <tr key={offerItem.id}>
                  <td /*className={classes.itemAlign}*/>
                    {/* offerItem.payment_token */}
                    <RcTooltip
                      className="d-flex align-items-center"
                      overlay={`${formatPriceK(
                        offerItem.total_amount,
                        COMMON_COIN_DECIMAL_VISUAL
                      )} ${offerItem.payment_token.token_symbol}`}
                    >
                      {/* <img
                        src={offerItem.payment_token.logo}
                        alt={offerItem.payment_token.name}
                        className={classes.tokenLogo}
                      /> */}
                      <ImageItem
                        src={offerItem.payment_token.logo || DEFAULT_IMAGE.ITEM}
                        alt={offerItem.payment_token.name}
                        layout="fixed"
                        height={12}
                        className={classes.tokenLogo}
                        width={12}
                      />
                      <span className="p-2">
                        {formatPriceK(
                          offerItem.total_amount,
                          COMMON_COIN_DECIMAL_VISUAL
                        )}
                      </span>
                      <span className={"d-none d-sm-inline-block"}>
                        {offerItem.payment_token.token_symbol}
                      </span>
                    </RcTooltip>
                  </td>
                  <td>
                    <RcTooltip
                      overlay={
                        <>
                          $
                          {noExponents(
                            offerItem.total_amount *
                              offerItem.payment_token.usd_rate
                          )}
                        </>
                      }
                    >
                      {offerItem.total_amount *
                        offerItem.payment_token.usd_rate ===
                      0 ? (
                        "---"
                      ) : (
                        <>
                          {" "}
                          $
                          {formatPriceK(
                            offerItem.total_amount *
                              offerItem.payment_token.usd_rate
                          )}
                        </>
                      )}
                    </RcTooltip>
                  </td>
                  <td>
                    <RcTooltip
                      overlay={<>{moment(offerItem.end_date).format("llll")}</>}
                    >
                      {humanizeDifference(offerItem.end_date)}
                    </RcTooltip>
                  </td>
                  <td>
                    <Link href={`/profile/${offerItem.user.username}`}>
                      <a>
                        {offerItem.user.wallet_address ===
                        userData.wallet_address
                          ? t("you")
                          : offerItem.user.username}
                      </a>
                    </Link>
                  </td>
                  <td>
                    {offerItem.user.wallet_address ===
                      userData.wallet_address &&
                      !exchangeInProgress && (
                        <button
                          type="button"
                          className={classes.cancelButton}
                          onClick={() => {
                            setLoading(true);
                            setActiveModal(ACTIVE_MODAL_CANCEL_OFFER);
                            setOfferUid(offerItem.uid);
                            setShowCancel(true);
                          }}
                          disabled={
                            activeModal === ACTIVE_MODAL_CANCEL_OFFER &&
                            loading &&
                            offerUid === offerItem.uid
                          }
                        >
                          {activeModal === ACTIVE_MODAL_CANCEL_OFFER &&
                          loading &&
                          offerUid === offerItem.uid ? (
                            <LoadingCircles />
                          ) : (
                            <>{t("Cancel")} </>
                          )}
                        </button>
                      )}

                    {item.owner.wallet_address === userData.wallet_address &&
                      !exchangeInProgress && (
                        <button
                          type="button"
                          className={classes.cancelButton}
                          onClick={() => {
                            setOfferUid(offerItem.uid);
                            handleAcceptOffer(offerItem.id);
                          }}
                          disabled={
                            activeModal === ACTIVE_MODAL_ACCEPT_OFFER &&
                            loading &&
                            offerUid === offerItem.uid
                          }
                        >
                          {activeModal === ACTIVE_MODAL_ACCEPT_OFFER &&
                          loading &&
                          offerUid === offerItem.uid ? (
                            <LoadingCircles />
                          ) : (
                            <>{t("Accept")} </>
                          )}
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        show={showAcceptOfferModal}
        outsideClose={false}
        showClose={showModalCloseButton}
        onClose={() => {
          setShowAcceptOfferModal(false);
          setLoading(false);
        }}
      >
        {authenticateAction ? (
          (acceptOfferModalNumber === 1 && (
            <AcceptOfferModal
              library={library}
              item={item}
              setAcceptOfferModalNumber={setAcceptOfferModalNumber}
              setShowAcceptOfferModal={setShowAcceptOfferModal}
              setAcceptOfferFinishData={setAcceptOfferFinishData}
              buyOffer={buyOffer}
              setLoading={setLoading}
              setShowModalCloseButton={setShowModalCloseButton}
            />
          )) ||
          (acceptOfferModalNumber === 2 && (
            <AcceptOfferSuccessModal
              acceptOfferFinshData={acceptOfferFinshData}
              item={item}
              setShowModalCloseButton={setShowModalCloseButton}
            />
          ))
        ) : (
          <AuthenticationModal />
        )}
      </Modal>

      {/* cancel offer */}
      <Modal
        show={showCancel}
        outsideClose={false}
        showClose={false}
        onClose={() => setShowCancel(false)}
        title={t("Are you sure you want to cancel this?")}
      >
        <CancelModal
          onClose={() => {
            setShowCancel(false);
            setLoading(false);
          }}
          onClick={() => handleCancelBuyOffer(offerUid)}
          description={t("Click cancel to cancel your offer.")}
        />
      </Modal>
    </>
  );
};
//lang ok
