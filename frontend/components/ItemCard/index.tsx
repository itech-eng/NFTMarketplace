import { useWeb3React } from "@web3-react/core";
import { ImageItem } from "components/Images";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useItemFavouriteListToggleMutation } from "src/graphql/generated";
import { COMMON_COIN_DECIMAL_VISUAL, DEFAULT_IMAGE } from "src/helpers/coreconstants";
import {
  checkItemFavouriteByUser,
  checkOnPageAuthentication,
} from "src/ssr/data";
import { setShowSidebar } from "src/store/slices/walletDrawerSlice";
import { absPath, formatPriceK } from "../../src/helpers/functions";
import { RootState } from "../../src/store";
import { RcTooltip } from "../Tooltip/rcTooltip";
import classes from "./ItemCard.module.css";

export const ItemCard = ({ item, fixedWidth = true, widthValue }: any) => {
  const { t } = useTranslation("common");

  const isWider = useSelector((state: RootState) => state.contentWide.isWider);
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { active } = useWeb3React();

  // total likes
  const [likeCount, setLikeCount] = useState(item.like_count);

  // work for toggle like
  const [isLiked, setIsLiked] = useState(
    item.item_favourite_lists?.length > 0 ? true : false
  );

  const favItemToggleMutation = useItemFavouriteListToggleMutation();

  const handleFavouriteToggle = async () => {
    if (!active) {
      dispatch(setShowSidebar(true));
    } else {
      try {
        await checkOnPageAuthentication(userData.wallet_address, () => {});

        const res = await favItemToggleMutation.mutateAsync({
          item_id: item.id,
        });

        const count = res.itemFavouriteListToggle.count;
        setLikeCount(count);

        const toggle = await checkItemFavouriteByUser(item.id, userData.id);
        setIsLiked(toggle);
      } catch (err: any) {
        addToast(err.message, { appearance: "error" });
      }
    }
  };

  // console.log(item.name, ": ", item.item_favourite_lists.length);

  return (
    <div
      className={`${classes.singleTrending} ${
        fixedWidth && !widthValue ? classes.fixedWidth : classes.notFixedWidth
      } ${isWider && fixedWidth ? classes.itemWider : ""}`}
      style={{ maxWidth: widthValue && `${widthValue}rem` }}
    >
      <article>
        <div className={classes.trendingThumbnail}>
          <Link href={absPath(`assets/${item.slug}`)}>
            <a>
              <ImageItem
                src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
                alt={item.name}
                layout="responsive"
              />
            </a>
          </Link>
        </div>

        <RcTooltip overlay={item.name}>
          <h3 className={classes.trendingTitle + " overflow-text"}>
            <Link href={absPath(`assets/${item.slug}`)}>
              <a>{item.name} </a>
            </Link>
          </h3>
        </RcTooltip>

        <ul className={classes.trendingInfo}>
          {/* {item.price && item.payment_token ? (
        <li>
        {t("Price")}:{" "}
            <span>
              <RcTooltip overlay={item.payment_token.token_symbol}>
                <img
                  src={item.payment_token.logo}
                  alt={item.payment_token.token_symbol}
                  width={10}
                  className="mx-2"
                />
              </RcTooltip>
              {formatPriceK(item.price)}{" "}
            </span>
        </li>
        ) : ""} */}

          {item.owner && (
            <li className={classes.ownedBy}>
              <span>{t("Owned by")}</span>

              <Link href={`/profile/${item.owner?.username}`}>
                <a>
                  {item.owner?.username === userData.username
                    ? t("you")
                    : item.owner?.username}
                </a>
              </Link>
            </li>
          )}

          {/* {item.bids.length > 0 && (
          <li>
            Highest Bid :{" "}
            <span>
              {" "}
              {formatPriceK(Number(highestBid(item.bids)))} 
            </span>
          </li>
        )} */}
        </ul>

        <ul className={classes.trendingMeta}>
          <li className={classes.likes}>
            <RcTooltip overlay={isLiked ? t("Unfavourite") : t("Favourite")}>
              <button type="button" onClick={handleFavouriteToggle}>
                {isLiked ? (
                  <BsHeartFill aria-label="unfavourite" />
                ) : (
                  <BsHeart aria-label="favourite" />
                )}
              </button>
            </RcTooltip>

            {likeCount}
          </li>

          <li>{/* as a dummy */}</li>
          {item.price && item.payment_token ? (
            <li className={classes.priceSection}>
              {t("Price")}:{" "}
              <span>
                <RcTooltip overlay={item.payment_token.token_symbol}>
                  <img
                    src={item.payment_token.logo}
                    alt={item.payment_token.token_symbol}
                    width={10}
                    className="mx-2"
                  />
                </RcTooltip>
                {formatPriceK(item.price, COMMON_COIN_DECIMAL_VISUAL)}{" "}
              </span>
            </li>
          ) : (
            ""
          )}
          <li hidden>
            <Link href={absPath(`assets`)}>
              {/* /${item.collection.contractAddress}/${item.tokenId} */}
              <a className={classes.buy}>{t("Buy")}</a>
            </Link>
          </li>
        </ul>
      </article>
    </div>
  );
};
//lang ok
