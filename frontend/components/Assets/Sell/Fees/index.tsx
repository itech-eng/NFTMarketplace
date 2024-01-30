import Link from "next/link";
import { InfoIcon, RcTooltip } from "../../../Tooltip/rcTooltip";
import classes from "./Fees.module.css";
import useTranslation from "next-translate/useTranslation";

export const Fees = ({ fee }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div className={classes.fees}>
      <div className={classes.feesLevel}>
        <p className="m-0">{t("Fees")}</p>

        <RcTooltip
          overlay={
            <>
              {t(
                "Listing is free. Once sold, the following fees will be deducted."
              )}
            </>
          }
        >
          <InfoIcon />{" "}
        </RcTooltip>
      </div>

      <div className={classes.feesValue}>
        <small>{t("Service Fee")}</small>

        <small>{fee}%</small>
      </div>
    </div>
  );
};
//lang ok
