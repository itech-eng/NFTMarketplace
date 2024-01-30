import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface FilterItemType {
  id: number;
  title: string;
}

export interface FilterComponentType {
  selected: FilterItemType[];
  setSelected: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
  userId?: number | null | undefined;
  collectionId?: number | null | undefined;
}
