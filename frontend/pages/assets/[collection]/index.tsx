import { useWeb3React } from "@web3-react/core";
import { getCookie, getCookies } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import { Modal } from "../../../components/Modal";
import BasicLayout from "../../../layouts/basic.layout";
import ErrorPageSection from "../../../sections/404";
import { ActivityTable } from "../../../sections/Asset/AssetItem/ActivityTable";
import { MainContent } from "../../../sections/Asset/AssetItem/MainContent";
import { MoreCollection } from "../../../sections/Asset/AssetItem/MoreCollections";
import { Sidebar } from "../../../sections/Asset/AssetItem/Sidebar";
import { TopSection } from "../../../sections/Asset/AssetItem/TopSection";
import {
  getItemDetailsBySlugOrTokenId,
  getSettingsData,
  itemViewCount,
  syncItemOwner,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";

const AssetDetails = ({ slug, data, isNew, error, settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const [isRefetch, setRefetch] = useState(false);
  // sync owner on page load
  useEffect(() => {
    if (data) {
      syncItemOwner(data.id);
      if (getCookie("token")) {
        itemViewCount(data.id, getCookie("token")).then((res) => {
          setViewCount(res.itemViewCount.count);
        });
      }
    }
  }, []); // keep the dependency empty we need to render it only once

  const [likeCount, setLikeCount] = useState(data?.like_count);
  const [viewCount, setViewCount] = useState(data?.view_count);

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const [showNewModal, setShowNewModal] = useState(true);

  const metadata = {
    page_title: data?.name,
    title: data?.name,
    url: "/assets/" + data?.slug,
    description: data?.description,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    image: data?.media_path,
  };

  const myItem = data?.owner?.wallet_address === userData.wallet_address;

  const { active, library, account } = useWeb3React();

  const web3Data = {
    active,
    library,
    account,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      {/* <BreadCrumbSection
        page_title={item?.name}
        title={item?.name ?? "Asset"}
        parent={item?.collection?.name}
      /> */}

      {error && <ErrorPageSection title={error} />}

      {/* section for edit, cancel listing, lower price buttona */}
      {!error && (
        <>
          <TopSection token={slug} myItem={myItem} item={data} />

          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <Sidebar
                    item={data}
                    myItem={myItem}
                    likeCount={likeCount}
                    setLikeCount={setLikeCount}
                  />
                </div>

                <div className="col-lg-7">
                  <MainContent
                    item={data}
                    likeCount={likeCount}
                    viewCount={viewCount}
                    web3Data={web3Data}
                    isRefetch={isRefetch}
                    setRefetch={setRefetch}
                  />
                </div>

                <div className="mt-5 col-12">
                  <ActivityTable
                    item={data}
                    isRefetch={isRefetch}
                    setRefetch={setRefetch}
                  />
                </div>

                <div className="mt-5 col-12">
                  <MoreCollection
                    collectionId={data.collection.id}
                    collectionSlug={data.collection.slug}
                    itemId={data.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isNew && (
        <Modal
          show={showNewModal}
          onClose={() => setShowNewModal(false)}
          title={t("Share Your Item")}
        >
          {t(
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,illum?"
          )}
        </Modal>
      )}
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const slugOrTokenId = context.params.collection;
  const user_wallet_address = getCookies(context).wallet_address;
  const isNew = context.query.new ?? null;

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
      context.res
    );

    return {
      props: { slug: slugOrTokenId, data: data, isNew: isNew, settings },
    };
  } catch (err: any) {
    return { props: { slug: slugOrTokenId, data: null, error: err.message } };
  }
}

export default AssetDetails;
//lang ok
