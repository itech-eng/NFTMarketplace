import { ActivityEventTitle } from "components/ActivityEventTitle";
import { ImageItem } from "components/Images";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import { FiRefreshCcw, FiTool } from "react-icons/fi";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useToasts } from "react-toast-notifications";
import { ConfirmDeleteModal } from "../../../../components/Modal/ConfirmDeleteModal";
import { RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import { AssetFiltersListType } from "../../../../data/asset-filter";
import {
  useGetItemActivitiesQuery,
  useItemReMintMutation,
} from "../../../../src/graphql/generated";
import {
  DEFAULT_IMAGE,
  ITEM_EVENT_TYPE_BIDS,
  ITEM_EVENT_TYPE_BUY_OFFERS,
  ITEM_EVENT_TYPE_LISTINGS,
  ITEM_EVENT_TYPE_MINT,
  ITEM_EVENT_TYPE_SALES,
  ITEM_EVENT_TYPE_TRANSFERS,
  ITEM_MINT_STATUS_DONE,
  ITEM_MINT_STATUS_FAILED,
  ITEM_MINT_STATUS_IN_PROGRESS,
} from "../../../../src/helpers/coreconstants";
import { checkOnPageAuthentication } from "../../../../src/ssr/data";
import { RootState } from "../../../../src/store";
import classes from "./ActivityTable.module.css";

export const ActivityTable = ({ item, isRefetch, setRefetch }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const AssetFiltersList: readonly AssetFiltersListType[] = [
    {
      value: ITEM_EVENT_TYPE_MINT,
      label: t("Mint"),
      color: "#00B8D9",
      isFixed: true,
    },
    { value: ITEM_EVENT_TYPE_LISTINGS, label: t("Listing"), color: "#0052CC" },
    { value: ITEM_EVENT_TYPE_SALES, label: t("Sale"), color: "#FF8B00" },
    { value: ITEM_EVENT_TYPE_BUY_OFFERS, label: t("Offer"), color: "#c8ff00" },
    { value: ITEM_EVENT_TYPE_BIDS, label: t("Bid"), color: "#5243AA" },
    {
      value: ITEM_EVENT_TYPE_TRANSFERS,
      label: t("Transfer"),
      color: "#FFC400",
    },
  ];

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const { addToast } = useToasts();

  const animatedComponents = makeAnimated();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [inprogressStatus, setInProgressStatus] = useState<boolean>(false);
  const [mintDoneCheck, setMintDoneCheck] = useState<boolean>(false);
  const [activityId, setActivityId] = useState<any>(undefined);

  const [events, setEvents] = useState<any>(null);
  const { data: itemActivities, refetch: refetchActivities } =
    useGetItemActivitiesQuery(
      { item_id: item.id, events: events },
      {
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (isRefetch) {
      refetchActivities();
      setRefetch(false);
    }
  }, [isRefetch]);

  useEffect(() => {}, [inprogressStatus]);
  const getEventStatus = (status: number, event: number) => {
    if (status === ITEM_MINT_STATUS_IN_PROGRESS) {
      if (event === ITEM_EVENT_TYPE_MINT) {
        setTimeout(() => {
          setMintDoneCheck(true);
          refetchActivities();
        }, 60000);
      }
      return "progress";
    } else if (status === ITEM_MINT_STATUS_DONE) {
      if (mintDoneCheck === true) {
        router.reload();
      }
      return "done";
    } else if (status === ITEM_MINT_STATUS_FAILED) return "fail";
    else return null;
  };
  const itemReMint = useItemReMintMutation();

  const handleFilterInputChange = (e: any) => {
    setEvents(e.length > 0 ? e.map((item: any) => item.value).join(",") : null);
  };

  const [authenticateAction, setAutheticateAction] = useState<boolean>(false);

  const handlePreMint = async (activityId: number) => {
    const checkAuth = await checkOnPageAuthentication(
      userData.wallet_address,
      setAutheticateAction
    );
    if (checkAuth) {
      setActivityId(activityId);
      setShowConfirm(true);
    } else {
      setShowConfirm(false);
      addToast(t("Authentication failed"), { appearance: "error" });
    }
  };

  const handleReMintItem = async (activity_id: number) => {
    try {
      const checkAuth = await checkOnPageAuthentication(
        userData.wallet_address,
        setAutheticateAction
      );
      if (checkAuth) {
        const response = await itemReMint.mutateAsync({
          activity_id: activity_id,
        });
        setShowConfirm(false);
        if (response.itemReMint && response.itemReMint.success === true) {
          refetchActivities();
          addToast(response.itemReMint.message, { appearance: "success" });
        } else {
          addToast(response.itemReMint.message, { appearance: "error" });
        }
      } else {
        setShowConfirm(false);
        addToast(t("Authentication failed"), { appearance: "error" });
      }
    } catch (error: any) {
      setShowConfirm(false);
      addToast(error.message, { appearance: "error" });
    }
  };

  return (
    <div className={classes.disclosure}>
      <div className={classes.panelButton}>
        <span>
          <FiTool className="mr-4" />
          {t("Item Activity")}
        </span>
      </div>

      <div className={classes.panelBody}>
        {" "}
        <div className="mb-5">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={AssetFiltersList}
            className={classes.select}
            classNamePrefix="select"
            id="activityTable"
            instanceId="activityTable"
            placeholder={t("Filter by")}
            onChange={handleFilterInputChange}
          />
        </div>
        <div className={"table-responsive " + classes.tableContainer}>
          <table className={"table table-sm " + classes.acitvityTable}>
            <thead>
              <tr>
                <th className="border-0">{t("Event")}</th>
                <th className="border-0">{t("Price")}</th>
                <th className="border-0">{t("From")}</th>
                <th className="border-0">{t("To")}</th>
                <th className="border-0">{t("Date")}</th>
              </tr>
            </thead>

            <tbody>
              {itemActivities &&
                itemActivities.getItemActivities.map(
                  (activity: any, index: number) => (
                    <tr key={activity.id}>
                      <td>
                        <div className={classes.event}>
                          <ActivityEventTitle
                            hash={activity.hash}
                            url={item.collection.blockchain.explorer_url}
                            event={activity.event}
                            status={activity.status}
                          />
                          {getEventStatus(activity.status, activity.event) ===
                            "fail" &&
                            item.owner.id === userData.id && (
                              <RcTooltip
                                overlay={t("Re-mint")}
                                className="ml-2"
                              >
                                <button
                                  type="button"
                                  aria-label={t("re-mint")}
                                  className={classes.remintButton}
                                  onClick={() => handlePreMint(activity.id)}
                                >
                                  <FiRefreshCcw />
                                </button>
                              </RcTooltip>
                            )}
                        </div>
                      </td>

                      <td>
                        {activity.amount === null ||
                        activity.amount === undefined ? (
                          "---"
                        ) : (
                          <>
                            <RcTooltip
                              overlay={activity.payment_token?.token_symbol}
                              className="d-flex align-items-center"
                            >
                              {/* <img
                                src={activity.payment_token?.logo}
                                alt={activity.payment_token?.name}
                                className={classes.tokenLogo}
                                width={10}
                              />{" "} */}
                              <ImageItem
                                src={
                                  activity.payment_token?.logo ||
                                  DEFAULT_IMAGE.ITEM
                                }
                                alt={activity.payment_token?.name}
                                layout="fixed"
                                width={13}
                                className={classes.tokenLogo}
                                height={13}
                              />{" "}
                              <span className="ml-2">{activity.amount}</span>
                            </RcTooltip>
                          </>
                          // <RcTooltip overlay={<>{activity.amount}</>}>
                          //   <span className="overflow-text">
                          //     {formatPriceK(activity.amount)}
                          //   </span>
                          // </RcTooltip>
                        )}
                      </td>

                      <td>
                        {activity.from?.wallet_address && activity.from?.wallet_address ===
                        userData.wallet_address ? (
                          <Link
                            href={"/profile/" + activity.from?.wallet_address}
                          >
                            <a>{t("You")}</a>
                          </Link>
                        ) : activity.from?.wallet_address ? (
                          <Link
                            href={"/profile/" + activity.from?.wallet_address}
                          >
                            <a>{activity.from?.username}</a>
                          </Link>
                        ) : (
                          "---"
                        )}
                      </td>

                      <td>
                        {activity.to?.wallet_address && activity.to?.wallet_address ===
                        userData.wallet_address ? (
                          <Link
                            href={"/profile/" + activity.to?.wallet_address}
                          >
                            <a>{t("You")}</a>
                          </Link>
                        ) : activity.to?.wallet_address ? (
                          <Link
                            href={"/profile/" + activity.to?.wallet_address}
                          >
                            <a>{activity.to?.username}</a>
                          </Link>
                        ) : (
                          "---"
                        )}
                      </td>

                      <td>
                        <RcTooltip
                          overlay={moment(activity.updated_at).format("llll")}
                        >
                          {moment(activity.updated_at).fromNow()}
                        </RcTooltip>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirm && activityId && (
        <ConfirmDeleteModal
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onSubmit={() => handleReMintItem(activityId)}
          description={t("Are you sure to re-mint this item?")}
          title={t("Re-mint Item")}
        />
      )}
    </div>
  );
};
//lang ok
