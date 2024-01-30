import Link from "next/link";
import { absPath } from "../src/helpers/functions";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

// export default function BreadCrumbSectionOld({
//   page_title,
//   title,
//   parent,
// }: any) {
//   return (
//     <section className="breadcrumb-area">
//       <div className="container">
//         <div className="breadcrumb-wrap text-center">
//           <h2 className="page-title">{page_title}</h2>
//           <ul className="breadcrumb-page">
//             <li>
//               <Link href={absPath("")}>Home</Link>
//             </li>
//             {parent && <li>{parent}</li>}
//             <li>{title}</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

import { FiChevronRight } from "react-icons/fi";

const BreadCrumbSection = ({ page_title, title, parent }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="breadcrumb_new">
      <div className="container">
        <Link href={absPath("")}>{t("Home")}</Link> <FiChevronRight />{" "}
        {parent && (
          <>
            <Link href={absPath(parent.toLowerCase())}>{parent}</Link>{" "}
            <FiChevronRight />{" "}
          </>
        )}{" "}
        {title}
      </div>
    </div>
  );
};

export default BreadCrumbSection;
//lang ok
