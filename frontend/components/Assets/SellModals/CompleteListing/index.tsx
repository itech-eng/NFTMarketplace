import classes from "./CompleteListing.module.css";
import classesCommon from "../Common.module.css";
import useTranslation from "next-translate/useTranslation";
import { formatPriceK } from "../../../../src/helpers/functions";
import { FiChevronDown } from "react-icons/fi";
import { RcTooltip } from "../../../Tooltip/rcTooltip";
import { useState } from "react";
import { ProfileDisclosure } from "../../../ProfileDisclosure";
import { LoadingCircles } from "../../../Loader/LoadingCircles";
import { FcApproval } from "react-icons/fc";
import moment from "moment";
import { ImageItem, ImageProfile } from "components/Images";
import { COMMON_COIN_DECIMAL_VISUAL } from "src/helpers/coreconstants";

export const CompleteListingModal = ({ item, data, token }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [showInfo, setShowInfo] = useState(false);

  const minutesDifference = moment(data.endDate).diff(
    data.startDate,
    "minutes"
  );
  const durationHumanize = moment
    .duration(minutesDifference, "minutes")
    .humanize();

  return (
    <>
      <h2 className={classesCommon.title}>{t("Complete your listing")}</h2>

      {/* listing info */}
      <div className={classes.infoWrapper}>
        <div className={classes.info}>
          <div className={classes.infoBoxContainer}>
            <ImageProfile
              src={item.thumbnail_path}
              alt={item.name}
              className={classes.itemImage}
            />

            <div className={classes.infoBox}>
              <span className={classes.label}>{item.collection.name}</span>

              <span className={classes.labelBold}>{item.name}</span>

              <span className={classes.label}>{t("Quantity")}: 1</span>
            </div>
          </div>

          <div className={classes.infoBox}>
            <span className={classes.label}>{t("Price")}</span>

            <span className={classes.labelBold}>
              <span>
                <RcTooltip overlay={token.token_symbol}>
                  <img src={token.logo} alt={token.token_symbol} width={13} />
                </RcTooltip>

                <span className="ml-2">
                  {formatPriceK(data.itemPrice, COMMON_COIN_DECIMAL_VISUAL)}
                </span>
              </span>
              <button
                type="button"
                aria-label="show more info"
                className={classes.showInfo}
                onClick={() => setShowInfo(!showInfo)}
              >
                <FiChevronDown aria-label="down arrow" />
              </button>
            </span>

            <span className={classes.label}>
              ${formatPriceK(data.itemPrice * token.usd_rate)}
            </span>
          </div>
        </div>

        {showInfo && (
          <div className={classes.scheduled}>
            <h3>{t("scheduled for")}</h3>

            <div style={{ textAlign: "right" }}>
              <span className={classes.labelBold}>{durationHumanize}</span>
              <span className={classes.label}>
                {moment(data.startDate).format("lll")} -{" "}
                {moment(data.endDate).format("lll")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Disclosures */}
      <div className={classesCommon.disclosureWrapper + " my-4"}>
        <ProfileDisclosure
          defaultOpen={!data.isApproved}
          title={
            <span className={classes.btn}>
              {!data.isApproved ? (
                <LoadingCircles />
              ) : (
                <FcApproval className={classes.icon} />
              )}

              <span className={classes.btnText}>
                {t("Approve this item for sale")}
              </span>
            </span>
          }
        >
          {t(
            "To get set up for auction listings for the first time, you must approve this item for sale, which requires a one-time gas fee."
          )}
        </ProfileDisclosure>

        <ProfileDisclosure
          defaultOpen={data.isApproved && !data.isConfirm}
          title={
            <span className={classes.btn}>
              {!data.isApproved && !data.isConfirm && null}

              {data.isApproved && !data.isConfirm && <LoadingCircles />}

              {data.isApproved && data.isConfirm && (
                <FcApproval className={classes.icon} />
              )}

              <span className={classes.btnText}>
                {t("Confirm")}{" "}
                {formatPriceK(data.itemPrice, COMMON_COIN_DECIMAL_VISUAL)}{" "}
                {token.token_symbol} {t("listing")}
              </span>
            </span>
          }
        >
          <p className={classesCommon.text}>
            {t(
              "Accept the signature request in your wallet and wait for your listing to process."
            )}
          </p>

          <small className={classes.label}>
            {t("Waiting for signature")}...
          </small>
        </ProfileDisclosure>
      </div>
    </>
  );
};
//lang ok
