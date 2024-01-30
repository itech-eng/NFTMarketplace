import classes from "./DashboardContainer.module.css";

export const DashboardContent = ({
  children,
  fixedSidebar,
  isSidebarExtended,
}: any) => {
  return (
    <div
      className={`${classes.contents} ${
        fixedSidebar ? classes.fixedContent : ""
      } ${fixedSidebar && isSidebarExtended ? classes.fixedContentExtend : ""}`}
    >
      {children}
    </div>
  );
};
//lang ok
