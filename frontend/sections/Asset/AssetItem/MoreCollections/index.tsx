import Link from "next/link";
import { NoItems } from "../../../../components/NoItems";
import { CgDetailsMore } from "react-icons/cg";
import classes from "./MoreCollection.module.css";
import useTranslation from "next-translate/useTranslation";
import { ItemCard } from "../../../../components/ItemCard";
import { useGetItemListsForAssetDetailsQuery } from "src/graphql/generated";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export const MoreCollection = ({
  collectionId,
  collectionSlug,
  itemId,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const { data, isLoading, isError, error } =
    useGetItemListsForAssetDetailsQuery(
      {
        viewer_id: userData?.id,
        collection_id: collectionId,
        last: 6,
      },
      {
        refetchOnWindowFocus: false,
      }
    );

  const allItems = data?.getItemLists?.edges?.filter(
    (el) => el.node.id !== itemId
  );

  if (allItems && allItems.length > 5) {
    allItems.length = 5;
  }

  // console.log(allItems);

  return (
    <div className={classes.disclosure}>
      <div className={classes.panelButton}>
        <span>
          <CgDetailsMore className="mr-4" />
          {t("More From This Collection")}
        </span>
      </div>

      <div className={classes.panelBody}>
        {isLoading && (
          <NoItems
            title={
              <>
                <LoadingCircles />
              </>
            }
          />
        )}

        {isError && <NoItems title={error} />}

        {!isError && allItems && allItems.length === 0 && (
          <NoItems title={t("No items to display")} />
        )}

        {!isError && allItems && allItems.length > 0 && (
          <div className={classes.collectionWrapper}>
            {allItems.map((item: any) => (
              <ItemCard
                key={item.node.id}
                item={item.node}
                fixedWidth={false}
                widthValue={28}
              />
            ))}
          </div>
        )}
      </div>

      <div className={classes.bottomPanelButton}>
        <Link href={`/collections/${collectionSlug}`}>
          <a className="primary-btn">{t("View Collection")}</a>
        </Link>
      </div>
    </div>
  );
};
//lang ok
