import classes from "./InputItem.module.css";
import { FiPlus } from "react-icons/fi";
import { Switch } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
export const InputItem = ({
  icon,
  title,
  subtitle,
  openModal,
  hasSwitch,
  showSwitch,
  setShowSwitch,
  children,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className={classes.InputItem}>
      <div className={classes.InputItemCard}>
        <div className={classes.InputItemCardContent}>
          <span className={classes.InputItemCardIcon}>{icon}</span>

          <div>
            <h3 className={classes.InputItemCardTitle}>{title}</h3>
            <div className={classes.InputItemCardSubTitle}>{subtitle}</div>
          </div>
        </div>

        {openModal && (
          <button type="button" className={classes.addBtn} onClick={openModal}>
            <FiPlus />
          </button>
        )}

        {hasSwitch && (
          <Switch.Group>
            <div className={classes.switchWrapper}>
              <Switch
                checked={showSwitch}
                onChange={setShowSwitch}
                className={`${
                  showSwitch ? classes.switchDisable : classes.switchEnable
                } ${classes.switchButton}`}
              >
                <span
                  className={`${
                    showSwitch
                      ? classes.switchDiscDisable
                      : classes.switchDiscEnable
                  } ${classes.switchDisc}`}
                />
              </Switch>
            </div>
          </Switch.Group>
        )}
      </div>

      {children}
    </div>
  );
};
// lang ok
