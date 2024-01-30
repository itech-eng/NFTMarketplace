import classesCommon from "../Common.module.css";
import useTranslation from "next-translate/useTranslation";
import { LoadingCircles } from "../../../Loader/LoadingCircles";

export const AuthenticationModal = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <>
      <h2 className={classesCommon.title}>{t("Authentication required")}</h2>

      <p className={classesCommon.text + " text-center"}>
        {t(
          "You must authenticate with your wallet in order to make an offer on this item."
        )}
      </p>

      <div className="text-center">
        <LoadingCircles />
      </div>
    </>
  );
};
//lang ok
