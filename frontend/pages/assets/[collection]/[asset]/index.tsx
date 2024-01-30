import { useState } from "react";
import MetaHeadSection from "../../../../components/Meta/MetaHeadSection";
import AssetItemDummy from "../../../../data/assets.json";
import BasicLayout from "../../../../layouts/basic.layout";
import { ActivityTable } from "../../../../sections/Asset/AssetItem/ActivityTable";
import { MainContent } from "../../../../sections/Asset/AssetItem/MainContent";
import { MoreCollection } from "../../../../sections/Asset/AssetItem/MoreCollections";
import { Sidebar } from "../../../../sections/Asset/AssetItem/Sidebar";
import { TopSection } from "../../../../sections/Asset/AssetItem/TopSection";
import BreadCrumbSection from "../../../../sections/BreadCrumbSection";

import { useSelector } from "react-redux";
import { Loading } from "../../../../components/Loader/Loading";
import { RootState } from "../../../../src/store";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";

const Asset = (props: any) => {
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const [item, setItem] = useState<any>(AssetItemDummy);
  const { collection, asset, settings }: any = props;
  const { t } = useTranslation("common");

  const metadata = {
    page_title: "" + item?.name,
    title: item?.name,
    description: item?.description,
    url: "collections/" + item?.slug,
    image: item?.media_path,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={item?.name}
        title={item?.name ?? t("Asset")}
        parent={item?.collection?.name}
      />

      <div className="section">
        <div className="container">
          {item ? (
            <>
              {userData?.wallet_address === item.currentOwner.walletAddress && (
                <TopSection contractAddress={collection} token={asset} />
              )}

              <div className="row">
                <div className="col-lg-5">
                  <Sidebar
                    item={item}
                    // hasLikeO={hasLikeO}
                    // toggleLike={toggleLike}
                    hasLikeO={44}
                    toggleLike={() => {}}
                  />
                </div>
                <div className="col-lg-7">
                  <MainContent item={item} />
                </div>
                <div className="mt-5 col-12">
                  <ActivityTable item={item} />
                </div>
                <div className="mt-5 col-12">
                  <MoreCollection />
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const collection = context.params.collection;
  const asset = context.params.asset;
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

  // Rest of `getServerSideProps` code
  return { props: { collection, asset, settings } };
}

export default Asset;
