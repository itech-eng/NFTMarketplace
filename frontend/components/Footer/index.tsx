import Link from "next/link";
import classes from "./Footer.module.css";
import { absPath } from "../../src/helpers/functions";
import { NewsLetterSection } from "./NewsLetterSection";
import { Address } from "./Address";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FIVE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FOUR,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_ONE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_THREE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_TWO,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FIVE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FOUR,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_ONE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_THREE,
  SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_TWO,
} from "src/helpers/slugcontanst";

const FooterSection = ({ settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const MenuWidgetOneItems = [
    {
      url: "marketplace",
      label: t("Marketplace"),
    },
    {
      url: "sell-offers",
      label: t("Sale Offers"),
    },
    {
      url: "assets",
      label: t("Assets"),
    },
  ];

  return (
    <footer className={classes.footer}>
      <div className={classes.widgetArea}>
        <div className="homepage-container">
          <div className="container">
            <div className="row">
              {/* logo, form, socials */}
              <div
                className={`col-lg-3 col-md-6 col-sm-6 ${classes.newsLatterRightMargin}`}
              >
                <NewsLetterSection setting={settings} />
              </div>

              {/* Links */}
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div
                  className={`${classes.singleWidget} ${classes.menuWidget}`}
                >
                  <h3 className={classes.widgetTitle}>{t("Marketplace")}</h3>
                  <ul>
                    {MenuWidgetOneItems.map((el, idx) => (
                      <li key={idx}>
                        <Link href={absPath(el.url)}>
                          <a>{el.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Links */}
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div
                  className={`${classes.singleWidget} ${classes.menuWidget}`}
                >
                  <h3 className={classes.widgetTitle}>{t("Useful Links")}</h3>
                  <ul>
                    {settings &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_ONE] &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_ONE] && (
                        <li>
                          <a
                            href={
                              settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_ONE]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_ONE
                              ]
                            }
                          </a>
                        </li>
                      )}

                    {settings &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_TWO] &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_TWO] && (
                        <li>
                          <a
                            href={
                              settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_TWO]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_TWO
                              ]
                            }
                          </a>
                        </li>
                      )}

                    {settings &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_THREE] &&
                      settings[
                        SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_THREE
                      ] && (
                        <li>
                          <a
                            href={
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_THREE
                              ]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_THREE
                              ]
                            }
                          </a>
                        </li>
                      )}

                    {settings &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FOUR] &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FOUR] && (
                        <li>
                          <a
                            href={
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FOUR
                              ]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FOUR
                              ]
                            }
                          </a>
                        </li>
                      )}

                    {settings &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FIVE] &&
                      settings[SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FIVE] && (
                        <li>
                          <a
                            href={
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_URL_FIVE
                              ]
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              settings[
                                SETTINGS_SLUG_FOOTER_USEFUL_LINK_TITLE_FIVE
                              ]
                            }
                          </a>
                        </li>
                      )}
                  </ul>
                </div>
              </div>

              {/* Company Info */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <Address setting={settings} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <div className="container">
          <p className={classes.copyrightText}>
            &copy;{" "}
            {settings?.copy_right_text
              ? settings?.copy_right_text
              : new Date().getFullYear() +
                "," +
                " " +
                t("All Rights Reserved by ") +
                process.env.NEXT_PUBLIC_APP_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
//lang ok
