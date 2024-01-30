import { FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import classes from "./DashboardContainer.module.css";

export const DashboardSidebar = ({
  children,
  fixedSidebar,
  isSidebarExtended,
  onClick,
}: any) => {
  return (
    <>
      <div
        className={`${classes.sidebar} ${
          isSidebarExtended ? classes.sidebarExtended : ""
        } ${fixedSidebar ? classes.fixedSidebar : ""}`}
      >
        <button
          type="button"
          className={classes.sidebarHeader}
          onClick={onClick}
          // onClick={() => setIsSidebarExtended(!isSidebarExtended)}
        >
          {isSidebarExtended && (
            <span>
              {" "}
              <FiFilter className="mr-3" /> Filter
            </span>
          )}

          {isSidebarExtended ? (
            <FiChevronLeft className={classes.sidebarIcon} />
          ) : (
            <FiChevronRight className={classes.sidebarIcon} />
          )}
        </button>

        {isSidebarExtended && (
          <div className={classes.filterContainer}>{children}</div>
        )}
      </div>
    </>
  );
};

//lang ok
