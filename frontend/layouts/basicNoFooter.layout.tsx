import HeaderSection from "../components/Header/index";
import { ReactElement } from "react";
import Head from "next/head";

// @ts-ignore
const BasicLayoutNoFooter = ({children,data}: any) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={data?.favicon_logo || "/favicon.ico"}/>
      </Head>

      <HeaderSection settings={data}/>

      {children}

      {/* <FooterSection /> */}
    </>
  );
};

export default BasicLayoutNoFooter;
