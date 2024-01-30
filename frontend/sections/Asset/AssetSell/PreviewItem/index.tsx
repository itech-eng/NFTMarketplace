import classes from "./PreviewItem.module.css";
import { FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import { RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import { COMMON_COIN_DECIMAL_VISUAL, ITEM_UNLOCKABLE_TRUE } from "../../../../src/helpers/coreconstants";
import useTranslation from "next-translate/useTranslation";
import { formatPriceK } from "src/helpers/functions";

export const PreviewItem = ({ item, selectedToken, price }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div className={classes.wrapper}>
      <h2>{t("Preview")}</h2>

      <div className={classes.card}>
        <div className={classes.cardImageContainer}>
          <img
            src={item.thumbnail_path}
            alt={item.name}
            className={classes.cardImage}
          />
        </div>

        <div className={classes.details}>
          <div className={classes.info}>
            <Link href={`/collections/${item.collection.slug}`}>
              <a className={classes.collectionName}>{item.collection.name}</a>
            </Link>

            <Link href={`/assets/${item.slug}`}>
              <a className={classes.itemName}>{item.name}</a>
            </Link>
          </div>

          <div className={classes.price}>
            <span className={classes.priceTitle}>{t("Price")}</span>

            <RcTooltip overlay={selectedToken?.token_symbol}>
              <img
                src={selectedToken?.logo}
                alt={selectedToken?.name}
                width={14}
              />

              <span className={classes.priceAmount}>
                {formatPriceK(price, COMMON_COIN_DECIMAL_VISUAL)}
              </span>
            </RcTooltip>
          </div>
        </div>

        <div className={classes.iconAndTooltip}>
          <RcTooltip
            overlay={"Blockchain: " + item.collection.blockchain.network_name}
          >
            <img
              src={item.collection.blockchain.logo}
              alt={item.collection.blockchain.network_name}
              width={14}
            />
          </RcTooltip>

          {item.is_unlockable_content === ITEM_UNLOCKABLE_TRUE && (
            <RcTooltip overlay={"Includes Unlockable Content"}>
              <FaUnlockAlt
                aria-label="Includes Unlockable Content"
                style={{ color: "var(--p2)", marginLeft: 8 }}
              />
            </RcTooltip>
          )}
        </div>
      </div>

      {/* {sellAsBundle && (
        <div className={classes.bundleSection}>
          <p>1 Item</p>
          <div className={classes.inputWrapper}>
            <Input placeholder="Add item" />
          </div>

          <div className={classes.bundleItem}>
            <img src="/assets/images/trending-1.jpg" alt="asset image" />
            <div>
              <a href="#">username collection</a>
              <p>name</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
//lang ok
