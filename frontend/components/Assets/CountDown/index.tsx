import useTranslation from "next-translate/useTranslation";
import Countdown, { zeroPad } from "react-countdown";
import classes from "./Countdown.module.css";

export const CountdownTimer = ({ endDate }: any) => {
  const { t } = useTranslation("common");

  return (
    <Countdown
      date={endDate}
      onComplete={() => setTimeout(() => window.location.reload(), 1000)}
      renderer={({ total, days, hours, minutes, seconds }) => {
        return total !== 0 ? (
          <div className={classes.countdown}>
            {days > 0 && (
              <div className={classes.countdownSection}>
                <span className={classes.countdownSectionValue}>
                  {zeroPad(days)}
                </span>
                <span className={classes.countdownSectionLabel}>
                  {t("days")}
                </span>
              </div>
            )}

            <div className={classes.countdownSection}>
              <span className={classes.countdownSectionValue}>
                {zeroPad(hours)}
              </span>
              <span className={classes.countdownSectionLabel}>
                {t("hours")}
              </span>
            </div>

            <div className={classes.countdownSection}>
              <span className={classes.countdownSectionValue}>
                {zeroPad(minutes)}
              </span>
              <span className={classes.countdownSectionLabel}>
                {t("minutes")}
              </span>
            </div>

            <div className={classes.countdownSection}>
              <span className={classes.countdownSectionValue}>
                {zeroPad(seconds)}
              </span>
              <span className={classes.countdownSectionLabel}>
                {t("seconds")}
              </span>
            </div>
          </div>
        ) : null;
      }}
    />
  );
};
//lang ok
