import { Input } from "../../../InputField";
import { InfoIcon, RcTooltip } from "../../../Tooltip/rcTooltip";
import classes from "./Price.module.css";
import { formatPriceK, noExponents } from "../../../../src/helpers/functions";
import Select from "react-select";
import useTranslation from "next-translate/useTranslation";
import { MIN_COIN_INPUT_AMOUNT } from "src/helpers/coreconstants";

export const Price = ({
  type,
  tokenList,
  selectedToken,
  setSelectedToken,
  itemPrice,
  setItemPrice,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  tokenList = tokenList.map((el: any) => ({
    ...el,
    label: (
      <span className={classes.selectedItem}>
        <img src={el.logo} alt={el.name} />
        {el.token_symbol}
      </span>
    ),
    value: el,
  }));

  return (
    <div className={classes.priceWrapper}>
      {type !== "reserve" && (
        <div className="d-flex justify-content-between">
          {type !== "offer" && <p className="m-0">{t("Price")}</p>}

          {type === "ETH" && (
            <RcTooltip
              overlay={t(
                "List price and listing schedule cannot be edited once the item is listed. You will need to cancel your listing and relist the item with the updated price and dates."
              )}
            >
              <InfoIcon />
            </RcTooltip>
          )}
        </div>
      )}

      {/* should be a dropdown */}
      <div className={classes.priceFields}>
        <div className={classes.priceIcon}>
          <Select
            classNamePrefix="profile"
            className={classes.select}
            isSearchable={false}
            name="token"
            id="token"
            options={tokenList}
            defaultValue={tokenList[0]}
            onChange={(el: any) => setSelectedToken(el)}
            isDisabled={type === "fixed" ? true : false}
            // menuIsOpen
          />

          <Input
            type="number"
            placeholder="amount"
            min={0}
            step={MIN_COIN_INPUT_AMOUNT}
            value={itemPrice}
            onChange={(e: any) => setItemPrice(noExponents(e.target.value))}
          />
        </div>

        <div className={classes.messages}>
          {itemPrice >= 0 ? (
            ""
          ) : (
            <small className={classes.errorMessage + " text-danger"}>
              {t("Invalid Amount")}
            </small>
          )}

          {itemPrice > 0 && (
            <small className={classes.total}>
              $
              {itemPrice * selectedToken.usd_rate !== 0
                ? formatPriceK(itemPrice * selectedToken.usd_rate)
                : "---"}{" "}
              {t("Total")}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};
//lang ok
