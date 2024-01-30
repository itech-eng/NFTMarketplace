import classes from "./SocialLinks.module.css";
import { useAppSettings } from "../../../../hooks/useAppSettings";

export const SocialLinks = () => {
  const setting = useAppSettings();

  return (
    <ul
      className="social-media-area d-flex justify-content-center position-absolute w-100 "
      style={{ bottom: "1.5rem" }}
    >
      <li>
        <a
          href={setting && setting.twitterUrl ? setting.twitterUrl : ""}
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </li>
      <li>
        <a
          href={setting && setting.facebookUrl ? setting.facebookUrl : ""}
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          aria-label="facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
      </li>
      <li>
        <a
          href={setting && setting.instagramUrl ? setting.instagramUrl : ""}
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          aria-label="instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </li>
      <li>
        <a
          href={setting && setting.githubUrl ? setting.githubUrl : ""}
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          aria-label="github"
        >
          <i className="fab fa-github"></i>
        </a>
      </li>
    </ul>
  );
};
//lang ok
