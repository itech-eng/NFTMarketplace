import { getCookies } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import { NoItems } from "../../../components/NoItems";
import BasicLayout from "../../../layouts/basic.layout";
import ErrorPageSection from "../../../sections/404";
import { FixedPriceSection } from "../../../sections/Asset/AssetSell/FixedPrice";
import { PreviewItem } from "../../../sections/Asset/AssetSell/PreviewItem";
import classes from "../../../sections/Asset/AssetSell/sell.module.css";
import { TimedAuctionSection } from "../../../sections/Asset/AssetSell/TimedAuction";
import BreadCrumbSection from "../../../sections/BreadCrumbSection";
import {
  BLOCKCHAIN_STATUS_ACTIVE,
  BLOCKCHAIN_STATUS_INACTIVE,
  PAYMENT_TOKEN_TYPE_NATIVE_COIN,
  PAYMENT_TOKEN_TYPE_TOKEN,
} from "../../../src/helpers/coreconstants";
import {
  getItemDetailsBySlugOrTokenId,
  getItemsTokens,
  getSettingsData,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";
import { NextPageWithLayout } from "../../../src/types";

const SellAsset: NextPageWithLayout = ({
  data,
  tokenList,
  error,
  settings,
}: any) => {
  const metadata = {
    page_title: `Sell ${data?.name}`,
    name: data?.name,
    description: data?.description,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [type, setType] = useState("fixed");
  const [itemPrice, setItemPrice] = useState("");
  const [itemError, setItemError] = useState<any>(null);

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const isListed = data?.active_sell;
  const blockchainStatus: number = data?.collection?.blockchain?.status;
  const isOwner = userData?.wallet_address === data?.owner?.wallet_address;

  useEffect(() => {
    if (isListed) {
      setItemError(t("This item has already been listed for sale."));
    } else if (blockchainStatus !== BLOCKCHAIN_STATUS_ACTIVE) {
      setItemError(
        <>
          {t(
            "This item's blockchain is not active. This item cannot be listed now."
          )}
        </>
      );
    } else if (!isOwner) {
      setItemError(t("You do not own this item."));
    } else {
      setItemError(null);
    }
  }, [blockchainStatus, isListed, isOwner]);

  // tokens
  const [selectedToken, setSelectedToken] = useState(tokenList && tokenList[0]);

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection parent="Assets" title={data?.name} />

      <div className="section">
        <div className="container">
          {error && <ErrorPageSection title={error} />}

          {userData?.wallet_address ? (
            itemError && (
              <NoItems
                title={
                  <small className="text-danger">
                    <FiAlertCircle className="mr-3" />

                    {itemError}
                  </small>
                }
              />
            )
          ) : (
            <div style={{ display: "grid", placeItems: "center" }}>
              <LoadingCircles />
            </div>
          )}

          {!error &&
            isOwner &&
            !isListed &&
            blockchainStatus !== BLOCKCHAIN_STATUS_INACTIVE && (
              <div className="row g-5 justify-content-between">
                <div className="col-md-7 col-xl-7">
                  <div className={classes.listItem}>
                    <h4>{t("List item for sale")}</h4>

                    <div className={classes.type}>
                      <div className={classes.titleWrapper}>
                        <p>{t("Type")}</p>
                      </div>

                      <div className={classes.typeOptions}>
                        <button
                          className={`${classes.fixedPrice} ${
                            type === "fixed" ? classes.active : classes.deactive
                          }`}
                          onClick={() => setType("fixed")}
                        >
                          <span>
                            {" "}
                            <FaDollarSign />
                          </span>

                          <span className={classes.typeName}>
                            {t("Fixed Price")}
                          </span>
                        </button>

                        <button
                          className={`${classes.timedAuction} ${
                            type === "timed" ? classes.active : classes.deactive
                          }`}
                          onClick={() => setType("timed")}
                        >
                          <span>
                            <FaClock />{" "}
                          </span>
                          <span className={classes.typeName}>
                            {t("Timed Auction")}
                          </span>
                        </button>
                      </div>
                    </div>

                    {type === "fixed" && (
                      <FixedPriceSection
                        item={data}
                        type={type}
                        tokenList={tokenList.filter(
                          (token: any) =>
                            token.type === PAYMENT_TOKEN_TYPE_NATIVE_COIN
                        )}
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
                        itemPrice={itemPrice}
                        setItemPrice={setItemPrice}
                      />
                    )}

                    {type === "timed" && (
                      <>
                        <TimedAuctionSection
                          item={data}
                          type={type}
                          tokenList={tokenList.filter(
                            (token: any) =>
                              token.type === PAYMENT_TOKEN_TYPE_TOKEN
                          )}
                          selectedToken={selectedToken}
                          setSelectedToken={setSelectedToken}
                          itemPrice={itemPrice}
                          setItemPrice={setItemPrice}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="col-md-5 col-xl-4">
                  <PreviewItem
                    item={data}
                    selectedToken={selectedToken}
                    price={itemPrice}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const slugOrTokenId = context.params.slug;
  const user_wallet_address = getCookies(context).wallet_address;

  try {
    const lang = context.locale || "en";
    const settings: any = await getSettingsData(
      [
        SETTINGS_GROUP_FOOTER,
        SETTINGS_GROUP_GENERAL,
        SETTINGS_GROUP_LOGO,
        SETTINGS_GROUP_SOCIAL,
      ],
      {
        lang: lang,
      }
    );

    const data = await getItemDetailsBySlugOrTokenId(
      slugOrTokenId,
      user_wallet_address,
      context.req,
      context.req
    );

    // get tokens list
    const itemId = data.id;
    const tokens = await getItemsTokens(itemId);
    const tokenList = tokens.map((el: any) => ({
      ...el,
      value: el.id,
    }));

    return {
      props: {
        slug: slugOrTokenId,
        data: data,
        tokenList: tokenList,
        settings,
      },
    };
  } catch (err: any) {
    return {
      props: {
        slug: slugOrTokenId,
        data: null,
        tokenList: null,
        error: err.message,
      },
    };
  }
}

export default SellAsset;
//lang ok
