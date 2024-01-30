import APIConfig from "../config/api";
import { getCookie, removeCookies } from "cookies-next";
import {
  CODE_ACCOUNT_NOT_ACTIVE,
  CODE_UNAUTHORIZED,
  CODE_USER_SUSPENDED,
  LANGUAGES,
} from "../helpers/coreconstants";
import { LanguageList } from "src/helpers/corearray";

export function graphqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  customHeaders?: any
) {
  const { formData, isFile } = prepareFormData(query, variables);
  return async (): Promise<any> => {
    const tokenData = getCookie("token");
    return await callFetcher(
      tokenData,
      isFile,
      query,
      variables,
      formData,
      customHeaders
    );
  };
}

export function graphqlSSRFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  customHeaders?: any
) {
  const { formData, isFile } = prepareFormData(query, variables);
  return async (token: any = null): Promise<any> => {
    return await callFetcher(
      token,
      isFile,
      query,
      variables,
      formData,
      customHeaders
    );
  };
}

const prepareFormData = (query: string, variables?: any) => {
  let formData: any;
  formData = null;
  let isFile = false;
  if (typeof FormData !== "undefined") {
    formData = new FormData();
    if (typeof variables === "object") {
      // @ts-ignore
      let counter = 0;
      const operation = JSON.stringify({
        query,
        variables,
        operationName: null,
      });
      formData.append("operations", operation);
      let map = "";
      for (const x in variables) {
        if (global.window && variables[x] instanceof File) {
          // @ts-ignore
          const index = `"${counter}"`;
          map +=
            counter > 0
              ? `,${index}:["variables.${x}"]`
              : `${index}:["variables.${x}"]`;
          isFile = true;
          counter++;
        }
      }
      map = `{${map}}`;
      formData.append("map", map);
      let newCounter = 0;
      for (const x in variables) {
        if (global.window && variables[x] instanceof File) {
          // @ts-ignore
          formData.append(`${newCounter.toString()}`, variables[x]);
          newCounter++;
        }
      }
    }
  }
  return {
    formData,
    isFile,
  };
};
const langGetFromUrl = () => {
  let langs: any = [];
  LanguageList.map((la) => langs.push(la.value));
  const lang = global.window && window.location.href.split("/")[3];
  return langs.includes(lang) ? lang : "en";
};
const callFetcher = async (
  tokenData: any,
  isFile: boolean,
  query: string,
  variables: any,
  formData: any,
  customHeaders?: any
) => {
  let tokenObject = null;
  try {
    if (typeof tokenData === "string") {
      tokenObject = tokenData ? JSON.parse(tokenData) : null;
    }
  } catch (error) {
    console.log(error);
  }
  const accessToken =
    tokenObject !== null && tokenObject.hasOwnProperty("accessToken")
      ? tokenObject.accessToken
      : "";
  let header: any = isFile
    ? {
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer " + accessToken,
      }
    : {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      };

  header["lang"] = langGetFromUrl();
  header = { ...header, ...customHeaders };
  const res = await fetch(APIConfig.endpoint as string, {
    method: "POST",
    // @ts-ignore
    headers: header,
    body: isFile ? formData : JSON.stringify({ query, variables }),
  });
  const json = await res.json();

  if (json.errors) {
    // console.log(json.errors);
    const code = json.errors[0].code;
    if (
      // code == CODE_UNAUTHORIZED ||
      code == CODE_USER_SUSPENDED ||
      code == CODE_ACCOUNT_NOT_ACTIVE
    ) {
      removeCookies("walletIsConnectedTo");
      removeCookies("token");
      removeCookies("wallet_address");
      try {
        setTimeout(() => {
          global.window && window.location.reload();
        }, 5000);
        // return alert(json.errors[0].message);
      } catch (e) {}
    }
    throw new Error(json.errors[0].message);
    // return json.errors[0];
  }

  return json.data;
};
