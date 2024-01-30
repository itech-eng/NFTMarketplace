//import { useGetSettingsQuery } from "../src/graphql/generated";

export const useAppSettings = () => {
  // const { data, isSuccess } = useGetSettingsQuery({
  //   optionGroup: ["general_settings", "logo_settings", "social_settings"],
  // });

  let settingObj: any = {};

  // if (isSuccess) {
  //   settingObj = data?.getSettingsData.reduce(
  //     (acc, cur) => ({ ...acc, [cur.optionKey]: cur.optionValue }),
  //     {}
  //   );
  // }

  return settingObj;
};
