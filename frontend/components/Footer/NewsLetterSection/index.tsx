import Link from "next/link";
import { useSaveNewsLetterSubscriptionMutation } from "src/graphql/generated";
import { absPath } from "../../../src/helpers/functions";
import classes from "./NewsLetterSection.module.css";
import { useToasts } from "react-toast-notifications";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_SLUG_APP_LOGO_LARGE,
  SETTINGS_SLUG_DISCORD_LINK,
  SETTINGS_SLUG_FACEBOOK_LINK,
  SETTINGS_SLUG_INSTAGRAM_LINK,
  SETTINGS_SLUG_TWITTER_LINK,
} from "src/helpers/slugcontanst";

export const NewsLetterSection = ({ setting }: any) => {
  const { t } = useTranslation("common");

  const saveNewsLetterSubscription = useSaveNewsLetterSubscriptionMutation();
  const { addToast } = useToasts();

  const handleNewsletterForm = async (e: any) => {
    try {
      e.preventDefault();
      const response = await saveNewsLetterSubscription.mutateAsync({
        email: e.target.newsletter_email.value,
      });
      if (response.saveNewsLetterSubscription.success) {
        addToast(response.saveNewsLetterSubscription.message, {
          appearance: "success",
        });
      }
      e.target.newsletter_email.value = null;
    } catch (e: any) {
      addToast(e.message, {
        appearance: "error",
      });
    }
  };

  return (
    <div className={classes.singleWidget}>
      <Link href={absPath("")}>
        <a className={classes.brandLogo}>
          {setting && setting[SETTINGS_SLUG_APP_LOGO_LARGE] ? (
            <img
              src={setting && setting[SETTINGS_SLUG_APP_LOGO_LARGE]}
              alt="logo"
            />
          ) : null}
        </a>
      </Link>

      <div className="mb-30">
        <h4 className={classes.newsletterTitle}>
          {t("Subscribe to our newsletter")}
        </h4>

        <form onSubmit={handleNewsletterForm}>
          <div className={classes.newsletterFormGroup}>
            <input
              type="email"
              required
              className={classes.formControl}
              id="newsletter_email"
              name="newsletter_email"
              placeholder={t("Type your email address")}
            />
            <button type="submit" className={classes.newsletterBtn}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>

      <ul className={classes.socialArea}>
        <li>
          <a
            href={setting && setting[SETTINGS_SLUG_TWITTER_LINK]}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a
            href={setting && setting[SETTINGS_SLUG_FACEBOOK_LINK]}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a
            href={setting && setting[SETTINGS_SLUG_INSTAGRAM_LINK]}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a
            href={setting && setting[SETTINGS_SLUG_DISCORD_LINK]}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-discord"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};
//lang ok
