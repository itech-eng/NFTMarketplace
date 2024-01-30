import { ImageItem } from "components/Images";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { COMMON_COIN_DECIMAL_VISUAL } from "src/helpers/coreconstants";
import { RootState } from "src/store";
import { formatPriceK } from "../../src/helpers/functions";
import { RcTooltip } from "../Tooltip/rcTooltip";
import classes from "./ItemRow.module.css";

export const ItemRow = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  return (
    <tr className={classes.row}>
      <td className={classes.item}>
        <Link href={`/assets/${data.item.slug}`}>
          <a className={classes.itemImage}>
            <ImageItem
              src={data.item.thumbnail_path}
              alt={data.item.name}
              layout="fixed"
              className={classes.itemSellImage}
            />
          </a>
        </Link>
        <div>
          <Link href={`/collections/${data.item?.collection?.slug}`}>
            <a className={classes.collectionName}>
              {data.item?.collection?.name}
            </a>
          </Link>

          <h4 className={classes.itemName}>
            <Link href={`/assets/${data.item.slug}`}>
              <a>{data.item.name}</a>
            </Link>
          </h4>
        </div>
      </td>
      <td>
        <h4>
          <RcTooltip overlay={data?.payment_token?.token_symbol}>
            <img
              src={data?.payment_token?.logo}
              alt={data?.payment_token?.token_symbol}
              width={13}
              className="mr-3"
            />
          </RcTooltip>

          <RcTooltip overlay={data.total_amount}>
            {data.total_amount
              ? formatPriceK(data.total_amount, COMMON_COIN_DECIMAL_VISUAL)
              : "---"}
          </RcTooltip>
        </h4>
      </td>
      <td>
        <Link href={`/profile/${data.user.username}`}>
          <a className={classes.username}>
            {data.user.username === userData.username
              ? t("you")
              : data.user.username}
          </a>
        </Link>
      </td>

      <td>
        <RcTooltip overlay={moment(data.created_at).format("llll")}>
          {moment(data.created_at).fromNow()}
          {/* <IoOpenOutline /> */}
        </RcTooltip>
      </td>

      <td>
        <RcTooltip overlay={moment(data.end_date).format("llll")}>
          {moment(data.end_date).fromNow()}
          {/* <IoOpenOutline /> */}
        </RcTooltip>
      </td>
    </tr>
  );
};
//lang ok
