import { useEffect, useState } from "react";
import classes from "./Account.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { absPath } from "../../../src/helpers/functions";
import NavForMobile from "../Nav/NavForMobile";
import {
  FiLogOut,
  FiSearch,
  FiAlignJustify,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { useWeb3React } from "@web3-react/core";
import useWallet, { walletConnected } from "../../../hooks/useWallet";
import { HeadlessSidebar } from "../../HUI/HeadlessSidebar";
import { Connected } from "../../../sections/WalletSidebar/Connected";
import { NotConnected } from "../../../sections/WalletSidebar/NotConnected";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store";
import { setShowSidebar } from "../../../src/store/slices/walletDrawerSlice";
import { HeadLessSwitch } from "./HeadlessSwitch";
import {
  initialCheckTheme,
  toggleNightMode,
} from "../../../src/store/slices/nightModeSlice";
import useTranslation from "next-translate/useTranslation";
import { Drawer } from "../../Drawer";
import { useWindowSize } from "hooks/useWindowSize";
import { Search } from "sections/Search";
import { LanguageList } from "src/helpers/corearray";
import { DEFAULT_IMAGE } from "src/helpers/coreconstants";

export default function Account({ setting }: any) {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { disConnectWallet } = useWallet();
  const { asPath, locale, reload, push } = useRouter();
  const { active } = useWeb3React();

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const showSidebar = useSelector(
    (state: RootState) => state.sidebar.showSidebar
  );
  const nightMode = useSelector(
    (state: RootState) => state.nightMode.nightMode
  );
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = () => setShowMenu(!showMenu);
  // const [nightMode, setNightMode] = useState(false)

  const ToggleNightMode = () => dispatch(toggleNightMode());
  const InitialCheckTheme = () => dispatch(initialCheckTheme());

  // get window size
  const size = useWindowSize();
  useEffect(() => {
    // ToggleNightMode();
    InitialCheckTheme();
  }, []);

  // show search modal
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <>
      <div className="header-right">
        <ul className="header-right-item">
          <li className="user-area">
            <a className={classes.link}>
              <span className={classes.language}>
                {locale?.toLocaleUpperCase()} <FiChevronDown />
              </span>
            </a>

            <ul className={`${classes.subMenuUl} sub-menu-item`}>
              {LanguageList.map((item, index) => (
                <li key={index}>
                  <Link href={asPath} locale={item.value}>
                    <a className="py-1">{item.name}</a>
                  </Link>
                </li>
              ))}

              {/* <li>
                <Link href={asPath} locale="es">
                  <a className="py-1">{t("Español")}</a>
                </Link>
              </li> */}
            </ul>
          </li>

          <li className="user-area">
            {size.width <= 1024 ? (
              <a className={classes.link}>
                <img
                  src={
                    userData.profile_img
                      ? userData.profile_img
                      : DEFAULT_IMAGE.USER
                  }
                  alt={userData.username ? userData.username : "mrfox"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevent looping
                    currentTarget.src = DEFAULT_IMAGE.USER;
                  }}
                  className={classes.profileImage}
                />
              </a>
            ) : (
              <Link href={"/profile"}>
                <a className={classes.link}>
                  <img
                    src={
                      userData.profile_img
                        ? userData.profile_img
                        : DEFAULT_IMAGE.USER
                    }
                    alt={userData.username ? userData.username : "mrfox"}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevent looping
                      currentTarget.src = DEFAULT_IMAGE.USER;
                    }}
                    className={classes.profileImage}
                  />
                </a>
              </Link>
            )}

            <ul className="sub-menu-item">
              <li>
                <Link href={absPath("profile")}>
                  <a>
                    <i className="fas fa-user mr-3" /> {t("Profile")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=favorite-item">
                  <a>
                    <i className="fas fa-heart mr-3"></i> {t("Favorites")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={absPath("watchlist")}>
                  <a>
                    <i className="fas fa-eye mr-3" /> {t("Watchlist")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={absPath("settings")}>
                  <a>
                    <i className="fas fa-cog mr-3" /> {t("Settings")}
                  </a>
                </Link>
              </li>

              <li>
                <Link href={absPath("collections")}>
                  <a>
                    <i className="fas fa-clipboard-list mr-3" />{" "}
                    {t("My Collections")}
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href={absPath("profile?tab=favorite-item")}>
                  <a>
                    <i className="fas fa-heart mr-3" />
                    {t("Favorite Items")}
                  </a>
                </Link>
              </li> */}

              {walletConnected(active) && (
                <li>
                  <button type="button" onClick={disConnectWallet}>
                    {" "}
                    <FiLogOut className="mr-3" />
                    {t("Logout")}
                  </button>
                </li>
              )}

              <li>
                <div onClick={ToggleNightMode} className={classes.nightButton}>
                  <span className={classes.nightButtonText}>
                    <i className="fas fa-moon mr-3" /> {t("Night Mode")}{" "}
                  </span>
                  <span className={classes.switch}>
                    <HeadLessSwitch
                      enabled={nightMode}
                      setEnabled={() => ToggleNightMode}
                    />
                  </span>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <a
              className={classes.link}
              onClick={() => dispatch(setShowSidebar(true))}
            >
              <IoWalletOutline aria-label="wallet" />
            </a>
          </li>

          {/* search button */}
          <li>
            <button
              type="button"
              className={
                "bg-transparent border-0 m-0 p-0 " + classes.panelButton
              }
              onClick={toggleSearch}
            >
              <FiSearch aria-label="Search form" />
            </button>
          </li>

          <li>
            <button
              className="menu-toggle"
              onClick={handleToggleMenu}
              aria-label="toggle menu bar"
            >
              <FiAlignJustify aria-label="Menu toggle bar" />
            </button>
          </li>
        </ul>
      </div>

      {/* nav for mobile */}
      <Drawer
        show={showMenu}
        onClose={handleToggleMenu}
        setting={setting}
        onRightSide
      >
        <NavForMobile onClose={handleToggleMenu} setting={setting} />
      </Drawer>

      {/* wallet side bar */}
      {showSidebar && (
        <HeadlessSidebar
          title="My Wallet"
          show={showSidebar}
          onClose={() => dispatch(setShowSidebar(false))}
        >
          {walletConnected(active) ? <Connected /> : <NotConnected />}
        </HeadlessSidebar>
      )}

      {/* search box */}
      <Search
        show={showSearch}
        query={query}
        setQuery={setQuery}
        onClose={() => {
          toggleSearch();
          setQuery("");
        }}
      />
    </>
  );
}

{
  /* <div
          className={`${classes.slideMenu} ${showMenu ? classes.slideShow : ""
            }`}
        >
          <div className={"container " + classes.slideMenuHeader}>
            <Link href={"/"}>
              <a>
                <img src="/assets/images/logo.png" alt="NFT Logo" />
              </a>
            </Link>

            <button type="button" onClick={handleToggleMenu}>
              <FiX />
            </button>
          </div>

          <NavForMobile />

          <SocialLinks />
        </div> */
}
//lang ok
