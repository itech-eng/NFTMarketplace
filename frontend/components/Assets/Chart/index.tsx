import classes from "./Chart.module.css";
import Select from "react-select";
import { useState } from "react";
import { useGetDayWiseItemPriceQuery } from "src/graphql/generated";
import { PriceChart } from "components/Chart/PriceChart";
import useTranslation from "next-translate/useTranslation";

export const AssetChart = ({ margin, item_id }: any) => {
  const { t } = useTranslation("common");
  
  const PRICE_HISTORY_OPTIONS = [
    { value: "7", label: t("Last 7 Days") },
    { value: "14", label: t("Last 14 Days") },
    { value: "30", label: t("Last 30 Days") },
    { value: "60", label: t("Last 60 Days") },
    { value: "90", label: t("Last 90 Days") },
    { value: "365", label: t("Last Year") },
    // { value: "all", label: t("All Time") },
  ];
  
  const [days, setDays] = useState<string>(PRICE_HISTORY_OPTIONS[0].value);
  const { data: itemPrice, refetch: itemPriceRefetch } =
    useGetDayWiseItemPriceQuery({
      item_id: item_id,
      days: days,
    });

  const data = itemPrice?.getDayWiseItemPrice?.day_wise_price_count.map(
    (item) => {
      return {
        date:
          new Date(item.date).getDate() +
          "/" +
          (new Date(item.date).getMonth() + 1),
        volume: item.sum_price.toFixed(2),
        avg_price: item.avg_price.toFixed(2),
      };
    }
  );

  const handleDayChange = (e: any) => {
    setDays(e.value);
    itemPriceRefetch();
  };

  return (
    <div className={`${margin ? "my-5" : ""}`}>
      <div className={classes.info}>
        <Select
          classNamePrefix="profile"
          className={classes.select}
          isSearchable={false}
          name="priceHistory"
          id="priceHistory"
          instanceId="priceHistory"
          options={PRICE_HISTORY_OPTIONS}
          defaultValue={PRICE_HISTORY_OPTIONS[0]}
          onChange={handleDayChange}
        />

        {itemPrice?.getDayWiseItemPrice?.total_avg_price ||
        itemPrice?.getDayWiseItemPrice?.total_sum_price ? (
          <div className={classes.stats}>
            <div className={classes.statCard}>
              <span>{days} Day Avg Price</span>
              <span className={classes.statsAmount}>
                {"="} ${" "}
                {itemPrice?.getDayWiseItemPrice?.total_avg_price?.toFixed(2)}
              </span>
            </div>

            <div className={classes.statCard}>
              <span>
                {days} {t("Day Volume")}
              </span>
              <span className={classes.statsAmount}>
                {"="} ${" "}
                {itemPrice?.getDayWiseItemPrice?.total_sum_price?.toFixed(2)}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      {data && data.length > 0 ? (
        <PriceChart data={data} />
      ) : (
        <p className="text-center mt-5">{t("No History Available!")}</p>
      )}
    </div>
  );
};

//lang ok
