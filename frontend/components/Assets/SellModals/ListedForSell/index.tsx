import Link from "next/link";
import { ShareableLink } from "../../../ShareableLink";
import classesCommon from "../Common.module.css";
import classes from "./ListedForSell.module.css";
import useTranslation from "next-translate/useTranslation";
import { ImageItem, ImageProfile } from "components/Images";

export const ListedForSell = ({ item, title }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <>
      <h2 className={classesCommon.title}>{title}</h2>

      <div className={classes.imgWrapper}>
        <ImageProfile src={item.thumbnail_path} alt={item.name} />
      </div>

      <ShareableLink item={item} />

      <div className="text-center mt-5">
        <Link href={"/assets/" + item.slug}>
          <a className="primary-btn">{t("View Item")}</a>
        </Link>
      </div>
    </>
  );
};
//lang ok
