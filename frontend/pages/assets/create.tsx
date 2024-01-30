import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import { Alert } from "../../components/Alert";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import { NoItems } from "../../components/NoItems";
import BasicLayout from "../../layouts/basic.layout";
import ErrorPageSection from "../../sections/404";
import { CreateItemForm } from "../../sections/Asset/AssetCreate/Form";
import BreadCrumbSection from "../../sections/BreadCrumbSection";
import { collectionsForItem, getSettingsData } from "../../src/ssr/data";
import { NextPageWithLayout } from "../../src/types";

const CreateAsset: NextPageWithLayout = (props: any) => {
  const { collectionId, collectionListQuery, error, settings } = props.data;

  const checkCollectionByQueryId = collectionListQuery?.filter(
    (el: any) => el.id === Number(collectionId)
  );

  // console.log("collection", collectionListQuery);
  // console.log(collectionListQuery.length, collectionListQuery);
  // console.log("walletAddr: ",  getCookie("wallet_address"));

  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const metadata = {
    page_title: t("Create Item"),
    name: t("Create Item"),
    description: t("Create Item"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("Create new item")}
        title={t("Create Asset")}
        parent="Assets"
      />

      {!error && collectionId && checkCollectionByQueryId?.length === 0 && (
        <Alert
          title={t(
            "Selected collection is unavailable. Select other collections."
          )}
        />
      )}

      <div className="create-item-area section">
        <div className="container">
          {error ? (
            <ErrorPageSection title={error} />
          ) : collectionListQuery?.length === 0 ? (
            <NoItems
              title={
                <span className="text-center">
                  {t("You do not have a valid collection to store a new item.")}{" "}
                  <br /> <br />
                  <Link href={`/collections/create`}>
                    <a> {t("Create a Collection")} </a>
                  </Link>
                </span>
              }
            />
          ) : (
            <>
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="section-title text-center mb-45">
                    <h2 className="title mb-15">{t("Create Asset")}</h2>
                    <p className="sub-title mb-0"></p>
                  </div>
                </div>
              </div>

              <CreateItemForm
                collectionId={collectionId}
                collectionListQuery={collectionListQuery}
              />
            </>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
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
    const collectionId = context.query.collectionId ?? null;
    const collectionListQuery = await collectionsForItem(
      getCookie("wallet_address", {
        req: context.req,
        res: context.res,
      })?.toString() || "",
      context.req,
      context.res
    );

    const data = {
      settings,
      collectionId: collectionId,
      collectionListQuery: collectionListQuery,
    };

    // Rest of `getServerSideProps` code
    return { props: { data } };
  } catch (err: any) {
    const data = {
      collectionId: null,
      collectionListQuery: null,
      error: err.message,
    };
    return { props: { data } };
  }
}

export default CreateAsset;
//lang ok
