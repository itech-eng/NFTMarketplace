import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_GROUP_SOCIAL,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import { ItemRow } from "../components/ItemRow";
import { ItemLoaderButton } from "../components/Loader/ItemLoaderButton";
import { LoadingCircles } from "../components/Loader/LoadingCircles";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import { NoItems } from "../components/NoItems";
import BasicLayout from "../layouts/basic.layout";
import BreadCrumbSection from "../sections/BreadCrumbSection";
import { useInfiniteGetActiveSellOfferListsQuery } from "../src/graphql/generated";

const SellOffers = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { settings } = data;

  const metadata = {
    page_title: t("Sale Offers"),
    title: t("Sale Offers"),
    description: t("Sale Offers"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    url: "/sell-offers",
  };

  const {
    data: sellOffers,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetActiveSellOfferListsQuery(
    {
      first: 9,
      after: undefined,
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (p) => {
        if (p.getActiveSellOfferLists.pageInfo.hasNextPage) {
          return {
            first: 9,
            after: p.getActiveSellOfferLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
    }
  );

  const totalItems = sellOffers?.pages[0].getActiveSellOfferLists?.totalCount;

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />
      <BreadCrumbSection title={t("Sale Offers")} />

      <section className="section">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title mb-15">{t("Sale Offers")}</h2>
          </div>
          {isLoading && (
            <NoItems
              title={
                <>
                  <LoadingCircles />
                </>
              }
            />
          )}

          {error && <NoItems title={error} />}

          {isSuccess && totalItems === 0 && (
            <NoItems title={t("No items to display")} />
          )}

          {isSuccess && totalItems !== 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead style={{ borderBottom: "1px solid var(--border-4)" }}>
                    <tr>
                      <th className="py-5">{t("Item")}</th>
                      <th className="py-5">{t("Price")}</th>
                      <th className="py-5">{t("Owner")}</th>
                      <th className="py-5">{t("Created At")}</th>
                      <th className="py-5">{t("Expires At")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sellOffers?.pages?.map((page) => {
                      return page.getActiveSellOfferLists.edges?.map((item) => (
                        <ItemRow key={item.node.id} data={item.node} />
                      ));
                    })}
                  </tbody>
                </table>
              </div>

              <ItemLoaderButton
                controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
              />
            </>
          )}
        </div>
      </section>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
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

  const data = {
    settings,
  };
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

export default SellOffers;
//lang ok
