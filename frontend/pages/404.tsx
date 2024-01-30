import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO, SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_SOCIAL } from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import BasicLayout from "../layouts/basic.layout";
import ErrorPageSection from "../sections/404";
import BreadCrumbSection from "../sections/BreadCrumbSection";

const ErrorPage = ({data}:any) => {  
  const { t } = useTranslation("common");
  const [settings, setSettings] = useState<any>();
  useEffect(()=>{
    getSettingsData(
      [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO,
        SETTINGS_GROUP_SOCIAL,],
      {
        lang: "en",
      }
    ).then((data)=>{
      setSettings(data)
    });
  },[])
  return (
    <BasicLayout data={settings}>
      <BreadCrumbSection page_title={t("404")} title={t("404")} />

      <ErrorPageSection />
    </BasicLayout>
  );
};

export default ErrorPage;
//lang ok
