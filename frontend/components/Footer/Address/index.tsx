import { imageAsset } from "../../../src/helpers/functions";
import classes from "./Address.module.css";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiPhone } from "react-icons/fi";

export const Address = ({ setting }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className={classes.singleWidget}>
      <h3 className={classes.widgetTitle}>{t("Company")}</h3>

      <p className={classes.contactAddress}>
        {setting?.settings?.address
          ? setting?.settings?.address
          : t("5 North 03th Avenue,Penscola, FL 32503, New York")}
      </p>

      <ul className={classes.contactInfo}>
        <li>
          <FiPhone className={classes.icon} aria-label={t("phone icon")} />
          <a href="tel:+">
            {setting?.settings?.contract_phone
              ? setting?.settings?.contract_phone
              : "121-000-121"}
          </a>
        </li>
        <li>
          <FiMail className={classes.icon} aria-label={t("email icon")} />
          <a
            href={`mailto:${
              setting?.settings?.contract_email
                ? setting?.settings?.contract_email
                : "nft@mail.com"
            }`}
          >
            {setting?.settings?.contract_email
              ? setting?.settings?.contract_email
              : "nft@mail.com"}
          </a>
        </li>
      </ul>
    </div>
  );
};
//lang ok
