import { LoadingCircles } from "components/Loader/LoadingCircles";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import {
  BLOCKCHAIN_STATUS_INACTIVE,
  ITEM_IS_MINTED_FALSE,
} from "src/helpers/coreconstants";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import { NoItems } from "../../../components/NoItems";
import BasicLayout from "../../../layouts/basic.layout";
import ErrorPageSection from "../../../sections/404";
import TransferSection from "../../../sections/Asset/TransferSection";
import BreadCrumbSection from "../../../sections/BreadCrumbSection";
import {
  getItemDetailsForTransfer,
  getSettingsData,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";
import { NextPageWithLayout } from "../../../src/types";

const TransferItem: NextPageWithLayout = ({ data, error, settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const metadata = {
    page_title: t("Transfer"),
    title: t("Transfer Nft"),
    description: t("Transfer Nft"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      {error && <ErrorPageSection title={error} />}

      {data && (
        <BreadCrumbSection
          page_title={t("Transfer")}
          parent={t("Assets")}
          title={t("Transfer") + " " + data.name}
        />
      )}

      {data && (
        <div className="section">
          <div className="container">
            <div className="section-title text-center mb-45">
              <h2 className="title mb-15">
                {t("Transfer")}{" "}
                <span
                  style={{
                    textTransform: "initial",
                  }}
                >
                  {data.name}
                </span>
              </h2>
            </div>{" "}
            {!userData.wallet_address ? (
              <div className="text-center">
                <LoadingCircles />
              </div>
            ) : data.owner.wallet_address !== userData.wallet_address ? (
              <NoItems
                title={
                  <span className="text-danger text-center">
                    {t("You do not own this item!")}
                  </span>
                }
              />
            ) : data.active_sell ? (
              <NoItems
                title={
                  <span className="text-danger text-center">
                    {t(
                      "This item is listed for sell. Listed item cannot be transferred."
                    )}
                  </span>
                }
              />
            ) : data.is_minted === ITEM_IS_MINTED_FALSE ? (
              <NoItems
                title={
                  <span className="text-danger text-center">
                    {t(
                      "This item is not minted. Unminted item cannot be transferred."
                    )}
                  </span>
                }
              />
            ) : data.collection.blockchain.status ===
              BLOCKCHAIN_STATUS_INACTIVE ? (
              <NoItems
                title={
                  <span className="text-danger text-center">
                    {t(
                      "This item's blockchain is not active. This item cannot be transferred now."
                    )}
                  </span>
                }
              />
            ) : (
              <TransferSection data={data} />
            )}
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const slugOrTokenId = context.params.slug;

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
    const data = await getItemDetailsForTransfer(
      slugOrTokenId,
      context.req,
      context.res
    );

    return { props: { slug: slugOrTokenId, data: data, settings } };
  } catch (err: any) {
    return { props: { slug: slugOrTokenId, data: null, error: err.message } };
  }
}

export default TransferItem;
