import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
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
import { CreateItemForm } from "../../../sections/Asset/AssetCreate/Form";
import BreadCrumbSection from "../../../sections/BreadCrumbSection";
import { BLOCKCHAIN_STATUS_INACTIVE } from "../../../src/helpers/coreconstants";
import {
  getItemDetailsForEditAsset,
  getSettingsData,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";
import { NextPageWithLayout } from "../../../src/types";

const EditAsset: NextPageWithLayout = ({ data, error, settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const metadata = {
    page_title: t("Update") + " " + data?.name,
    name: t("Name"),
    description: t("Name"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const collectionId = data?.collection.id;

  // data.collection.blockchain.status = 0;

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("Update collection")}
        title={t("Edit Asset")}
        parent={t("Assets")}
      />

      <div className="section">
        <div className="container">
          {error ? (
            <ErrorPageSection title={error} />
          ) : data.collection.blockchain.status ===
            BLOCKCHAIN_STATUS_INACTIVE ? (
            <NoItems
              title={`'${data?.name}' ${t(
                "is not updatable because it's collection's Blockchain status inactive"
              )}`}
            />
          ) : userData.wallet_address && userData.id !== data.owner.id ? (
            <NoItems
              title={`${t("Your account is not authorized to modify the")} '${
                data?.name
              }'.`}
            />
          ) : (
            <>
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="section-title text-center mb-45">
                    <h2 className="title mb-15">
                      {t("update")}{" "}
                      <span style={{ textTransform: "initial" }}>
                        {data.name}
                      </span>
                    </h2>
                    <p className="sub-title mb-0"></p>
                  </div>
                </div>
              </div>

              <CreateItemForm
                collectionId={collectionId}
                itemData={data}
                // collectionListQuery={collectionListQuery}
              />
            </>
          )}
        </div>
      </div>
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
    const data = await getItemDetailsForEditAsset(
      slugOrTokenId,
      context.req,
      context.res
    );

    return { props: { slug: slugOrTokenId, data: data, settings } };
  } catch (err: any) {
    return { props: { slug: slugOrTokenId, error: err.message } };
  }
}

export default EditAsset;
