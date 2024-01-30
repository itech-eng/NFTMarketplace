import { Disclosure } from "@headlessui/react";
import { AssetChart } from "components/Assets/Chart";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiList,
  FiTrendingUp,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "src/helpers/coreconstants";
import { BuyOfferTable } from "../../../../components/Assets/BuyOfferTable";
import { RootState } from "../../../../src/store";
import { Info } from "./Info";
import classes from "./MainContent.module.css";
import { SellInfo } from "./SellInfo";

export const MainContent = ({
  item,
  likeCount,
  viewCount,
  web3Data,
  isRefetch,
  setRefetch,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const checkAuctionDateValidation = () => {
    let diff: any;
    if (item.auctionEndAt !== null)
      diff = Number(new Date(item.auctionEndAt)) - Number(new Date());

    return diff >= 0 ? true : false;
  };

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const myItem = item.owner.wallet_address === userData?.wallet_address;

  const [showSellInfo, setShowSellInfo] = useState(false);

  useEffect(() => {
    if (item?.active_sell) {
      const now = +new Date();
      const start = +new Date(item?.active_sell?.start_date);

      const diff = start - now;

      if (diff >= 0) {
        setTimeout(() => {
          setShowSellInfo(true);
        }, diff);
      }
    }
  }, []);

  const now = +new Date();
  const start = +new Date(item?.active_sell?.start_date);

  const diff = start - now;

  // console.log("bids: ", item.highest_bid, highestBid, highestBidFetched);

  return (
    <>
      <Info item={item} likeCount={likeCount} viewCount={viewCount} />

      {/* Sales Info */}

      {item?.is_minted == STATUS_INACTIVE && (
        <NoItems title={t("Item is not minted yet.")} className="my-3" />
      )}

      {myItem && !item?.active_sell
        ? null
        : item?.is_minted == STATUS_ACTIVE && (
            <SellInfo
              item={item}
              web3Data={web3Data}
              isRefetch={isRefetch}
              setRefetch={setRefetch}
            />
          )}

      {/* Price History */}
      {item?.is_minted == STATUS_ACTIVE && (
        <Disclosure as="div" className={classes.disclosure}>
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span>
                  {" "}
                  <FiTrendingUp className="mr-4" /> {t("Price History")}
                </span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <AssetChart item_id={item?.id} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}

      {/* Offers */}
      {item?.is_minted == STATUS_ACTIVE && (
        <Disclosure
          as="div"
          defaultOpen={true}
          key={new Date().getTime()}
          className={classes.disclosure}
        >
          {({ open }) => (
            <>
              <Disclosure.Button className={classes.panelButton}>
                <span>
                  {" "}
                  <FiList className="mr-4" /> {t("Offers")}
                </span>
                {open ? <FiChevronUp /> : <FiChevronDown />}
              </Disclosure.Button>

              <Disclosure.Panel className={classes.panelBody}>
                <BuyOfferTable
                  item={item}
                  owner={item?.owner}
                  web3Data={web3Data}
                  isRefetch={isRefetch}
                  setRefetch={setRefetch}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
};

{
  /* Listing */
}
{
  /* <Disclosure as="div" className={classes.disclosure}>
        {({ open }) => (
          <>
            <Disclosure.Button className={classes.panelButton}>
              <span>
                {" "}
                <FiTag className="mr-4" /> Listings
              </span>
              {open ? <FiChevronUp /> : <FiChevronDown />}
            </Disclosure.Button>

            <Disclosure.Panel
              className={"table-responsive " + classes.panelBody}
            >
              <table className="table table-hover m-0">
                <thead>
                  <tr>
                    <th className="border-0">Price</th>
                    <th className="border-0">USD Price</th>
                    <th className="border-0">Expiration</th>
                    <th className="border-0">From</th>
                    <th className="border-0"></th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3].map((el) => (
                    <tr key={el}>
                      <td>{el} ETH</td>
                      <td>$405.64</td>
                      <td>in 21 hours</td>
                      <td>
                        <Link href="/">
                          <a>NameOfUser</a>
                        </Link>
                      </td>
                      <td>
                        <button type="button" className="py-2 px-4 primary-btn">
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */
}
//lang ok
