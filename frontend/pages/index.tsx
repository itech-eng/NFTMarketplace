import { NextPageWithLayout } from "../src/types";
import BasicLayout from "../layouts/basic.layout";
import HeroBannerSection from "../sections/Home/HeroBanner";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import CategorySection from "../sections/Home/Category";
import HowToUseSection from "../sections/Home/HowTo/index";
import SellOffers from "../sections/Home/SellOffer";
import Introduction from "sections/Home/Introduction";
import { HomeAsset } from "sections/Home/Assets";
import Resources from "sections/Home/Resources";
import { getSettingsData } from "src/ssr/data";
import {
  SETTINGS_GROUP_FOOTER,
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_HOMEPAGE,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_SOCIAL,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_SLUG_BANNER_DESCRIPTION,
  SETTINGS_SLUG_BANNER_IMAGE,
  SETTINGS_SLUG_BANNER_TITLE,
} from "src/helpers/slugcontanst";
import TrendingCollectionSection from "sections/Home/TrendingCollection";
import useTranslation from "next-translate/useTranslation";
import { HeroSection } from "sections/Home/HeroBanner/HeroSection";
import { BrowseByCategory } from "sections/Home/Category/BrowseByCategory";
import { TopCollectionSection } from "sections/Home/TopCollection";
import {
  useGetFeaturedCollectionListQuery,
  useGetRankingListQuery,
} from "src/graphql/generated";
import { useEffect, useState } from "react";
import {
  DAYS_THIRTY_DAYS,
  DEFAULT_IMAGE,
  RANKING_LIST_LIMIT_FOR_HOMEPAGE,
} from "src/helpers/coreconstants";
import { FeaturedCollections } from "sections/Home/FeaturedCollections/FeaturedCollections.section";
import { useWindowSize } from "hooks/useWindowSize";

const Home: NextPageWithLayout = ({ data }: any) => {
  const { t } = useTranslation("common");

  const { settings } = data;
  const metadata = {
    page_title: t("Home"),
    title: (settings && settings[SETTINGS_SLUG_BANNER_TITLE]) || t("Welcome!"),
    description:
      (settings && settings[SETTINGS_SLUG_BANNER_DESCRIPTION]) ||
      t(
        "The NFT can be associated with particular digital files such as photos, videos, audio, or any physical asset. It will be the certification of ownership of the asset."
      ),
    url: "/",
    image:
      (settings && settings[SETTINGS_SLUG_BANNER_IMAGE]) ||
      process.env.NEXT_PUBLIC_BASE_URL + DEFAULT_IMAGE.HERO,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  // top collections - ranking list
  const [blockchainId, setBlockchainId] = useState<any>(0);
  const [days, setDays] = useState<any>(DAYS_THIRTY_DAYS);

  // const { width } = useWindowSize();

  // const rankingItemsToFetch =
  //   width >= 1240 && width <= 1659
  //     ? RANKING_LIST_LIMIT_FOR_HOMEPAGE.ITEMS_FIFTEEN
  //     : RANKING_LIST_LIMIT_FOR_HOMEPAGE.ITEMS_SIXTEEN;

  const {
    data: rankingListQuery,
    isLoading,
    error,
    isSuccess,
  } = useGetRankingListQuery({
    blockchain_id: blockchainId,
    days: days,
    limit: RANKING_LIST_LIMIT_FOR_HOMEPAGE.ITEMS_SIXTEEN,
  });

  // const totalRankingItems = rankingListQuery?.getRankingList?.length;
  // const [isTopCollectionRendered, setIsTopCollectionRendered] = useState(false);
  // useEffect(() => {
  //   if (totalRankingItems) setIsTopCollectionRendered(true);
  // }, [totalRankingItems]);

  // featured collections
  const {
    data: featuredCollectionListQuery,
    isLoading: featuredLoading,
    error: featuredError,
    isSuccess: featuredIsSuccess,
  } = useGetFeaturedCollectionListQuery();

  // const totalFeaturedCollectionListItems =
  //   featuredCollectionListQuery?.getFeaturedCollectionList?.length;
  // const [isFeaturedCollectionRendered, setIsFeaturedCollectionRendered] =
  //   useState(false);

  // useEffect(() => {
  //   if (totalFeaturedCollectionListItems) setIsFeaturedCollectionRendered(true);
  // }, [totalFeaturedCollectionListItems]);

  return (
    <>
      <BasicLayout data={settings}>
        <MetaHeadSection metadata={metadata} />

        {/* <MetaHeadIndividualSection metadata={metadata} /> */}

        <HeroSection homePageSettings={settings} />
        {/* <HeroBannerSection homePageSettings={settings} /> */}

        {/* featured Collections */}
        {/* {isFeaturedCollectionRendered || totalFeaturedCollectionListItems ? ( */}
        <FeaturedCollections
          homePageSettings={settings}
          queryData={{
            isLoading: featuredLoading,
            error: featuredError,
            isSuccess: featuredIsSuccess,
            featuredCollectionListQuery,
          }}
        />
        {/* ) : null} */}

        {/* top collection */}
        {/* {isTopCollectionRendered || totalRankingItems ? ( */}
        <TopCollectionSection
          homePageSettings={settings}
          days={days}
          setDays={setDays}
          setBlockchainId={setBlockchainId}
          queryData={{ isLoading, error, isSuccess, rankingListQuery }}
        />
        {/* ) : null} */}

        {/* trending */}
        {/* <TrendingCollectionSection homePageSettings={settings} /> */}

        <HomeAsset homePageSettings={settings} />

        {/* <CategorySection homePageSettings={settings} /> */}
        <BrowseByCategory homePageSettings={settings} />

        {/* <HowToUseSection homePageSettings={settings} /> */}

        <Resources homePageSettings={settings} />

        <SellOffers home={true} homePageSettings={settings} />

        {/* <Introduction homePageSettings={settings} /> */}
      </BasicLayout>

      {/* 
      
      <LiveAuctionSection />
      <TopAuthorsSection /> */}
    </>
  );
};

export async function getServerSideProps(context: any) {
  // const wallet_address = getCookie("wallet_address", { req, res }) ?? null;
  // console.log("wallet: ", wallet_address);
  const { req, res } = context;
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [
      SETTINGS_GROUP_HOMEPAGE,
      SETTINGS_GROUP_FOOTER,
      SETTINGS_GROUP_GENERAL,
      SETTINGS_GROUP_LOGO,
      SETTINGS_GROUP_SOCIAL,
    ],
    {
      lang: lang,
    }
  );

  const data = {
    settings,
  };
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

export default Home;
//lang ok
