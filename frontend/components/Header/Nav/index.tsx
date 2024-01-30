import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { absPath } from "../../../src/helpers/functions";
import classes from "./Nav.module.css";

const Nav = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { pathname } = useRouter();

  return (
    <nav>
      <ul className={`${classes.mainMenu} main-menu`}>
        <li>
          <Link href={absPath("")}>
            <a className={pathname === "/" ? "active" : ""}>{t("Home")}</a>
          </Link>
        </li>

        <li>
          <Link href={absPath("marketplace")}>
            <a className={pathname === "/marketplace" ? "active" : ""}>
              {t("Marketplace")}
            </a>
          </Link>
        </li>

        <li>
          <Link href={absPath("sell-offers")}>
            <a className={pathname === "/sell-offers" ? "active" : ""}>
              {t("Sale Offers")}
            </a>
          </Link>
        </li>

        {/* collections */}
        <li className="has-children-menu">
          <a href="#">
            {t("Collections")} <i className="fas fa-chevron-down"></i>
          </a>
          <ul className="sub-menu">
            <li>
              <Link href={absPath("collections/create")}>
                <a
                  className={pathname === "/collections/create" ? "active" : ""}
                >
                  {t("Create Collection")}
                </a>
              </Link>
            </li>

            <li>
              <Link href={absPath("collections")}>
                <a className={pathname === "/collections" ? "active" : ""}>
                  {t("My Collections")}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        {/* assets */}
        <li className="has-children-menu">
          <a href="#">
            {t("Assets")} <i className="fas fa-chevron-down"></i>
          </a>
          <ul className="sub-menu">
            <li>
              <Link href={absPath("assets/create")}>
                <a className={pathname === "/assets/create" ? "active" : ""}>
                  {t("Create Asset")}
                </a>
              </Link>
            </li>

            <li>
              <Link href={absPath("assets")}>
                <a className={pathname === "/assets" ? "active" : ""}>
                  {t("Explore Assets")}
                </a>
              </Link>
            </li>
          </ul>
        </li>

        {/*Stats*/}
        <li className="has-children-menu">
          <a href="#">
            {t("Stats")} <i className="fas fa-chevron-down"></i>
          </a>
          <ul className="sub-menu">
            <li>
              <Link href={absPath("rankings")}>
                <a className={pathname === "/rankings" ? "active" : ""}>
                  {t("Rankings")}
                </a>
              </Link>
            </li>

            <li>
              <Link href={absPath("activity")}>
                <a className={pathname === "/activity" ? "active" : ""}>
                  {t("Activity")}
                </a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
//lang ok
