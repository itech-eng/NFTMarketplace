// import SweetAlert from "react-bootstrap-sweetalert";
// import Router from "next/router";
// import { absPath } from "../helpers/functions";

// const Confirm = (message: string, confirmAction: any, cancelAction: any) => {
//   return (
//     <SweetAlert
//       warning
//       showCancel
//       style={{ backgroundColor: "white", color: "black" }}
//       confirmBtnText="Confirm!"
//       confirmBtnBsStyle="danger"
//       cancelBtnBsStyle="primary"
//       title="Are you sure?"
//       onConfirm={confirmAction}
//       onCancel={cancelAction}
//       focusCancelBtn
//     >
//       {message}
//     </SweetAlert>
//   );
// };

// const Success = (message: string, confirmAction: any) => {
//   return (
//     <SweetAlert
//       success
//       style={{ backgroundColor: "white", color: "black" }}
//       title="Congratulations!"
//       showConfirm={false}
//       timeout={2000}
//       onConfirm={confirmAction}
//     >
//       {message}
//     </SweetAlert>
//   );
// };

// const Error = (message: string, confirmAction: any) => {
//   return (
//     <SweetAlert
//       danger
//       style={{ backgroundColor: "white", color: "black" }}
//       title="Sorry!"
//       showConfirm={false}
//       timeout={2000}
//       onConfirm={confirmAction}
//     >
//       {message}
//     </SweetAlert>
//   );
// };

// const Warning = (message: string, confirmAction: any) => {
//   return (
//     <SweetAlert
//       warning
//       style={{ backgroundColor: "white", color: "black" }}
//       title="Sorry!"
//       showConfirm={false}
//       timeout={2000}
//       onConfirm={confirmAction}
//     >
//       {message}
//     </SweetAlert>
//   );
// };

// const Redirect = (url: string, message: string, mode: string) => {
//   let info,
//     success,
//     danger,
//     warning = false;
//   switch (mode) {
//     case "info":
//       info = true;
//       break;
//     case "success":
//       success = true;
//       break;
//     case "danger":
//       danger = true;
//       break;
//     case "warning":
//       warning = true;
//       break;
//     default:
//       info = true;
//   }
//   return (
//     <SweetAlert
//       info={info}
//       warning={warning}
//       danger={danger}
//       success={success}
//       style={{ backgroundColor: "white", color: "black" }}
//       confirmBtnText="Thank You!"
//       confirmBtnBsStyle="primary"
//       title="Are you sure?"
//       onConfirm={() => {
//         Router.push(absPath(url));
//       }}
//     >
//       {message}
//     </SweetAlert>
//   );
// };

// export { Confirm, Success, Error, Warning, Redirect };

import useTranslation from "next-translate/useTranslation";
import React from "react";

const SwalAlertService = () => {
  const { t } = useTranslation("common");

  return <div>{t("SwalAlertService")}</div>;
};

export default SwalAlertService;
