import { Dispatch, SetStateAction } from "react";
import classes from "./HeadlessSwitch.module.css";
import { Switch } from "@headlessui/react";

interface ExplicitType {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

export const HeadLessSwitch = ({ enabled, setEnabled }: ExplicitType) => {
  return (
    <Switch.Group>
      <div className={classes.switchWrapper}>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? classes.switchDisable : classes.switchEnable
          } ${classes.switchButton}`}
        >
          <span
            className={`${
              enabled ? classes.switchDiscDisable : classes.switchDiscEnable
            } ${classes.switchDisc}`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
//lang ok
