import HeaderSection from "../components/Header/index";
import FooterSection from "../components/Footer";
import Head from "next/head";
const BasicLayout = ({children,data}: any) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={data?.favicon_logo || "/favicon.ico"}
      />
      </Head>

      <HeaderSection settings={data}/>

        {children}

      <FooterSection settings={data}/>
    </>
  );
};

export default BasicLayout;
