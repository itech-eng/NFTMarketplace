import classes from "./AssetDashboard.module.css";
import { useEffect, useState } from "react";
import { FiFilter, FiRefreshCcw, FiX } from "react-icons/fi";
import { DashboardContainer } from "components/DashboardContainer";
import { DashboardContent } from "components/DashboardContainer/DashboardContent";
import { DashboardSidebar } from "components/DashboardContainer/DashboardSidebar";
import { DrawerButtonForMobile } from "components/DrawerButtonForMobile";
import { FilterButtonContent } from "components/FilterButtonContent";
import { FilterCategories } from "components/Filters/FilterCategories";
import { FilterChains } from "components/Filters/FilterChains";
import { FilterCollections } from "components/Filters/FilterCollections";
import { FilterOnSaleIn } from "components/Filters/FilterOnSaleIn";
import { FilterPrice } from "components/Filters/FilterPrice";
import { FilterStatus } from "components/Filters/FilterStatus";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { handleRemoveFilterData } from "src/helpers/functions";
import { FilterItemType } from "src/types";
import { Drawer } from "../../../components/Drawer";
import { ItemCard } from "../../../components/ItemCard";
import { ItemLoaderButton } from "../../../components/Loader/ItemLoaderButton";
import { NoItems } from "../../../components/NoItems";
import { useInfiniteGetItemListsQuery } from "../../../src/graphql/generated";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import { SortingMenu } from "components/SearchFilterBar/SortingMenu";
import { FilterButtonRemove } from "components/FilterButtonContent/FilterButtonRemove";
import { SearchFilterBar } from "components/SearchFilterBar";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useRouter } from "next/router";
import { getSearchAccounts, getSearchCollections } from "src/ssr/data";
import { SearchSliders } from "components/Assets/SearchSliders";
import useTranslation from "next-translate/useTranslation";
import { PAGINATE_NUMBER_ASSETS } from "src/helpers/coreconstants";
import { useDebounce } from "use-debounce";

export const AssetDashboard: any = ({
  customFilter,
  customSidebarHeight,
  collectionId,
  // serverQuery,
  profile,
  settings,
  isSidebarOpen = false,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const router = useRouter();
  const { query: serverQuery }: any = router.query;
  const route = router.asPath.split("?")[0];

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const [isSidebarExtended, setIsSidebarExtended] = useState(isSidebarOpen);
  const [showDrawer, setShowDrawer] = useState(false);
  const [fixedSidebar, setFixedSidebar] = useState(false);
  const height: number = customSidebarHeight ? customSidebarHeight : 280;
  const handleScroll = () =>
    window.scrollY > height ? setFixedSidebar(true) : setFixedSidebar(false);

  // sorting
  const [sort, setSort] = useState({
    field: "id",
    direction: "desc",
  });

  const [query, setQuery] = useState(serverQuery ? serverQuery : null);
  const [queryArr, setQueryArr] = useState(query ? query?.split() : []);
  const [debouncedText] = useDebounce(serverQuery ? serverQuery : query, 500);

  // query call for collections and accounts
  const [searchedCollections, setSearchedCollections] = useState<null | any[]>(
    null
  );
  const [searchedAccounts, setSearchedAccounts] = useState<null | any[]>(null);

  useEffect(() => {
    // setQuery(serverQuery);
    setQueryArr(serverQuery ? serverQuery?.split() : []);

    if (serverQuery) {
      getSearchCollections(10, debouncedText, 5, true).then((res) =>
        setSearchedCollections(res.map((el: any) => el.node))
      );

      getSearchAccounts(10, debouncedText, 5, true).then((res) =>
        setSearchedAccounts(res.map((el: any) => el.node))
      );
    }

    if (!serverQuery) {
      setSearchedCollections([]);
      setSearchedAccounts([]);
    }
  }, [serverQuery, query, debouncedText]);
  // console.log(searchedAccounts);

  // side bar filters
  const [selectedTokens, setSelectedTokens] = useState<FilterItemType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilterItemType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    FilterItemType[]
  >([]);
  const [selectedCollections, setSelectedCollections] = useState<
    FilterItemType[]
  >(collectionId ? [] : []);
  const [selectedChains, setSelectedChains] = useState<FilterItemType[]>([]);
  const [prices, setPrices] = useState<any[]>([]);

  // to remove the falsy values from the array
  prices.map((el) =>
    Object.keys(el).forEach((key) => {
      if (!el[key]) {
        delete el[key];
      }
    })
  );

  const allFilters = [
    ...selectedTokens,
    ...selectedStatus,
    ...selectedCategories,
    ...selectedCollections,
    ...selectedChains,
    ...prices,
    ...queryArr,
  ];

  // console.log(allFilters);

  const handleAllFilterClear = () => {
    setSelectedTokens([]);
    setSelectedStatus([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedChains([]);
    setPrices([]);
    setQueryArr([]);
    setQuery("");
    setSearchedCollections([]);
    setSearchedAccounts([]);
    if (serverQuery) {
      setSearchedCollections([]);
      setSearchedAccounts([]);
      router.push(route);
    }
  };
  // useEffect(() => {
  //   console.log(query, "queryqueryqueryqueryqueryquery");
  // }, [query]);
  // get data of collections in paginate
  const {
    data: assets,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteGetItemListsQuery(
    {
      first: PAGINATE_NUMBER_ASSETS,
      after: undefined,
      viewer_id: userData?.id,
      status: selectedStatus.length ? selectedStatus.map((el) => el.id) : null,
      payment_token_id: selectedTokens.length
        ? selectedTokens.map((el) => el.id)
        : null,
      min_price: prices[0] ? prices[0].minPrice : null,
      max_price: prices[0] ? prices[0].maxPrice : null,
      collection_id:
        !customFilter && selectedCollections.length
          ? selectedCollections.map((el) => el.id)
          : collectionId
          ? collectionId
          : null,
      blockchain_id: selectedChains.length
        ? selectedChains.map((el) => el.id)
        : null,
      category_id: selectedCategories.length
        ? selectedCategories.map((el) => el.id)
        : null,
      //@ts-ignore
      orderBy: sort,
      query: debouncedText,
    },

    {
      getNextPageParam: (p) => {
        if (p.getItemLists.pageInfo.hasNextPage) {
          return {
            first: PAGINATE_NUMBER_ASSETS,
            after: p.getItemLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalItems: any = assets?.pages[0].getItemLists?.totalCount;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function FilterVisivility(obj: any, status: boolean) {
    if (obj) {
      return Object?.keys(obj)?.length === 0 || status === true ? true : false;
    } else {
      return true;
    }
  }

  return (
    <>
      <DashboardContainer fixedSidebar={fixedSidebar}>
        <DashboardSidebar
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
          onClick={() => setIsSidebarExtended(!isSidebarExtended)}
        >
          {FilterVisivility(customFilter, customFilter?.FilterStatus) && (
            <FilterStatus
              selected={selectedStatus}
              setSelected={setSelectedStatus}
            />
          )}

          {FilterVisivility(customFilter, customFilter?.FilterOnSaleIn) && (
            <FilterOnSaleIn
              selected={selectedTokens}
              setSelected={setSelectedTokens}
              collectionId={collectionId}
            />
          )}

          {FilterVisivility(customFilter, customFilter?.FilterPrice) && (
            <FilterPrice prices={prices} setPrices={setPrices} />
          )}
          {FilterVisivility(customFilter, customFilter?.FilterCollections) && (
            <FilterCollections
              selected={selectedCollections}
              setSelected={setSelectedCollections}
            />
          )}
          {FilterVisivility(customFilter, customFilter?.FilterChains) && (
            <FilterChains
              selected={selectedChains}
              setSelected={setSelectedChains}
            />
          )}

          {FilterVisivility(customFilter, customFilter?.FilterCategories) && (
            <FilterCategories
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
          )}
        </DashboardSidebar>

        <DashboardContent
          fixedSidebar={fixedSidebar}
          isSidebarExtended={isSidebarExtended}
        >
          {/* Button to show the side bar drawer in responsiveness */}
          <DrawerButtonForMobile
            onClick={() => setShowDrawer(true)}
            fixedSidebar={fixedSidebar}
          />
          {/* collections are here */}
          {searchedCollections && searchedCollections.length > 0 && (
            <SearchSliders
              collections={searchedCollections}
              isSidebarExtended={isSidebarExtended}
            />
          )}
          {/* accounts are here */}
          {searchedAccounts && searchedAccounts.length > 0 && (
            <SearchSliders
              acc={true}
              collections={searchedAccounts}
              isSidebarExtended={isSidebarExtended}
            />
          )}
          {customFilter && (
            <SearchFilterBar
              setSort={setSort}
              query={query}
              setQuery={setQuery}
            />
          )}
          {/* Sorting & Refresh */}
          <div className={classes.contentHeader}>
            <div className={classes.contentHeaderRefresh}>
              <RcTooltip overlay={t("Refresh")}>
                <button
                  type="button"
                  aria-label="refresh"
                  onClick={() => refetch()}
                >
                  <FiRefreshCcw aria-label="refresh" />
                </button>
              </RcTooltip>

              <p className="m-0">
                {isRefetching || isLoading ? (
                  t("Loading Items...")
                ) : (
                  <>
                    {totalItems} {totalItems > 1 ? t("items") : t("item")}
                  </>
                )}
              </p>
            </div>

            <div></div>

            {!customFilter && (
              <SortingMenu setSort={setSort} className={classes.sortSelect} />
            )}
          </div>
          {/* {JSON.stringify(searchedCollections)} */}
          {/* Show Filters */}
          {allFilters.length > 0 ? (
            <FilterButtonContent onClear={handleAllFilterClear}>
              {queryArr.map((el: any, idx: number) => (
                <FilterButtonRemove
                  key={idx}
                  title={el}
                  onClick={() => {
                    setQuery("");
                    setQueryArr([]);
                    setSearchedCollections([]);
                    setSearchedAccounts([]);
                    router.push(route);
                  }}
                />
              ))}

              {selectedStatus.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedStatus,
                      setSelectedStatus
                    )
                  }
                />
              ))}

              {selectedTokens.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedTokens,
                      setSelectedTokens
                    )
                  }
                />
              ))}

              {prices.map((el, idx) => (
                <>
                  {el.minPrice && el.maxPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.minPrice + " - " + el.maxPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : el.minPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.minPrice && "> " + el.minPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : el.maxPrice ? (
                    <FilterButtonRemove
                      key={idx}
                      title={`Price: ${el.maxPrice && "< " + el.maxPrice}`}
                      onClick={() => setPrices([])}
                    />
                  ) : null}
                </>
              ))}

              {selectedCollections.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedCollections,
                      setSelectedCollections
                    )
                  }
                />
              ))}

              {selectedChains.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedChains,
                      setSelectedChains
                    )
                  }
                />
              ))}

              {selectedCategories.map((el, idx) => (
                <FilterButtonRemove
                  key={el.id + el.title + idx}
                  title={el.title}
                  onClick={() =>
                    handleRemoveFilterData(
                      el,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
              ))}
            </FilterButtonContent>
          ) : null}
          {isLoading && (
            <div className="mt-5 text-center">
              <LoadingCircles />
            </div>
          )}
          {error && <NoItems title={t("Something went wrong!")} />}
          {isSuccess && totalItems === 0 ? (
            <div className="vh-100">
              <NoItems title={t("No items to display")} />
            </div>
          ) : (
            <div className={classes.items}>
              {assets?.pages?.map((page) => {
                return page.getItemLists.edges?.map((item) => (
                  <ItemCard key={item.node.id} item={item.node} />
                ));
              })}

              <ItemLoaderButton
                controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
              />
            </div>
          )}
        </DashboardContent>
      </DashboardContainer>

      {/* bring the sidebar contents here too for responsiveness */}
      <Drawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        setting={settings}
      >
        {FilterVisivility(customFilter, customFilter?.FilterStatus) && (
          <FilterStatus
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
        )}
        {FilterVisivility(customFilter, customFilter?.FilterOnSaleIn) && (
          <FilterOnSaleIn
            selected={selectedTokens}
            setSelected={setSelectedTokens}
            collectionId={collectionId}
          />
        )}

        {FilterVisivility(customFilter, customFilter?.FilterPrice) && (
          <FilterPrice prices={prices} setPrices={setPrices} />
        )}
        {FilterVisivility(customFilter, customFilter?.FilterCollections) && (
          <FilterCollections
            selected={selectedCollections}
            setSelected={setSelectedCollections}
          />
        )}
        {FilterVisivility(customFilter, customFilter?.FilterChains) && (
          <FilterChains
            selected={selectedChains}
            setSelected={setSelectedChains}
          />
        )}

        {FilterVisivility(customFilter, customFilter?.FilterCategories) && (
          <FilterCategories
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        )}
      </Drawer>
    </>
  );
};
//lang ok
