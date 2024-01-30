import { getCookie, setCookies } from "cookies-next";
import { ethers } from "ethers";
import { checkSSRTokenValidity } from "../../middleware/authCheck";
import {
  CheckItemFavouriteByUserDocument,
  CheckItemFavouriteByUserQuery,
  CheckItemFavouriteByUserQueryVariables,
  CheckUniqueCollectionDocument,
  CheckUniqueCollectionQuery,
  CheckUniqueCollectionQueryVariables,
  CheckUniqueItemDocument,
  CheckUniqueItemQuery,
  CheckUniqueItemQueryVariables,
  CheckUniqueUserDocument,
  CheckUniqueUserQuery,
  CheckUniqueUserQueryVariables,
  CollectionsForItemDocument,
  CollectionsForItemQuery,
  CollectionsForItemQueryVariables,
  GenerateLoginMessageDocument,
  GenerateLoginMessageMutation,
  GenerateLoginMessageMutationVariables,
  GetAccountByAddressDocument,
  GetAccountByAddressQuery,
  GetAccountByAddressQueryVariables,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetBlockchainListsDocument,
  GetBlockchainListsForChainIdsDocument,
  GetBlockchainListsForChainIdsQuery,
  GetBlockchainListsForChainIdsQueryVariables,
  GetBlockchainListsQuery,
  GetBlockchainListsQueryVariables,
  GetBuyOfferByIdDocument,
  GetBuyOfferByIdQuery,
  GetBuyOfferByIdQueryVariables,
  GetCategoriesDocument,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetCollectionDetailsDocument,
  GetCollectionDetailsQuery,
  GetCollectionDetailsQueryVariables,
  GetItemUnlockAbleContentDocument,
  GetItemUnlockAbleContentQuery,
  GetItemUnlockAbleContentQueryVariables,
  GetSettingsDataDocument,
  GetSettingsDataQuery,
  GetSettingsDataQueryVariables,
  GetTokenListsDocument,
  GetTokenListsQuery,
  GetTokenListsQueryVariables,
  GetUserByTokenDocument,
  GetUserByTokenQuery,
  GetUserByTokenQueryVariables,
  ItemDetailsBySlugOrTokenIdDocument,
  ItemDetailsBySlugOrTokenIdQuery,
  ItemDetailsBySlugOrTokenIdQueryVariables,
  ItemDetailsForTransferDocument,
  ItemDetailsForTransferQuery,
  ItemDetailsForTransferQueryVariables,
  ItemViewCountDocument,
  ItemViewCountMutation,
  ItemViewCountMutationVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  SyncItemOwnerDocument,
  SyncItemOwnerMutation,
  SyncItemOwnerMutationVariables,
  WalletLoginDocument,
  WalletLoginMutation,
  WalletLoginMutationVariables,
  UserVerifyMailDocument,
  GetCollectionListsForSearchQuery,
  GetCollectionListsForSearchQueryVariables,
  GetCollectionListsForSearchDocument,
  GetAccountListsPaginateForSearchQuery,
  GetAccountListsPaginateForSearchQueryVariables,
  GetAccountListsPaginateForSearchDocument,
  GetTokenListsForWalletQuery,
  GetTokenListsForWalletDocument,
  GetTokenListsForWalletQueryVariables,
  GetItemsTokensQuery,
  GetItemsTokensQueryVariables,
  GetItemsTokensDocument,
  GetNativeNwrapTokenQuery,
  GetNativeNwrapTokenQueryVariables,
  GetNativeNwrapTokenDocument,
  ItemDetailsForEditQuery,
  ItemDetailsForEditQueryVariables,
  ItemDetailsForEditDocument,
  ItemDetailsForActiveBuyQuery,
  ItemDetailsForActiveBuyQueryVariables,
  ItemDetailsForActiveBuyDocument,
} from "../graphql/generated";
import { graphqlFetcher, graphqlSSRFetcher } from "../lib/fetcher";

export async function getMe(req: any, res: any) {
  const token = getCookie("token", { req, res });
  const checkSSRToken = await checkSSRTokenValidity(req, res);
  if (checkSSRToken) {
    const meQuery = graphqlSSRFetcher<MeQuery, MeQueryVariables>(MeDocument);
    const me = await meQuery(token);
    return me.me ? me.me : null;
  } else {
    return null;
  }
}

// export async function getSingleCollection(address: string) {
//   const singleCollection = graphqlFetcher<
//     SingleCollectionQuery,
//     SingleCollectionQueryVariables
//   >(SingleCollectionDocument, { address });
//   return await singleCollection();
// }

export async function getAccountByAddress(account: string) {
  const getAccountQuery = graphqlFetcher<
    GetAccountByAddressQuery,
    GetAccountByAddressQueryVariables
  >(GetAccountByAddressDocument, { wallet_address: account });
  return await getAccountQuery();
}

export async function getAccount(address_or_username: string) {
  const data = graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    { address_or_username: address_or_username }
  );

  return await data();
}

export async function generateLoginMessage(account: string) {
  const getData = graphqlFetcher<
    GenerateLoginMessageMutation,
    GenerateLoginMessageMutationVariables
  >(GenerateLoginMessageDocument, { wallet_address: account });

  return await getData();
}

export async function walletLogin(
  address: string,
  nonce: string,
  signature: string
) {
  const getData = graphqlFetcher<
    WalletLoginMutation,
    WalletLoginMutationVariables
  >(WalletLoginDocument, {
    address,
    nonce,
    signature,
  });

  return await getData();
}

export async function getCategoryList(status: number) {
  const getData = graphqlFetcher<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, {
    status: status,
  });

  const data = await getData();
  if (data.getCategories) {
    return data.getCategories;
  }
  return null;
}

export async function getBlockchainList() {
  const getData = graphqlFetcher<
    GetBlockchainListsQuery,
    GetBlockchainListsQueryVariables
  >(GetBlockchainListsDocument);

  const data = await getData();
  if (data.getBlockchainLists) {
    return data.getBlockchainLists;
  }
  return null;
}

export async function getTokenOptionList() {
  const getData = graphqlFetcher<
    GetTokenListsQuery,
    GetTokenListsQueryVariables
  >(GetTokenListsDocument);

  const data = await getData();
  if (data.getTokenLists) {
    return data.getTokenLists;
  }
  return null;
}

export async function getItemsTokens(item_id: number) {
  const getData = graphqlFetcher<
    GetItemsTokensQuery,
    GetItemsTokensQueryVariables
  >(GetItemsTokensDocument, {
    item_id: item_id,
  });

  const data = await getData();
  if (data.getItemsTokens) {
    return data.getItemsTokens;
  }
  return null;
}

export async function getItemDetailsForActiveBuy(
  slug: string,
  viewer_wallet_address: string
) {
  const getData = graphqlFetcher<
    ItemDetailsForActiveBuyQuery,
    ItemDetailsForActiveBuyQueryVariables
  >(ItemDetailsForActiveBuyDocument, {
    slugOrTokenId: slug,
    viewer_wallet_address: viewer_wallet_address,
  });

  const data = await getData();

  if (data.ItemDetailsBySlugOrTokenId) {
    return data.ItemDetailsBySlugOrTokenId;
  }
  return null;
}

export async function getCollectionDetails(
  slug: string,
  user_wallet_address: string
) {
  const getData = graphqlFetcher<
    GetCollectionDetailsQuery,
    GetCollectionDetailsQueryVariables
  >(GetCollectionDetailsDocument, {
    slug: slug,
    user_wallet_address: user_wallet_address,
  });
  const data = await getData();
  if (data.getCollectionDetails) {
    return data.getCollectionDetails;
  }
  return null;
}

export async function checkUniqueCollectionSlug(id: number, slug: string) {
  const getData = graphqlFetcher<
    CheckUniqueCollectionQuery,
    CheckUniqueCollectionQueryVariables
  >(CheckUniqueCollectionDocument, { id: id, slug: slug });
  const data = await getData();
  if (data.checkUniqueCollection) {
    return data.checkUniqueCollection;
  }
  return null;
}

export async function checkUniqueCollectionName(id: number, name: string) {
  const getData = graphqlFetcher<
    CheckUniqueCollectionQuery,
    CheckUniqueCollectionQueryVariables
  >(CheckUniqueCollectionDocument, { id: id, name: name });
  const data = await getData();
  if (data.checkUniqueCollection) {
    return data.checkUniqueCollection;
  }
  return null;
}

export async function checkUniqueUser(wallet_address: string, username: string) {
  const getData = graphqlFetcher<
    CheckUniqueUserQuery,
    CheckUniqueUserQueryVariables
  >(CheckUniqueUserDocument, { wallet_address: wallet_address, username: username });
  const data = await getData();
  if (data.checkUniqueUser) {
    return data.checkUniqueUser;
  }
  return null;
}

export async function checkUniqueEmail(wallet_address: string, email: string) {
  const getData = graphqlFetcher<
    CheckUniqueUserQuery,
    CheckUniqueUserQueryVariables
  >(CheckUniqueUserDocument, { wallet_address: wallet_address, email: email });
  const data = await getData();
  if (data.checkUniqueUser) {
    return data.checkUniqueUser;
  }
  return null;
}

export async function checkUniqueItemName(name: string) {
  const getData = graphqlFetcher<
    CheckUniqueItemQuery,
    CheckUniqueItemQueryVariables
  >(CheckUniqueItemDocument, { name: name });
  const data = await getData();
  if (data.checkUniqueItem) {
    return data.checkUniqueItem;
  }
  return null;
}

export async function collectionsForItem(wallet_address: string, req: any, res: any) {
    const getData = graphqlSSRFetcher<
      CollectionsForItemQuery,
      CollectionsForItemQueryVariables
    >(CollectionsForItemDocument,  {
      wallet_address: wallet_address
    });
    const data = await getData();
    if (data.collectionsForItem) {
      return data.collectionsForItem;
    }
}

export async function getItemDetailsBySlugOrTokenId(
  slugOrTokenId: string,
  viewer_wallet_address: string,
  req: any,
  res: any
) {
  const token = getCookie("token", { req, res });
  // const checkSSRToken = await checkSSRTokenValidity(req, res);
  const getData = graphqlSSRFetcher<
    ItemDetailsBySlugOrTokenIdQuery,
    ItemDetailsBySlugOrTokenIdQueryVariables
  >(ItemDetailsBySlugOrTokenIdDocument, {
    slugOrTokenId: slugOrTokenId,
    viewer_wallet_address: viewer_wallet_address,
  });
  const data = await getData(token);

  if (data.ItemDetailsBySlugOrTokenId) {
    return data.ItemDetailsBySlugOrTokenId;
  }
  return null;
}

export async function getItemDetailsForEditAsset(
  slugOrTokenId: string,
  req: any,
  res: any
) {
  const token = getCookie("token", { req, res });
  // const checkSSRToken = await checkSSRTokenValidity(req, res);
  const getData = graphqlSSRFetcher<
    ItemDetailsForEditQuery,
    ItemDetailsForEditQueryVariables
  >(ItemDetailsForEditDocument, {
    slugOrTokenId: slugOrTokenId,
  });
  const data = await getData(token);

  if (data.ItemDetailsBySlugOrTokenId) {
    return data.ItemDetailsBySlugOrTokenId;
  }
  return null;
}

export async function itemViewCount(item_id: number, token: any) {
  // const checkSSRToken = await checkSSRTokenValidity(req, res);
  const call = graphqlSSRFetcher<
    ItemViewCountMutation,
    ItemViewCountMutationVariables
  >(ItemViewCountDocument, {
    item_id: item_id,
  });
  const data = await call(token);
  return data;
}

export async function getItemDetailsForTransfer(
  slugOrTokenId: string,
  req: any,
  res: any
) {
  const token = getCookie("token", { req, res });
  // const checkSSRToken = await checkSSRTokenValidity(req, res);
  const getData = graphqlSSRFetcher<
    ItemDetailsForTransferQuery,
    ItemDetailsForTransferQueryVariables
  >(ItemDetailsForTransferDocument, { slugOrTokenId: slugOrTokenId });
  const data = await getData(token);

  if (data.ItemDetailsBySlugOrTokenId) {
    return data.ItemDetailsBySlugOrTokenId;
  }
  return null;
}

export async function checkAuthentication(wallet_address: string) {
  try {
    const getUserByToken = graphqlFetcher<
      GetUserByTokenQuery,
      GetUserByTokenQueryVariables
    >(GetUserByTokenDocument, {});
    const response = await getUserByToken();
    return (
      response.getUserByToken &&
      response.getUserByToken.wallet_address === wallet_address
    );
  } catch (error) {
    return false;
  }
}

export async function checkOnPageAuthentication(
  wallet_address: string,
  setAutheticateAction?: any
) {
  let provider: any;
  if (typeof window !== "undefined" && (window as any).ethereum) {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);
  }
  try {
    const userQuery = graphqlFetcher<
      GetUserByTokenQuery,
      GetUserByTokenQueryVariables
    >(GetUserByTokenDocument, {});
    const user = await userQuery();
    const checkValid =
      user.getUserByToken &&
      user.getUserByToken.wallet_address === wallet_address;
    if (checkValid) {
      setAutheticateAction && setAutheticateAction(true);
      return true;
    } else {
      throw new Error("Invalid user!");
    }
  } catch (error) {
    const data = await generateLoginMessage(wallet_address);
    const { login_message, nonce } = data.generateLoginMessage;
    if (provider) {
      const signer: any = await provider.getSigner();
      const signature = await signer.signMessage(login_message);
      if (signature) {
        const login = await walletLogin(wallet_address, nonce, signature);
        setCookies("token", JSON.stringify(login.walletLogin), {
          expires: new Date(login.walletLogin.expireAt),
        });
      }
      setAutheticateAction && setAutheticateAction(true);
      return true;
    }
    return false;
  }
}

export async function getSettingsData(optionGroup: any, customHeaders?: any) {
  const settingsQueryResult = graphqlFetcher<
    GetSettingsDataQuery,
    GetSettingsDataQueryVariables
  >(GetSettingsDataDocument, { optionGroup }, customHeaders);
  const settings = await settingsQueryResult();

  let settingObj = {};
  if (
    settings &&
    settings.getSettingsData &&
    settings.getSettingsData.length > 0
  ) {
    settingObj = settings.getSettingsData.reduce(
      (acc: any, cur: any) => ({ ...acc, [cur.option_key]: cur.option_value }),
      {}
    );
  }
  return settingObj;
}

export async function getBuyOfferById(offerId: number) {
  const getData = graphqlFetcher<
    GetBuyOfferByIdQuery,
    GetBuyOfferByIdQueryVariables
  >(GetBuyOfferByIdDocument, { offerId: offerId });
  const data = await getData();

  if (data.getBuyOfferById) {
    return data.getBuyOfferById;
  }
  return null;
}

export async function syncItemOwner(item_id: number) {
  const call = graphqlFetcher<
    SyncItemOwnerMutation,
    SyncItemOwnerMutationVariables
  >(SyncItemOwnerDocument, { item_id: item_id });
  return await call();
}

export async function checkItemFavouriteByUser(
  item_id: number,
  viewer_id: number
) {
  const res = graphqlFetcher<
    CheckItemFavouriteByUserQuery,
    CheckItemFavouriteByUserQueryVariables
  >(CheckItemFavouriteByUserDocument, {
    item_id: item_id,
    viewer_id: viewer_id,
  });

  const data = await res();

  return data.checkItemFavouriteByUser;
}

export async function getUnlockableContent(item_slug: string) {
  const res = graphqlFetcher<
    GetItemUnlockAbleContentQuery,
    GetItemUnlockAbleContentQueryVariables
  >(GetItemUnlockAbleContentDocument, { item_slug: item_slug });

  const data = await res();

  return data.getItemUnlockAbleContent;
}

export async function getBlockchainListForChainIds() {
  const res = graphqlFetcher<
    GetBlockchainListsForChainIdsQuery,
    GetBlockchainListsForChainIdsQueryVariables
  >(GetBlockchainListsForChainIdsDocument);

  const data = await res();

  return data.getBlockchainLists;
}

// for searched collections
export async function getSearchCollections(
  first: number,
  query: string,
  totalItem: number,
  withItem: boolean
) {
  const res = graphqlFetcher<
    GetCollectionListsForSearchQuery,
    GetCollectionListsForSearchQueryVariables
  >(GetCollectionListsForSearchDocument, {
    first: first,
    query: query,
    totalItem: totalItem,
    withItem: withItem,
  });

  const data = await res();

  return data.getCollectionListsPaginate.edges;
}

// for searched accounts
export async function getSearchAccounts(
  first: number,
  query: string,
  totalItem: number,
  withItem: boolean
) {
  const res = graphqlFetcher<
    GetAccountListsPaginateForSearchQuery,
    GetAccountListsPaginateForSearchQueryVariables
  >(GetAccountListsPaginateForSearchDocument, {
    first: first,
    query: query,
    totalItem: totalItem,
    withItem: withItem,
  });

  const data = await res();

  return data.getAccountListsPaginate.edges;
}

export async function getNativeNwrapTokenWithChainId(chainId: number) {
  const res = graphqlFetcher<
    GetNativeNwrapTokenQuery,
    GetNativeNwrapTokenQueryVariables
  >(GetNativeNwrapTokenDocument, {
    chain_id: chainId,
  });

  const data = await res();

  return data.getNativeNwrapToken;
}
