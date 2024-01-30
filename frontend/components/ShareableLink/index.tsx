import { FaTwitter, FaFacebook, FaTelegram } from "react-icons/fa";
import { FiLink2 } from "react-icons/fi";
import classes from "./ShareableLink.module.css";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { absPath } from "src/helpers/functions";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FcCheckmark } from "react-icons/fc";
import { RcTooltip } from "components/Tooltip/rcTooltip";

export const ShareableLink = ({ item }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const url = absPath(`assets/${item?.slug}`);

  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );

  // copy
  const [copied, setCopied] = useState(false);

  const handleCopyListener = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <p className={classes.title}>{t("SHARE")}</p>

      <div className={classes.socialLinksWrapper}>
        <RcTooltip overlay={t("Share on Twitter")}>
          <a
            className={classes.link}
            href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20item%20on%20${settings?.applicationTitle}&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter aria-label={t("twitter")} />
          </a>
        </RcTooltip>

        <RcTooltip overlay={t("Share on Facebook")}>
          <a
            className={classes.link}
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook aria-label={t("facebook")} />{" "}
          </a>
        </RcTooltip>

        <RcTooltip overlay={t("Share on Telegram")}>
          <a
            className={classes.link}
            href={`https://telegram.me/share/url?url=${url}&text=Check%20out%20this%20item%20on%20${settings?.applicationTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram aria-label={t("telegram")} />
          </a>
        </RcTooltip>

        <RcTooltip overlay={t("Copy to clipboard")}>
          <CopyToClipboard text={url} onCopy={handleCopyListener}>
            <button type="button" className={classes.link}>
              {copied ? (
                <FcCheckmark aria-label={t("copied address")} />
              ) : (
                <FiLink2 aria-label={t("copy address")} />
              )}
            </button>
          </CopyToClipboard>
        </RcTooltip>
      </div>
    </>
  );
};
