import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@headlessui/react";
import classes from "./Drawer.module.css";
import { FiX } from "react-icons/fi";
import { imageAsset } from "src/helpers/functions";
import { SETTINGS_SLUG_APP_LOGO_SMALL } from "src/helpers/slugcontanst";

export const Drawer = ({
  show,
  onClose,
  children,
  onRightSide,
  setting,
}: any) => {
  const [portalElement, setPortalElement] = useState<any>();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const portalElement: any = window?.document.getElementById("drawer-root");
    setPortalElement(portalElement);
    setIsBrowser(true);
  }, []);

  const mainDrawer = show ? (
    <Dialog open={show} onClose={onClose} className={classes.dialog}>
      <div
        className={`${classes.wrapper} ${
          onRightSide ? classes.wrapperRight : ""
        }`}
      >
        <Dialog.Overlay className={classes.overlay} />

        <div
          className={`${classes.container} ${
            onRightSide ? classes.rightSide : classes.leftSide
          }`}
        >
          <Dialog.Title className={classes.title}>
            {setting && setting[SETTINGS_SLUG_APP_LOGO_SMALL] ? (
              <img
                src={
                  setting[SETTINGS_SLUG_APP_LOGO_SMALL] ??
                  imageAsset("assets/images/logo.png")
                }
                alt="logo"
                className="logo-img"
              />
            ) : null}

            <button
              type="button"
              className={classes.closeBtn}
              onClick={onClose}
            >
              <FiX />
            </button>
          </Dialog.Title>

          <Dialog.Description as="div">{children}</Dialog.Description>
        </div>
      </div>
    </Dialog>
  ) : null;

  return isBrowser ? ReactDOM.createPortal(mainDrawer, portalElement) : null;
};
//lang ok
