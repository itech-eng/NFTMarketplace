import Link from "next/link";
import classes from "./Nav.module.css";
import { absPath } from "../../../src/helpers/functions";
import { Disclosure } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { settings } from "nprogress";

const NavForMobile = ({ onClose, setting }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { pathname } = useRouter();

  return (
    <nav className={`container ${classes.nav}`}>
      <ul className={`${classes.mobileMenu}`}>
        <li>
          <Link href={absPath("")}>
            <a
              className={pathname === "/" ? classes.activeLink : classes.link}
              onClick={onClose}
            >
              {t("Home")}
            </a>
          </Link>
        </li>
        <li>
          <Link href={absPath("marketplace")}>
            <a
              className={
                pathname === "/marketplace" ? classes.activeLink : classes.link
              }
              onClick={onClose}
            >
              {t("Marketplace")}
            </a>
          </Link>
        </li>
        <li>
          <Link href={absPath("sell-offers")}>
            <a
              className={
                pathname === "/sell-offers" ? classes.activeLink : classes.link
              }
              onClick={onClose}
            >
              {t("Sale Offers")}
            </a>
          </Link>
        </li>

        <Disclosure as="li" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${classes.disclosureButton} ${
                  open ? classes.btnOpen : classes.btnClose
                }`}
              >
                <span>{t("Collections")}</span>

                <i
                  className={`fas ${
                    open ? "fa-chevron-down" : "fa-chevron-right"
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className={classes.disclosurePanel} as="ul">
                <li>
                  <Link href={absPath("collections/create")}>
                    <a
                      className={
                        pathname === "/collections/create"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("Create Collection")}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={absPath("collections")}>
                    <a
                      className={
                        pathname === "/collections"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("My Collections")}
                    </a>
                  </Link>
                </li>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="li" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${classes.disclosureButton} ${
                  open ? classes.btnOpen : classes.btnClose
                }`}
              >
                <span>{t("Assets")}</span>

                <i
                  className={`fas ${
                    open ? "fa-chevron-down" : "fa-chevron-right"
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className={classes.disclosurePanel} as="ul">
                <li>
                  <Link href={absPath("assets/create")}>
                    <a
                      className={
                        pathname === "/assets/create"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("Create Asset")}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={absPath("assets")}>
                    <a
                      className={
                        pathname === "/assets"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("Explore Assets")}
                    </a>
                  </Link>
                </li>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="li" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${classes.disclosureButton} ${
                  open ? classes.btnOpen : classes.btnClose
                }`}
              >
                <span>{t("Stats")} </span>

                <i
                  className={`fas ${
                    open ? "fa-chevron-down" : "fa-chevron-right"
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className={classes.disclosurePanel} as="ul">
                <li>
                  <Link href={absPath("rankings")}>
                    <a
                      className={
                        pathname === "/rankings"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("Rankings")}
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={absPath("activity")}>
                    <a
                      className={
                        pathname === "/activity"
                          ? classes.activeLink
                          : classes.link
                      }
                      onClick={onClose}
                    >
                      {t("Activity")}
                    </a>
                  </Link>
                </li>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </ul>

      <ul className={classes.socialArea}>
        <li>
          <a
            href={setting?.settings?.twitter_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a
            href={setting?.settings?.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li>
          <a
            href={setting?.settings?.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <i className="fab fa-instagram" />
          </a>
        </li>
        <li>
          <a
            href={setting?.settings?.discord_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <i className="fab fa-discord" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavForMobile;
//lang ok
