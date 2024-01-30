import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { LoadingCircles } from "../../../../components/Loader/LoadingCircles";
import classes from "./AssetModal.module.css";

export const CancelModal = ({ onClose, onClick, description }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <hr />
      <p className="my-5 text-center">{description}</p>
      <hr />
      <div className={classes.topSection}>
        <button type="button" className={classes.btnCancel} onClick={onClose}>
          {t("Never mind")}
        </button>

        <button
          className={classes.btnFilled}
          type="button"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            onClick();
          }}
        >
          {loading ? <LoadingCircles /> : t("Cancel")}
        </button>
      </div>
    </div>
  );
};
//lang ok
