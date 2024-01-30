import { useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FiCopy, FiEye, FiGlobe, FiSend } from "react-icons/fi";
import classes from "./Info.module.css";
import {
  FiFacebook,
  FiFlag,
  FiMoreVertical,
  FiRefreshCcw,
  FiTwitter,
} from "react-icons/fi";
import { RcTooltip } from "../../../../../components/Tooltip/rcTooltip";
import { FaTelegram, FaTelegramPlane, FaUnlockAlt } from "react-icons/fa";
import { Modal } from "../../../../../components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../src/store";
import {
  BLOCKCHAIN_STATUS_ACTIVE,
  ITEM_MINT_STATUS_DONE,
  ITEM_UNLOCKABLE_TRUE,
} from "../../../../../src/helpers/coreconstants";
import useTranslation from "next-translate/useTranslation";
import { useToasts } from "react-toast-notifications";
import { HiOutlineShare } from "react-icons/hi";
import CopyToClipboard from "react-copy-to-clipboard";
import { ListGroup } from "components/ListGroup";
import { BsHeartFill } from "react-icons/bs";
import { checkOnPageAuthentication, getUnlockableContent } from "src/ssr/data";
import { SETTINGS_SLUG_CONTRACT_EMAIL } from "src/helpers/slugcontanst";
import { useRouter } from "next/router";
import { RiTelegramLine } from "react-icons/ri";

export const Info = ({
  item,
  likeCount,
  viewCount,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const router = useRouter();

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const settings: any = useSelector((state: RootState) => state.settings);

  const myItem = item.owner.id === userData.id;

  const { addToast } = useToasts();
  const url = global.window && window?.location?.href;

  // copy
  const handleCopyListener = () =>
    addToast(t("Copied successfully"), { appearance: "success" });

  const mintedStatus = item?.is_minted;
  const blockchainStatus = item?.collection?.blockchain?.status;

  // all about unlockable content
  const [showUnlockableModal, setShowUnlockableModal] = useState(false);
  const [unlockableText, setUnlockableText] = useState(
    t("Only the owner has the authority to view the unlockable content!")
  );

  const handleUnlockableContent = async () => {
    if (!myItem) {
      addToast(unlockableText, { appearance: "warning" });
    } else {
      try {
        await checkOnPageAuthentication(userData.wallet_address);

        const content = await getUnlockableContent(item.slug);

        setUnlockableText(content);
        setShowUnlockableModal(true);
      } catch (err: any) {
        addToast(err.message, { appearance: "error" });
      }
    }
  };

  return (
    <>
      {/* header */}
      <div className={"mt-5 mt-lg-0 " + classes.header}>
        <Link href={`/collections/${item.collection.slug}`}>
          <a>{item.collection.name}</a>
        </Link>

        <ListGroup hr={true}>
          {/* external_url */}

          {item.external_url && (
            <RcTooltip overlay={t("External Link")} className="list-group-item">
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.button}
              >
                <FiGlobe />
              </a>
            </RcTooltip>
          )}

          {/* refresh */}
          <RcTooltip overlay={t("Refresh")} className="list-group-item">
            {
              <button
                type="button"
                className={`${classes.button}`}
                aria-label={t("Refresh")}
                onClick={() => router.push(router.asPath)}
              >
                <FiRefreshCcw />
              </button>
            }
          </RcTooltip>

          {/* transfer */}
          {myItem &&
            mintedStatus === ITEM_MINT_STATUS_DONE &&
            blockchainStatus === BLOCKCHAIN_STATUS_ACTIVE &&
            item.active_sell === null &&
            (
              <RcTooltip overlay={t("Transfer")} className="list-group-item">
                {
                  <Link href={`/assets/transfer/${item.slug}`}>
                    <a className={` ${classes.button}`} aria-label="transfer">
                      <FiSend />
                    </a>
                  </Link>
                }
              </RcTooltip>
            )}

          {/* share */}
          <Menu>
            <RcTooltip
              overlay={t("Share")}
              className="list-group-item position-relative"
            >
              <Menu.Button as="button" className={`${classes.button}`}>
                <HiOutlineShare aria-label="share button" />
              </Menu.Button>

              <Menu.Items as="div" className={`${classes.dropdownMenu}`}>
                <CopyToClipboard text={url} onCopy={handleCopyListener}>
                  <Menu.Item as="button" className={`${classes.dropdownItem}`}>
                    <FiCopy style={{ color: "#1d7af2" }} />
                    {t("Copy Link")}
                  </Menu.Item>
                </CopyToClipboard>

                <Menu.Item
                  as="a"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${classes.dropdownItem}`}
                >
                  <FiFacebook style={{ color: "#1d7af2" }} />
                  {t("Share on Facebook")}
                </Menu.Item>

                <Menu.Item
                  as="a"
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20item%20on%20${settings?.settings?.applicationTitle}&url=${url}`} // &via=${process.env.APP_NAME} for handler
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${classes.dropdownItem}`}
                >
                  <FiTwitter style={{ color: "#1d9bf0" }} />
                  {t("Share on Twitter")}
                </Menu.Item>

                {/* telegram */}
                <Menu.Item
                  as="a"
                  href={`https://telegram.me/share/url?url=${url}&text=Check%20out%20this%20item%20on%20${settings?.applicationTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${classes.dropdownItem}`}
                >
                  <FaTelegramPlane style={{ color: "#1d9bf0" }} />
                  {t("Share on Telegram")}
                </Menu.Item>
              </Menu.Items>
            </RcTooltip>
          </Menu>

          {/* more */}
          <Menu>
            <RcTooltip
              overlay={t("More")}
              className={`list-group-item position-relative ${classes.lastChild}`}
            >
              <Menu.Button
                as="button"
                type="button"
                className={`${classes.button}`}
              >
                <FiMoreVertical aria-label="more info" />
              </Menu.Button>

              <Menu.Items as="div" className={`${classes.dropdownMenu}`}>
                <a
                  href={`mailto:${
                    settings?.settings &&
                    settings?.settings[SETTINGS_SLUG_CONTRACT_EMAIL]
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Menu.Item
                    as="button"
                    type="button"
                    className={`${classes.dropdownItem}`}
                  >
                    <FiFlag />
                    {t("Report")}
                  </Menu.Item>
                </a>
              </Menu.Items>
            </RcTooltip>
          </Menu>
        </ListGroup>
      </div>

      {/* Name */}
      <h2 className={classes.itemName}>{item.name}</h2>

      <div className={classes.ownerName}>
        <span>
          {t("Owned by")}{" "}
          <Link href={`/profile/${item.owner.username}`}>
            <a> {myItem ? t("you") : item.owner.username}</a>
          </Link>
        </span>

        <div className={classes.ownerStats}>
          <span className={classes.countFavBox}>
            <FiEye /> {viewCount} {t("Views")}
          </span>

          {/* if likeCount is > 0 */}
          {likeCount > 0 && (
            <span className={classes.countFavBox}>
              <BsHeartFill /> {likeCount}{" "}
              {likeCount > 1 ? t("Favourites") : t("Favourite")}
            </span>
          )}
        </div>
      </div>

      <p className={classes.ownerName}>{item.description}</p>

      {/* unlockable section */}

      {item.is_unlockable_content === ITEM_UNLOCKABLE_TRUE && (
        <button
          className={classes.unlockable}
          onClick={handleUnlockableContent}
        >
          <FaUnlockAlt /> {myItem ? t("Reveal") : t("Includes")}{" "}
          {t("unlockable content")}
        </button>
      )}

      <Modal
        show={showUnlockableModal}
        onClose={() => setShowUnlockableModal(false)}
        title="Unlockable Content"
      >
        <div className={classes.unlockableContent}>{unlockableText}</div>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="py-3 px-4 primary-btn"
            onClick={() => setShowUnlockableModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
