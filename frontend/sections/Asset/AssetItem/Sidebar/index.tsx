import Link from "next/link";
import classes from "./Sidebar.module.css";
import { ProfileDisclosure } from "../../../../components/ProfileDisclosure";
import { AiFillInfoCircle } from "react-icons/ai";
import {
  clearTrailingSlash,
  collapseAddress,
  convertIpfsToHttps,
} from "../../../../src/helpers/functions";
import { HeadlessPopover } from "../../../../components/HUI/HeadlessPopover";
import {
  BsThreeDotsVertical,
  BsLayoutTextSidebarReverse,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";
import { FiAlignLeft, FiFlag } from "react-icons/fi";
import { RiSideBarLine } from "react-icons/ri";
import { RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import { FaUnlockAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Modal } from "../../../../components/Modal";
import { useToasts } from "react-toast-notifications";
import { useItemFavouriteListToggleMutation } from "src/graphql/generated";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { setShowSidebar } from "src/store/slices/walletDrawerSlice";
import { RootState } from "src/store";
import {
  checkItemFavouriteByUser,
  checkOnPageAuthentication,
} from "src/ssr/data";
import dynamic from "next/dynamic";
import { ImageItem, ImageProfile } from "components/Images";
import useTranslation from "next-translate/useTranslation";
import { SETTINGS_SLUG_CONTRACT_EMAIL } from "src/helpers/slugcontanst";
import { DEFAULT_IMAGE } from "src/helpers/coreconstants";
const ThreeDViewer = dynamic(
  // @ts-ignore
  () => import("components/ThreeDViewer").then((mod) => mod),
  { ssr: false }
);

export const Sidebar = ({ item, myItem, likeCount, setLikeCount }: any) => {
  const { t } = useTranslation("common");
  const Settings: any = useSelector((state: RootState) => state.settings);
  // const t = (s: string) => s;
  const { is_unlockable_content, filetype, media_path, thumbnail_path } = item;
  const [showItem, setShowItem] = useState(false);
  const [camera, setCamera] = useState(100);
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { active } = useWeb3React();

  // work for toggle like
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userData.id) {
      const isFav = async () =>
        await checkItemFavouriteByUser(item.id, userData.id);

      isFav().then((res) => setIsLiked(res));
    }
  }, [item.id, userData]);

  const favItemToggleMutation = useItemFavouriteListToggleMutation();

  const handleFavouriteToggle = async () => {
    if (!active) {
      dispatch(setShowSidebar(true));
    } else {
      try {
        await checkOnPageAuthentication(userData.wallet_address, () => {});

        const res = await favItemToggleMutation.mutateAsync({
          item_id: item.id,
        });

        const count = res.itemFavouriteListToggle.count;
        setLikeCount(count);

        const toggle = await checkItemFavouriteByUser(item.id, userData.id);
        setIsLiked(toggle);
      } catch (err: any) {
        addToast(err.message, { appearance: "error" });
      }
    }
  };

  return (
    <>
      {/* Image Container */}

      <div className={classes.imageWrapper}>
        <div className={classes.info}>
          <div className={classes.description}>
            <RcTooltip
              placement="top"
              overlay={`Blockchain: ${item?.collection?.blockchain?.network_name}`}
            >
              <button type="button">
                <ImageItem
                  src={item?.collection?.blockchain?.logo || DEFAULT_IMAGE.ITEM}
                  alt={item?.collection?.blockchain?.network_name}
                  width={25}
                  height={25}
                  className={classes.blockchainLogo}
                  layout={"fixed"}
                />
              </button>
            </RcTooltip>

            {is_unlockable_content ? (
              <RcTooltip
                placement="top"
                overlay={`Includes unlockable content`}
              >
                <button type="button">
                  <FaUnlockAlt
                    style={{ fontSize: 16, color: "var(--text-color-7)" }}
                    aria-label="unlockable content"
                  />
                </button>
              </RcTooltip>
            ) : null}
          </div>

          <span>
            <button
              type="button"
              className={classes.favouriteBtnRed}
              onClick={handleFavouriteToggle}
            >
              <RcTooltip overlay={isLiked ? "Unfavourite" : "Favourite"}>
                {isLiked ? (
                  <BsHeartFill aria-label="unfavourite" />
                ) : (
                  <BsHeart aria-label="favourite" />
                )}
              </RcTooltip>
            </button>

            <span className={classes.likeAmount}>{likeCount}</span>
          </span>
        </div>

        <button
          type="button"
          className={classes.imageContainer}
          onClick={() => setShowItem(true)}
        >
          {filetype === "audio" ? (
            <div className={classes.notImageBox}>
              <ImageItem
                src={thumbnail_path || DEFAULT_IMAGE.ITEM}
                alt={item.name}
              />
              <audio controls>
                <source src={media_path} />
              </audio>
            </div>
          ) : filetype === "video" ? (
            <video controls poster={thumbnail_path} className={classes.video}>
              <source src={media_path} />
            </video>
          ) : filetype === "_3d" ? (
            <div className={classes.itemImageContainer}>
              <ImageItem
                src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
                alt={item.name}
                className={classes.itemImage}
                layout="responsive"
              />
            </div>
          ) : (
            <div className={classes.itemImageContainer}>
              <ImageItem
                src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
                alt={item.name}
                className={classes.itemImage}
                layout="responsive"
              />
            </div>
          )}
        </button>
      </div>

      {/* Disclosures */}
      <div className={classes.disclosureWrapper}>
        {/* <div className={classes.disclosure}>
          <div className={classes.panelButton}>
            <span>
              <FiAlignLeft className="mr-3" /> {t("Description")}
            </span>
          </div>

          <div className={classes.panelBody}>
            {t("Created by")}
            <Link href={`/profile/${item.creator.username}`}>
              <a>
                {" "}
                {item.creator.username == userData.username
                  ? t("you")
                  : item.creator.username}{" "}
              </a>
            </Link>
          </div>
        </div> */}

        <ProfileDisclosure
          title={
            <span>
              <RiSideBarLine className="mr-3" /> {t("About")}{" "}
              {item.collection.name}
            </span>
          }
        >
          <Link href={`/collections/${item.collection.slug}`}>
            <a className={classes.collectionLogo}>
              <ImageItem
                src={item.collection.logo || DEFAULT_IMAGE.ITEM}
                alt={item.collection.name}
                layout="responsive"
              />
            </a>
          </Link>
          <span>
            {t("Created by")}
            <Link href={`/profile/${item.creator.username}`}>
              <a>
                {" "}
                {item.creator.username == userData.username
                  ? t("you")
                  : item.creator.username}{" "}
              </a>
            </Link>
          </span>
          <br></br>

          <span>
            {item.collection.description
              ? item.collection.description
              : t(
                  "This collection has no description yet. Contact the owner of this collection about setting it up on"
                ) + ` ${settings?.application_title || "---"}!`}
          </span>

          <HeadlessPopover
            btnClass={classes.aboutMore}
            btnText={<BsThreeDotsVertical />}
          >
            <a
              href={`mailto:${
                Settings?.settings &&
                Settings.settings[SETTINGS_SLUG_CONTRACT_EMAIL]
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className={classes.reportBtn}>
                <FiFlag className="mr-3" /> {t("Report")}
              </button>
            </a>
          </HeadlessPopover>
        </ProfileDisclosure>

        <ProfileDisclosure
          title={
            <span>
              <BsLayoutTextSidebarReverse className="mr-3" /> {t("Details")}
            </span>
          }
        >
          <p className={classes.detail}>
            <span>{t("Contract Address")}</span>

            {item?.collection?.blockchain?.explorer_url ? (
              <Link
                href={`${clearTrailingSlash(
                  item.collection.blockchain.explorer_url
                )}/address/${item.collection.contract_address}`}
              >
                <a target="_blank" rel="noopener noreferrer">
                  {collapseAddress(item?.collection?.contract_address)}
                </a>
              </Link>
            ) : (
              collapseAddress(item?.collection?.contract_address)
            )}
          </p>

          <p className={classes.detail}>
            <span>{t("Token ID")}</span>

            {item.token_id || "---"}
          </p>

          <p className={classes.detail}>
            <span>{t("Token Standard")}</span>
            ERC-721
          </p>

          <p className={classes.detail}>
            <span>{t("Blockchain")}</span>
            {item.collection.blockchain.network_name}
          </p>

          <p className={classes.detail}>
            <span>{t("Metadata")}</span>
            <a
              href={item?.token_uri ? convertIpfsToHttps(item.token_uri) : ""}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {t("Decentralized")}{" "}
            </a>
          </p>

          <p className={classes.detail}>
            <span>{t("Royalty")}</span>
            {item?.collection?.royalties}%
          </p>
        </ProfileDisclosure>
      </div>

      <Modal show={showItem} onClose={() => setShowItem(false)}>
        {filetype === "_3d" ? (
          <>
            <div className={classes.warningBox}>
              <AiFillInfoCircle />
              <span className="ml-2">{t("Scroll to zoom in and out")}</span>
            </div>
            <div className={classes.modalImageContainer}>
              {/* @ts-ignore */}
              <ThreeDViewer threeSrc={media_path} camera={camera} />
            </div>
          </>
        ) : (
          <ImageProfile
            src={thumbnail_path}
            alt={item.name}
            className={classes.modalImage}
            forModal={true}
            forItem={true}
          />
        )}
      </Modal>
    </>
  );
};
