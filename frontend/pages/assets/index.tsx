import MetaHeadSection from "components/Meta/MetaHeadSection";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import useTranslation from "next-translate/useTranslation";
import { AssetDashboard } from "sections/Asset/AssetDashboard";
import BreadCrumbSection from "sections/BreadCrumbSection";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import { NextPageWithLayout } from "src/types";

const ExploreAssets: NextPageWithLayout = ({ query, settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const metadata = {
    page_title: t("Explore NFTs"),
    title: t("Explore Assets"),
    description: t("Explore NFT Assets"),
    url: "/assets",
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayoutNoFooter data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("Explore NFT Assets")}
        title={t("Explore Assets")}
        // parent="Assets"
      />

      <div className="section-top">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title">{t("Explore Assets")}</h2>
          </div>
        </div>

        <AssetDashboard
          serverQuery={query}
          settings={settings}
          isSidebarOpen={true}
        />
      </div>
    </BasicLayoutNoFooter>
  );
};

export async function getServerSideProps(context: any) {
  const q = context.query;
  const query = q.query;
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
    {
      lang: lang,
    }
  );
  // Rest of `getServerSideProps` code
  return { props: { query: query || "", settings } };
}

export default ExploreAssets;
//lang ok
