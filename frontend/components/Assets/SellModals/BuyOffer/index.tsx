import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { collapseAddress } from "../../../../src/helpers/functions";
import { InfoIcon, RcTooltip } from "../../../Tooltip/rcTooltip";
import classesCommon from "../Common.module.css";
import classes from "./BuyOfferModal.module.css";

export const BuyOfferModal = ({ item, clickAccept }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <h2 className={classesCommon.title}>
        {t("This is an unreviewed collection")}
      </h2>

      <div className={classes.imageContainer}>
        <img src="/assets/images/globe.png" alt="image" width={200} />
      </div>

      <p className={"text-center " + classesCommon.text}>
        {t("Review this information to ensure it's what you want to buy.")}
      </p>

      <ul className={"list-group " + classes.listGroup}>
        <li className={"list-group-item " + classes.listGroupItem}>
          <span className={classes.label}>{t("Collection name")}</span>

          <span className={classes.value}>
            <a
              href={"/collections/col-name"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.collection.name}
            </a>
          </span>
        </li>

        <li className={"list-group-item " + classes.listGroupItem}>
          <span className={classes.label}>{t("Owner")}</span>

          <span className={classes.value}>
            <a
              href={"/profile/creator"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.owner.name}
            </a>

            <small className="ml-2">(member since Jan 27, 2022)</small>
          </span>
        </li>
        <li className={"list-group-item " + classes.listGroupItem}>
          <span className={classes.label}>{t("Total sales")}</span>

          <span className={classes.value}>2 {t("sales")}</span>
        </li>
        <li className={"list-group-item " + classes.listGroupItem}>
          <span className={classes.label}>{t("Total volume")}</span>

          <span className={classes.value}>
            <span>0.2</span>
            <small className="ml-2">($81.13)</small>
          </span>
        </li>

        <li className={"list-group-item " + classes.listGroupItem}>
          <span className={classes.label}>{t("External links")}</span>

          <span className={classes.value}>{t("Not specified")}</span>
        </li>

        {showMore && (
          <>
            <li className={"list-group-item " + classes.listGroupItem}>
              <span className={classes.label}>{t("Contract address")}</span>

              <span className={classes.value}>
                <a href={"/"} target="_blank" rel="noopener noreferrer">
                  {collapseAddress("0xsfafa65s4d6fa5sd4f6as5d4fa6asdfa4")}
                </a>
              </span>
            </li>

            <li className={"list-group-item " + classes.listGroupItem}>
              <span className={classes.label}>{t("Total items")}</span>

              <span className={classes.value}>3 items</span>
            </li>

            <li className={"list-group-item " + classes.listGroupItem}>
              <span className={classes.label}>{t("Created date")}</span>

              <span className={classes.value}>{t("2 months ago")}</span>
            </li>
          </>
        )}

        <button
          type="button"
          className={
            "list-group-item " +
            classes.listGroupItem +
            " " +
            classes.showMoreBtn
          }
          onClick={() => setShowMore(!showMore)}
        >
          {t("Show")} {showMore ? t("Less") : t("More")}
        </button>
      </ul>

      <label htmlFor="check" className={classes.check}>
        <input type="checkbox" name="name" id="check" onClick={clickAccept} />

        <span className={classesCommon.text}>
          {t(
            "I understand that NFT has not reviewed this collection and blockchain transactions are irreversible."
          )}
        </span>
      </label>
    </>
  );
};
//lang ok
