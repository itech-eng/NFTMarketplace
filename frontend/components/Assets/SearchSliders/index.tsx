import { ImageItem, ImageProfile } from "components/Images";
import { SlickArrowLeft, SlickArrowRight } from "components/Slider";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import { useWindowSize } from "hooks/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { collapseAddress, formatPriceK } from "src/helpers/functions";
import { RootState } from "src/store";
import classes from "./SearchSliders.module.css";
import { Items } from "./items";

export const SearchSliders = ({ acc, collections, isSidebarExtended }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const totalCollections = collections.length;

  const size = useWindowSize();

  const settings: any = {
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    dots: false,
    slidesToShow:
      totalCollections === 1 || (size.width < 1200 && isSidebarExtended)
        ? 1
        : 2,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 768,
        dots: false,

        settings: {
          dots: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <p className={classes.caption}>
        {acc ? t("Account Results") : t("Collection Results")}
      </p>

      <div
        className={
          totalCollections > 1 ? classes.wrapper : classes.wrapperSingleItem
        }
      >
        <Slider {...settings}>
          {collections.map((col: any, idx: number) => (
            <div className={"px-3 "} key={col.id + idx}>
              <Link
                href={`/${acc ? "profile" : "collections"}/${
                  acc ? col.username : col.slug
                }`}
              >
                <a className={classes.card}>
                  {/* header part */}
                  <div className={classes.header}>
                    {acc ? (
                      <ImageProfile src={col.profile_img} alt={col.username} />
                    ) : (
                      <ImageProfile src={col.logo} alt={col.name} />
                    )}

                    <div className={classes.headerInfo}>
                      <h3>{acc ? col.username : col.name}</h3>
                      <p className="m-0">
                        {acc ? (
                          <RcTooltip overlay={col.wallet_address}>
                            {collapseAddress(col.wallet_address)}
                          </RcTooltip>
                        ) : (
                          <>
                            {t("by")}{" "}
                            <span>
                              {userData.username === col.user.username
                                ? t("you")
                                : col.user.username}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* collection info */}
                  {!acc && (
                    <div className={classes.collectionInfo}>
                      <div className={classes.collectionInfoBox}>
                        <p className="m-0">{col?._count?.items || "---"}</p>
                        <span>{col?._count?.items > 1 ? "Items" : "Item"}</span>
                      </div>

                      <div className={classes.collectionInfoBox}>
                        <div className={classes.collectionInfoBoxContent}>
                          <RcTooltip
                            overlay={col?.metadata?.native_token?.token_symbol}
                          >
                            <img
                              src={col?.metadata?.native_token?.logo}
                              alt="token"
                              width={14}
                            />
                          </RcTooltip>

                          {col?.metadata?.floor_price?.native_price
                            ? formatPriceK(
                                Number(
                                  col?.metadata?.floor_price?.native_price
                                ),
                                6
                              )
                            : "---"}
                        </div>
                        {/* <span>
                          {" "}
                          $
                          {formatPriceK(
                            Number(col?.metadata?.floor_price?.usd_price),
                            2
                          )}
                        </span> */}
                        <span>{t("Floor Price")}</span>
                      </div>

                      <div className={classes.collectionInfoBox}>
                        <div className={classes.collectionInfoBoxContent}>
                          <RcTooltip
                            overlay={col?.metadata?.native_token?.token_symbol}
                          >
                            <img
                              src={col?.metadata?.native_token?.logo}
                              alt="token"
                              width={14}
                            />
                          </RcTooltip>

                          {col?.metadata?.volume?.native_price
                            ? formatPriceK(
                                Number(col?.metadata?.volume?.native_price),
                                6
                              )
                            : "---"}
                        </div>
                        {/* <span>
                          {" "}
                          $
                          {formatPriceK(
                            Number(col?.metadata?.volume?.usd_price),
                            2
                          )}
                        </span> */}
                        <span>{t("Volume Traded")}</span>
                      </div>
                    </div>
                  )}

                  {/* collection items */}
                  <Items items={acc ? col.ownedItems : col.items} />
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
//lang ok
