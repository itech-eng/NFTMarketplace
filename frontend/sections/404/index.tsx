import Link from "next/link";
import classes from "./ErrorPageSection.module.css";

import useTranslation from "next-translate/useTranslation";

export default function ErrorPageSection({ title }: any) {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <section className="section">
      <div className="container">
        <div className={classes.wrapper}>
          <h2 className={classes.title}>
            4<span className={classes.zero}>0</span>4
          </h2>
          <p>{title ? title : `${t("Oops! You're in a wrong page")}.`}</p>
          <Link href="/">
            <a className="primary-btn">{t("Back to Home")}</a>
          </Link>
        </div>
      </div>
    </section>
  );
}
//lang ok
