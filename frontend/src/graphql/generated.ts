import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '../lib/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type. Basically string */
  Date: any;
  /** Decimal custom scalar type. Basically string or number */
  Decimal: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AmountCalculationModel = {
  __typename?: 'AmountCalculationModel';
  fee_amount?: Maybe<Scalars['Decimal']>;
  payment_token?: Maybe<PaymentTokenModel>;
  seller_amount?: Maybe<Scalars['Decimal']>;
  total_amount?: Maybe<Scalars['Decimal']>;
};

export type ApplicationSettingsInput = {
  minting_interval_duration_in_min?: InputMaybe<Scalars['String']>;
  per_day_minting_limit?: InputMaybe<Scalars['String']>;
  settings_buy_sell_fee_percentage?: InputMaybe<Scalars['String']>;
  settings_max_interval_for_buy_sell_offer_in_min?: InputMaybe<Scalars['String']>;
  settings_min_interval_for_buy_sell_offer_in_min?: InputMaybe<Scalars['String']>;
};

export type BlockchainModel = {
  __typename?: 'BlockchainModel';
  chain_id?: Maybe<Scalars['Int']>;
  currency_symbol: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exchange_contract?: Maybe<Scalars['String']>;
  exchange_contract_name?: Maybe<Scalars['String']>;
  exchange_contract_version?: Maybe<Scalars['String']>;
  explorer_url?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  network_name: Scalars['String'];
  nft_contract?: Maybe<Scalars['String']>;
  payment_tokens?: Maybe<Array<PaymentTokenModel>>;
  provider: Scalars['Int'];
  public_rpc_url?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
};

export type BlockchainModelEdge = {
  __typename?: 'BlockchainModelEdge';
  cursor: Scalars['String'];
  node: BlockchainModel;
};

export type BlockchainStaffConnection = {
  __typename?: 'BlockchainStaffConnection';
  edges?: Maybe<Array<BlockchainStaffModelEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type BlockchainStaffModel = {
  __typename?: 'BlockchainStaffModel';
  api_key?: Maybe<Scalars['String']>;
  chain_id?: Maybe<Scalars['Int']>;
  currency_symbol: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  exchange_contract?: Maybe<Scalars['String']>;
  exchange_contract_name?: Maybe<Scalars['String']>;
  exchange_contract_version?: Maybe<Scalars['String']>;
  explorer_url?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  network_name: Scalars['String'];
  nft_contract?: Maybe<Scalars['String']>;
  payment_tokens?: Maybe<Array<PaymentTokenModel>>;
  provider: Scalars['Int'];
  public_rpc_url?: Maybe<Scalars['String']>;
  rpc_url?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  wss_url?: Maybe<Scalars['String']>;
};

export type BlockchainStaffModelEdge = {
  __typename?: 'BlockchainStaffModelEdge';
  cursor: Scalars['String'];
  node: BlockchainStaffModel;
};

export type BuyOffer = {
  __typename?: 'BuyOffer';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  end_date: Scalars['Date'];
  fee_amount: Scalars['Decimal'];
  fee_percentage: Scalars['Float'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  royalty_address?: Maybe<Scalars['String']>;
  royalty_amount: Scalars['Decimal'];
  royalty_percentage: Scalars['Float'];
  seller_amount: Scalars['Decimal'];
  signature?: Maybe<Scalars['String']>;
  start_date: Scalars['Date'];
  status: Scalars['Int'];
  total_amount: Scalars['Decimal'];
  type: Scalars['Int'];
  uid: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type BuyOfferConnection = {
  __typename?: 'BuyOfferConnection';
  edges?: Maybe<Array<BuyOfferEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type BuyOfferEdge = {
  __typename?: 'BuyOfferEdge';
  cursor: Scalars['String'];
  node: BuyOffer;
};

export type Category = {
  __typename?: 'Category';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges?: Maybe<Array<CategoryEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  cursor: Scalars['String'];
  node: Category;
};

export type Collection = {
  __typename?: 'Collection';
  _count?: Maybe<Count>;
  banner_image?: Maybe<Scalars['String']>;
  blockchain?: Maybe<BlockchainModel>;
  blockchain_id: Scalars['Int'];
  category?: Maybe<Category>;
  category_id: Scalars['Int'];
  collection_watch_lists?: Maybe<Array<CollectionWatchList>>;
  contract_address?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  display_theme: Scalars['Int'];
  feature_image?: Maybe<Scalars['String']>;
  featured_collections?: Maybe<FeaturedCollectionList>;
  id: Scalars['Int'];
  is_featured: Scalars['Int'];
  is_sensitive: Scalars['Int'];
  items?: Maybe<Array<Item>>;
  logo: Scalars['String'];
  metadata?: Maybe<CollectionModelMetadata>;
  name: Scalars['String'];
  payout_address?: Maybe<Scalars['String']>;
  royalties?: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
  status: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['Int']>;
  user_wallet_address?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  edges?: Maybe<Array<CollectionEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node: Collection;
};

export type CollectionModelMetadata = {
  __typename?: 'CollectionModelMetadata';
  floor_price?: Maybe<PriceConvertModel>;
  native_token?: Maybe<PaymentTokenModel>;
  owner_count?: Maybe<Scalars['Int']>;
  volume?: Maybe<PriceConvertModel>;
};

export type CollectionOrder = {
  direction: OrderDirection;
  field: CollectionOrderField;
};

/** Properties by which collection connections can be ordered. */
export enum CollectionOrderField {
  CreatedAt = 'created_at',
  Id = 'id',
  Loyalties = 'loyalties',
  Name = 'name'
}

export type CollectionWatchList = {
  __typename?: 'CollectionWatchList';
  collection: Collection;
  collection_id: Scalars['Int'];
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  status: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user: User;
  user_id: Scalars['Int'];
};

export type CollectionWithMeta = {
  __typename?: 'CollectionWithMeta';
  collection: Collection;
  floor_price?: Maybe<PriceConvertModel>;
  is_watched: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  native_token?: Maybe<PaymentTokenModel>;
  owner_count?: Maybe<Scalars['Int']>;
  social_links: SocialLinkModel;
  token_mappings: Array<PaymentTokenMappingModel>;
  volume?: Maybe<PriceConvertModel>;
};

export type Count = {
  __typename?: 'Count';
  items: Scalars['Int'];
};

export type CountModel = {
  __typename?: 'CountModel';
  /** count */
  count: Scalars['Int'];
};

export type CreateBlockChainDto = {
  api_key?: InputMaybe<Scalars['String']>;
  currency_symbol: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  exchange_contract?: InputMaybe<Scalars['String']>;
  exchange_contract_name?: InputMaybe<Scalars['String']>;
  exchange_contract_version?: InputMaybe<Scalars['String']>;
  explorer_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['Upload']>;
  network_name: Scalars['String'];
  nft_contract?: InputMaybe<Scalars['String']>;
  provider: Scalars['Int'];
  public_rpc_url?: InputMaybe<Scalars['String']>;
  rpc_url?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  wss_url?: InputMaybe<Scalars['String']>;
};

export type CreateBuyOfferDto = {
  amount: Scalars['Float'];
  end_date: Scalars['String'];
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token_id: Scalars['Int'];
  signature?: InputMaybe<Scalars['String']>;
  start_date: Scalars['String'];
  type: Scalars['Int'];
};

export type CreateCategoryDto = {
  imageFile?: InputMaybe<Scalars['Upload']>;
  status?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type CreateCollectionDto = {
  banner_image_file?: InputMaybe<Scalars['Upload']>;
  blockchain_id: Scalars['Int'];
  category_id: Scalars['Int'];
  contract_address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  discord_link?: InputMaybe<Scalars['String']>;
  display_theme: Scalars['Int'];
  feature_image_file?: InputMaybe<Scalars['Upload']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  is_sensitive: Scalars['Int'];
  logo_file: Scalars['Upload'];
  medium_link?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  payment_tokens?: InputMaybe<Scalars['String']>;
  payout_address?: InputMaybe<Scalars['String']>;
  royalties: Scalars['Float'];
  slug?: InputMaybe<Scalars['String']>;
  telegram_link?: InputMaybe<Scalars['String']>;
  website_link?: InputMaybe<Scalars['String']>;
};

export type CreateItemDto = {
  collection_id: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['String']>;
  is_unlockable_content: Scalars['Int'];
  media_file: Scalars['Upload'];
  name: Scalars['String'];
  thumbnail_file?: InputMaybe<Scalars['Upload']>;
  unlockable_content?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentTokenDto = {
  blockchain_id: Scalars['Int'];
  contract_address: Scalars['String'];
  is_default?: InputMaybe<Scalars['Int']>;
  is_wrapable?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['Upload']>;
  min_amount_to_execute_auction: Scalars['Float'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  sync_rate_status?: InputMaybe<Scalars['Int']>;
  token_symbol: Scalars['String'];
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate?: InputMaybe<Scalars['Float']>;
};

export type CreateSellOfferDto = {
  amount: Scalars['Float'];
  end_date: Scalars['String'];
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token_id: Scalars['Int'];
  reserved_address?: InputMaybe<Scalars['String']>;
  reserved_price?: InputMaybe<Scalars['Int']>;
  signature?: InputMaybe<Scalars['String']>;
  start_date: Scalars['String'];
  type: Scalars['Int'];
};

export type CreatorEarning = {
  __typename?: 'CreatorEarning';
  collection?: Maybe<Collection>;
  collection_id: Scalars['Int'];
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  exchange?: Maybe<Exchange>;
  exchange_id: Scalars['Int'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  royalty_address?: Maybe<Scalars['String']>;
  royalty_amount: Scalars['Decimal'];
  royalty_percentage: Scalars['Float'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type CreatorEarningConnection = {
  __typename?: 'CreatorEarningConnection';
  edges?: Maybe<Array<CreatorEarningEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CreatorEarningEdge = {
  __typename?: 'CreatorEarningEdge';
  cursor: Scalars['String'];
  node: CreatorEarning;
};

export type DashboardModel = {
  __typename?: 'DashboardModel';
  total_blockchain?: Maybe<Scalars['Int']>;
  total_collection?: Maybe<Scalars['Int']>;
  total_income?: Maybe<Scalars['Float']>;
  total_item?: Maybe<Scalars['Int']>;
  total_sale_amount?: Maybe<Scalars['Float']>;
  total_sales?: Maybe<Scalars['Int']>;
  total_sell_offer?: Maybe<Scalars['Int']>;
  total_users?: Maybe<Scalars['Int']>;
};

export type DayWiseCountModel = {
  __typename?: 'DayWiseCountModel';
  date: Scalars['Date'];
  total_count: Scalars['Int'];
};

export type DayWisePriceCountModel = {
  __typename?: 'DayWisePriceCountModel';
  avg_price: Scalars['Float'];
  date: Scalars['Date'];
  sum_price: Scalars['Float'];
};

export type Exchange = {
  __typename?: 'Exchange';
  buy_offer?: Maybe<BuyOffer>;
  buy_offer_id?: Maybe<Scalars['Int']>;
  buyer?: Maybe<User>;
  buyer_id?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  sell_offer?: Maybe<SellOffer>;
  sell_offer_id?: Maybe<Scalars['Int']>;
  seller?: Maybe<User>;
  seller_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  total_amount?: Maybe<Scalars['Decimal']>;
  transaction_hash?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type ExchangeConnection = {
  __typename?: 'ExchangeConnection';
  edges?: Maybe<Array<ExchangeEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ExchangeEdge = {
  __typename?: 'ExchangeEdge';
  cursor: Scalars['String'];
  node: Exchange;
};

export type FeaturedCollectionList = {
  __typename?: 'FeaturedCollectionList';
  collection_id: Scalars['Int'];
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  order: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type FileObject = {
  __typename?: 'FileObject';
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
  variants?: Maybe<Array<FileVariant>>;
};

export type FileVariant = {
  __typename?: 'FileVariant';
  type: Scalars['String'];
  url: Scalars['String'];
};

export type HomepageSettingsInput = {
  asset_description?: InputMaybe<Scalars['String']>;
  asset_title?: InputMaybe<Scalars['String']>;
  banner_description?: InputMaybe<Scalars['String']>;
  banner_image?: InputMaybe<Scalars['Upload']>;
  banner_title?: InputMaybe<Scalars['String']>;
  category_description?: InputMaybe<Scalars['String']>;
  category_title?: InputMaybe<Scalars['String']>;
  featured_collection_description?: InputMaybe<Scalars['String']>;
  featured_collection_title?: InputMaybe<Scalars['String']>;
  instruction_add_nfts?: InputMaybe<Scalars['String']>;
  instruction_create_collection?: InputMaybe<Scalars['String']>;
  instruction_description?: InputMaybe<Scalars['String']>;
  instruction_image?: InputMaybe<Scalars['Upload']>;
  instruction_list_for_sale?: InputMaybe<Scalars['String']>;
  instruction_setup_wallet?: InputMaybe<Scalars['String']>;
  instruction_title?: InputMaybe<Scalars['String']>;
  resource_description?: InputMaybe<Scalars['String']>;
  resource_description_1?: InputMaybe<Scalars['String']>;
  resource_description_2?: InputMaybe<Scalars['String']>;
  resource_description_3?: InputMaybe<Scalars['String']>;
  resource_image_1?: InputMaybe<Scalars['Upload']>;
  resource_image_2?: InputMaybe<Scalars['Upload']>;
  resource_image_3?: InputMaybe<Scalars['Upload']>;
  resource_link_1?: InputMaybe<Scalars['String']>;
  resource_link_2?: InputMaybe<Scalars['String']>;
  resource_link_3?: InputMaybe<Scalars['String']>;
  resource_title?: InputMaybe<Scalars['String']>;
  resource_title_1?: InputMaybe<Scalars['String']>;
  resource_title_2?: InputMaybe<Scalars['String']>;
  resource_title_3?: InputMaybe<Scalars['String']>;
  selloffer_description?: InputMaybe<Scalars['String']>;
  selloffer_title?: InputMaybe<Scalars['String']>;
  top_collection_description?: InputMaybe<Scalars['String']>;
  top_collection_title?: InputMaybe<Scalars['String']>;
  trending_collection_description?: InputMaybe<Scalars['String']>;
  trending_collection_title?: InputMaybe<Scalars['String']>;
  video_section_description?: InputMaybe<Scalars['String']>;
  video_section_title?: InputMaybe<Scalars['String']>;
  video_url?: InputMaybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  active_buy?: Maybe<BuyOffer>;
  active_sell?: Maybe<SellOffer>;
  buy_offers?: Maybe<Array<BuyOffer>>;
  collection?: Maybe<Collection>;
  collection_id: Scalars['Int'];
  created_at: Scalars['Date'];
  creator?: Maybe<User>;
  creator_id: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  exchange_in_progress?: Maybe<Exchange>;
  exchanges?: Maybe<Array<Exchange>>;
  external_url?: Maybe<Scalars['String']>;
  filetype: Scalars['String'];
  highest_bid?: Maybe<BuyOffer>;
  id: Scalars['Int'];
  is_minted: Scalars['Int'];
  is_unlockable_content?: Maybe<Scalars['Int']>;
  item_activities?: Maybe<Array<ItemActivity>>;
  item_favourite_lists?: Maybe<Array<ItemFavouriteList>>;
  like_count: Scalars['Int'];
  media_path?: Maybe<Scalars['String']>;
  minted_at?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  owner_id: Scalars['Int'];
  owner_name?: Maybe<Scalars['String']>;
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id?: Maybe<Scalars['Int']>;
  price: Scalars['Decimal'];
  prices?: Maybe<Array<Price>>;
  sell_offers?: Maybe<Array<SellOffer>>;
  slug: Scalars['String'];
  status: Scalars['Int'];
  thumbnail_path?: Maybe<Scalars['String']>;
  token_id?: Maybe<Scalars['String']>;
  token_uri?: Maybe<Scalars['String']>;
  unlockable_content?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
  view_count: Scalars['Int'];
};

export type ItemActivitiesConnection = {
  __typename?: 'ItemActivitiesConnection';
  edges?: Maybe<Array<ItemActivityEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ItemActivity = {
  __typename?: 'ItemActivity';
  amount?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  event: Scalars['Int'];
  from?: Maybe<User>;
  from_id: Scalars['Int'];
  hash?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  status: Scalars['Int'];
  to?: Maybe<User>;
  to_id?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type ItemActivityEdge = {
  __typename?: 'ItemActivityEdge';
  cursor: Scalars['String'];
  node: ItemActivity;
};

export type ItemConnection = {
  __typename?: 'ItemConnection';
  edges?: Maybe<Array<ItemEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ItemEdge = {
  __typename?: 'ItemEdge';
  cursor: Scalars['String'];
  node: Item;
};

export type ItemFavouriteList = {
  __typename?: 'ItemFavouriteList';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type ItemOrder = {
  direction: OrderDirection;
  field: ItemOrderField;
};

/** Properties by which Item connections can be ordered. */
export enum ItemOrderField {
  Id = 'id',
  MostFavourite = 'most_favourite',
  Price = 'price',
  RecentlyCreated = 'recently_created',
  View = 'view'
}

export type MaxFeaturedCollectionOrderDto = {
  __typename?: 'MaxFeaturedCollectionOrderDto';
  max_order: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  StaffLogin: Token;
  acceptOffer: Exchange;
  addStaffCollectionToFeatured: ResponseModel;
  adminFileUpload: FileObject;
  applicationSettingsSave: ResponseModel;
  buyNow: Exchange;
  cancelBuyOffer: ResponseModel;
  cancelExchange: ResponseModel;
  cancelSellOffer: ResponseModel;
  cancelTransfer: ResponseModel;
  changePassword: ResponseMessageWithStatusModel;
  changeStaffPassword: ResponseModel;
  collectionWatchListToggle: ResponseModel;
  createBlockchain: ResponseModel;
  createBuyOffer: BuyOffer;
  createCategory: ResponseModel;
  createCollection: Collection;
  createItem: Item;
  createPaymentToken: ResponseModel;
  createRole: ResponseModel;
  createSellOffer: SellOffer;
  createStaff: ResponseModel;
  createTransfer: Transfer;
  deleteBlockchain: ResponseModel;
  deleteCategory: ResponseModel;
  deleteCollection: ResponseModel;
  deletePaymentToken: ResponseModel;
  deleteRole: ResponseModel;
  deleteStaff: ResponseModel;
  finishExchang: ResponseModel;
  finishTransfer: ResponseModel;
  generalSettingsSave: ResponseModel;
  generateLoginMessage: WalletLoginMessage;
  homepageSettingsSave: ResponseModel;
  itemFavouriteListToggle: CountModel;
  itemReMint: ResponseModel;
  itemViewCount: CountModel;
  logoSettingsSave: ResponseModel;
  mailSettingsSave: ResponseModel;
  refreshToken: Token;
  removeStaffCollectionFromFeatured: ResponseModel;
  resendVerifcationEmail: ResponseModel;
  saveNewsLetterSubscription: ResponseModel;
  sendForgetPasswordMail: ResponseMessageWithStatusModel;
  sendStaffForgetPasswordMail: ResponseModel;
  socialSettingsSave: ResponseModel;
  syncItemOwner: ResponseModel;
  syncUsdRates: ResponseModel;
  updateBlockchain: ResponseModel;
  updateBlockchainStatus: ResponseModel;
  updateCategory: ResponseModel;
  updateCollection: Collection;
  updateItem: Item;
  updateItemStatus: ResponseModel;
  updatePaymentToken: ResponseModel;
  updatePaymentTokenStatus: ResponseModel;
  updateProfile: ResponseModel;
  updateRole: ResponseModel;
  updateStaff: ResponseModel;
  updateStaffCollectionStatus: ResponseModel;
  updateStaffFeaturedCollectionOrder: ResponseModel;
  updateStaffPassword: ResponseModel;
  updateStaffProfile: ResponseModel;
  updateUserStatus: ResponseModel;
  uploadFile: FileObject;
  usefulLinkSettingsSave: ResponseModel;
  userNotificationSettingSave: ResponseModel;
  userVerifyMail: ResponseModel;
  walletLogin: Token;
};


export type MutationStaffLoginArgs = {
  data: StaffLoginInput;
};


export type MutationAcceptOfferArgs = {
  offerId: Scalars['Int'];
};


export type MutationAddStaffCollectionToFeaturedArgs = {
  collection_id: Scalars['Int'];
  order: Scalars['Int'];
};


export type MutationAdminFileUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationApplicationSettingsSaveArgs = {
  data: ApplicationSettingsInput;
};


export type MutationBuyNowArgs = {
  offerId: Scalars['Int'];
};


export type MutationCancelBuyOfferArgs = {
  sell_uid: Scalars['String'];
};


export type MutationCancelExchangeArgs = {
  exchangeId: Scalars['Int'];
};


export type MutationCancelSellOfferArgs = {
  sell_uid: Scalars['String'];
};


export type MutationCancelTransferArgs = {
  transfer_id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationChangeStaffPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationCollectionWatchListToggleArgs = {
  collectionId: Scalars['Int'];
};


export type MutationCreateBlockchainArgs = {
  data: CreateBlockChainDto;
};


export type MutationCreateBuyOfferArgs = {
  data: CreateBuyOfferDto;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryDto;
};


export type MutationCreateCollectionArgs = {
  data: CreateCollectionDto;
};


export type MutationCreateItemArgs = {
  data: CreateItemDto;
};


export type MutationCreatePaymentTokenArgs = {
  data: CreatePaymentTokenDto;
};


export type MutationCreateRoleArgs = {
  data: RoleInput;
};


export type MutationCreateSellOfferArgs = {
  data: CreateSellOfferDto;
};


export type MutationCreateStaffArgs = {
  data: StaffCreateInput;
};


export type MutationCreateTransferArgs = {
  item_id: Scalars['Int'];
  to_address: Scalars['String'];
};


export type MutationDeleteBlockchainArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['Int'];
};


export type MutationDeletePaymentTokenArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  id: Scalars['Int'];
};


export type MutationFinishExchangArgs = {
  exchangeId: Scalars['Int'];
  transactionHash: Scalars['String'];
};


export type MutationFinishTransferArgs = {
  transaction_hash: Scalars['String'];
  transfer_id: Scalars['Int'];
};


export type MutationGeneralSettingsSaveArgs = {
  data: GeneralSettingsInput;
};


export type MutationGenerateLoginMessageArgs = {
  wallet_address: Scalars['String'];
};


export type MutationHomepageSettingsSaveArgs = {
  data: HomepageSettingsInput;
};


export type MutationItemFavouriteListToggleArgs = {
  item_id: Scalars['Int'];
};


export type MutationItemReMintArgs = {
  activity_id: Scalars['Int'];
};


export type MutationItemViewCountArgs = {
  item_id: Scalars['Int'];
};


export type MutationLogoSettingsSaveArgs = {
  data: LogoSettingsInput;
};


export type MutationMailSettingsSaveArgs = {
  data: MailSettingsInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationRemoveStaffCollectionFromFeaturedArgs = {
  collection_id: Scalars['Int'];
};


export type MutationSaveNewsLetterSubscriptionArgs = {
  email: Scalars['String'];
};


export type MutationSendForgetPasswordMailArgs = {
  email: Scalars['String'];
};


export type MutationSendStaffForgetPasswordMailArgs = {
  email: Scalars['String'];
};


export type MutationSocialSettingsSaveArgs = {
  data: SocialSettingsInput;
};


export type MutationSyncItemOwnerArgs = {
  item_id: Scalars['Int'];
};


export type MutationUpdateBlockchainArgs = {
  data: UpdateBlockChainDto;
  id: Scalars['Int'];
};


export type MutationUpdateBlockchainStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryDto;
  id: Scalars['Int'];
};


export type MutationUpdateCollectionArgs = {
  data: UpdateCollectionDto;
  id: Scalars['Int'];
};


export type MutationUpdateItemArgs = {
  data: UpdateItemDto;
  id: Scalars['Int'];
};


export type MutationUpdateItemStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdatePaymentTokenArgs = {
  data: UpdatePaymentTokenDto;
  id: Scalars['Int'];
};


export type MutationUpdatePaymentTokenStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleInput;
  id: Scalars['Int'];
};


export type MutationUpdateStaffArgs = {
  data: StaffUpdateInput;
  id: Scalars['Int'];
};


export type MutationUpdateStaffCollectionStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUpdateStaffFeaturedCollectionOrderArgs = {
  collection_id: Scalars['Int'];
  order: Scalars['Int'];
};


export type MutationUpdateStaffPasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateStaffProfileArgs = {
  data: StaffUpdateInput;
};


export type MutationUpdateUserStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUsefulLinkSettingsSaveArgs = {
  data: UsefulLinkSettingsInput;
};


export type MutationUserNotificationSettingSaveArgs = {
  data: UserNotificationSettingDto;
};


export type MutationUserVerifyMailArgs = {
  verificationCode: Scalars['String'];
};


export type MutationWalletLoginArgs = {
  data: WalletLoginInput;
};

export type NativeNwrapTokenModel = {
  __typename?: 'NativeNwrapTokenModel';
  native_token?: Maybe<PaymentTokenModel>;
  wrap_token?: Maybe<PaymentTokenModel>;
};

export type NftList = {
  __typename?: 'NftList';
  ownedNfts: Array<OwnedNft>;
  pageKey?: Maybe<Scalars['String']>;
  totalCount: Scalars['Int'];
};

export type NotificationEventModel = {
  __typename?: 'NotificationEventModel';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  status: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type NotificationSettingModel = {
  __typename?: 'NotificationSettingModel';
  events?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type Order = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderType = {
  __typename?: 'OrderType';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentTokenConnection = {
  __typename?: 'PaymentTokenConnection';
  edges?: Maybe<Array<PaymentTokenModelEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentTokenMappingModel = {
  __typename?: 'PaymentTokenMappingModel';
  payment_token: PaymentTokenModel;
};

export type PaymentTokenModel = {
  __typename?: 'PaymentTokenModel';
  blockchain?: Maybe<BlockchainModel>;
  blockchain_id: Scalars['Int'];
  contract_address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_default: Scalars['Int'];
  is_wrapable: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  min_amount_to_execute_auction: Scalars['Decimal'];
  name: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  sync_rate_status: Scalars['Int'];
  token_symbol?: Maybe<Scalars['String']>;
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate: Scalars['Decimal'];
};

export type PaymentTokenModelEdge = {
  __typename?: 'PaymentTokenModelEdge';
  cursor: Scalars['String'];
  node: PaymentTokenModel;
};

export type PaymentTokenOrder = {
  direction: OrderDirection;
  field: PaymentTokenOrderField;
};

/** Properties by which payment token connections can be ordered. */
export enum PaymentTokenOrderField {
  Id = 'id',
  Name = 'name'
}

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Decimal'];
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  item?: Maybe<Scalars['Float']>;
  item_id: Scalars['Int'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type PriceCalculationModel = {
  __typename?: 'PriceCalculationModel';
  day_wise_price_count: Array<DayWisePriceCountModel>;
  total_avg_price: Scalars['Float'];
  total_sum_price: Scalars['Float'];
};

export type PriceConvertModel = {
  __typename?: 'PriceConvertModel';
  native_price?: Maybe<Scalars['Float']>;
  usd_price?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  ItemDetailsBySlugOrTokenId: Item;
  adminFileList: Array<FileObject>;
  checkCollectionWatchedByUser: Scalars['Boolean'];
  checkItemFavouriteByUser: Scalars['Boolean'];
  checkUniqueCollection: ResponseModel;
  checkUniqueItem: ResponseModel;
  checkUniqueUser: ResponseModel;
  collectionsByAddress: Array<Collection>;
  /** collections for item create */
  collectionsForItem: Array<Collection>;
  getAccount: User;
  getAccountByAddress: User;
  getAccountListsPaginate: UserConnection;
  getActiveSellOfferLists: SellOfferConnection;
  getBlockchainById: BlockchainStaffModel;
  getBlockchainDetails?: Maybe<BlockchainModel>;
  getBlockchainLists: Array<BlockchainModel>;
  getBuyOfferById: BuyOffer;
  getCategories: Array<Category>;
  getCategoryById: Category;
  getCategoryList: CategoryConnection;
  getCollectionDetails: CollectionWithMeta;
  getCollectionListsPaginate: CollectionConnection;
  getCreatorEarningListPaginate: CreatorEarningConnection;
  getDashboardData: DashboardModel;
  getDataForSignBuyOffer: SigDataModel;
  getDataForSignSellOffer: SigDataModel;
  getDayWiseCollectionPrice?: Maybe<PriceCalculationModel>;
  getDayWiseItemPrice?: Maybe<PriceCalculationModel>;
  getDayWiseSalesCount: Array<DayWiseCountModel>;
  getDayWiseUserCount: Array<DayWiseCountModel>;
  getFeaturedCollectionList: Array<Collection>;
  getFeeByPaymentToken?: Maybe<Array<AmountCalculationModel>>;
  getItemActivities: Array<ItemActivity>;
  getItemActivitiesPaginate: ItemActivitiesConnection;
  getItemLists: ItemConnection;
  getItemUnlockAbleContent: Scalars['String'];
  getItemsTokens: Array<PaymentTokenModel>;
  getNativeNwrapToken: NativeNwrapTokenModel;
  getNftsTest: NftList;
  getNotificationSettings?: Maybe<NotificationSettingModel>;
  getNotificationSettingsEvent: Array<NotificationEventModel>;
  getPaymentTokenById: PaymentTokenModel;
  getRankingList: Array<Ranking>;
  getRole: Role;
  getRoles: Array<Role>;
  getSellOfferLists: SellOfferConnection;
  getSellOfferListsByUser: SellOfferConnection;
  getSettingsData: Array<Setting>;
  getStaff: Staff;
  getStaffBlockchainListPaginate: BlockchainStaffConnection;
  getStaffCollectionListsPaginate: CollectionConnection;
  getStaffFeaturedCollectionListPaginate: CollectionConnection;
  getStaffFeaturedCollectionMaxOrder: MaxFeaturedCollectionOrderDto;
  getStaffItemActivitiesPaginate: ItemActivitiesConnection;
  getStaffItemListsPaginate: ItemConnection;
  getStaffLists: StaffConnection;
  getStaffNotFeaturedCollectionLists: Array<Collection>;
  getStaffPaymentTokenListPaginate: PaymentTokenConnection;
  getStaffSalesDataPaginate: ExchangeConnection;
  getStaffSingleItemBySlugOrTokenId: Item;
  getStaffUserById: User;
  getStaffUserListsPaginate: UserConnection;
  getTokenLists: Array<PaymentTokenModel>;
  getTokenListsPaginate: PaymentTokenConnection;
  getTopCollectionList: Array<Collection>;
  getTransferList: Array<Transfer>;
  getTrendingCollectionList: Array<Collection>;
  getTrendingItemList: Array<Item>;
  getUserBuyOfferLists: BuyOfferConnection;
  getUserByToken: User;
  getUserItemFavouriteLists: ItemConnection;
  globalSearch: SearchModel;
  itemBuyOfferList: Array<BuyOffer>;
  listFile: Array<FileObject>;
  me: User;
  myCollectionWatchList: CollectionConnection;
  staff: Staff;
};


export type QueryItemDetailsBySlugOrTokenIdArgs = {
  slugOrTokenId: Scalars['String'];
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryCheckCollectionWatchedByUserArgs = {
  collection_id: Scalars['Int'];
  user_id?: InputMaybe<Scalars['Int']>;
  user_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryCheckItemFavouriteByUserArgs = {
  item_id: Scalars['Int'];
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryCheckUniqueCollectionArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryCheckUniqueItemArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};


export type QueryCheckUniqueUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  wallet_address: Scalars['String'];
};


export type QueryCollectionsByAddressArgs = {
  wallet_address: Scalars['String'];
};


export type QueryCollectionsForItemArgs = {
  wallet_address: Scalars['String'];
};


export type QueryGetAccountArgs = {
  address_or_username: Scalars['String'];
};


export type QueryGetAccountByAddressArgs = {
  wallet_address: Scalars['String'];
};


export type QueryGetAccountListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  totalItem?: InputMaybe<Scalars['Int']>;
  withItem?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetActiveSellOfferListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBlockchainByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetBlockchainDetailsArgs = {
  chain_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBlockchainListsArgs = {
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetBuyOfferByIdArgs = {
  offerId: Scalars['Int'];
};


export type QueryGetCategoriesArgs = {
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetCategoryListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order>;
  paginateNumber?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCollectionDetailsArgs = {
  slug: Scalars['String'];
  user_id?: InputMaybe<Scalars['Int']>;
  user_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryGetCollectionListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  totalItem?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
  withItem?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetCreatorEarningListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetDataForSignBuyOfferArgs = {
  data: CreateBuyOfferDto;
};


export type QueryGetDataForSignSellOfferArgs = {
  data: CreateSellOfferDto;
};


export type QueryGetDayWiseCollectionPriceArgs = {
  collection_id: Scalars['Int'];
  days: Scalars['String'];
};


export type QueryGetDayWiseItemPriceArgs = {
  days: Scalars['String'];
  item_id: Scalars['Int'];
};


export type QueryGetFeaturedCollectionListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetItemActivitiesArgs = {
  events?: InputMaybe<Scalars['String']>;
  item_id: Scalars['Int'];
};


export type QueryGetItemActivitiesPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']>>;
  collection_id?: InputMaybe<Array<Scalars['Int']>>;
  event_type?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  item_id?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetItemListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']>>;
  category_id?: InputMaybe<Array<Scalars['Int']>>;
  collection_id?: InputMaybe<Array<Scalars['Int']>>;
  creator_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  max_price?: InputMaybe<Scalars['Float']>;
  min_price?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<ItemOrder>;
  owner_id?: InputMaybe<Scalars['Int']>;
  payment_token_id?: InputMaybe<Array<Scalars['Int']>>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<Scalars['Int']>>;
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryGetItemUnlockAbleContentArgs = {
  item_slug: Scalars['String'];
};


export type QueryGetItemsTokensArgs = {
  item_id: Scalars['Int'];
};


export type QueryGetNativeNwrapTokenArgs = {
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPaymentTokenByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetRankingListArgs = {
  blockchain_id?: InputMaybe<Scalars['Int']>;
  days: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRoleArgs = {
  id: Scalars['Int'];
};


export type QueryGetRolesArgs = {
  orderBy?: InputMaybe<RoleOrder>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryGetSellOfferListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSellOfferListsByUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  status: Scalars['Int'];
  user_id?: InputMaybe<Scalars['Int']>;
  user_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryGetSettingsDataArgs = {
  optionGroup?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetStaffArgs = {
  id: Scalars['Int'];
};


export type QueryGetStaffBlockchainListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffCollectionListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffFeaturedCollectionListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffItemActivitiesPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']>>;
  collection_id?: InputMaybe<Array<Scalars['Int']>>;
  event_type?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  item_id?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffItemListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']>>;
  category_id?: InputMaybe<Array<Scalars['Int']>>;
  collection_id?: InputMaybe<Array<Scalars['Int']>>;
  creator_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  max_price?: InputMaybe<Scalars['Float']>;
  min_price?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<ItemOrder>;
  owner_id?: InputMaybe<Scalars['Int']>;
  payment_token_id?: InputMaybe<Array<Scalars['Int']>>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryGetStaffListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StaffOrder>;
  paginateNumber?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffPaymentTokenListPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffSalesDataPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetStaffSingleItemBySlugOrTokenIdArgs = {
  slugOrTokenId: Scalars['String'];
};


export type QueryGetStaffUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetStaffUserListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTokenListsArgs = {
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTokenListsPaginateArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PaymentTokenOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTopCollectionListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTransferListArgs = {
  from_user_id?: InputMaybe<Scalars['Int']>;
  to_user_id?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTrendingCollectionListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTrendingItemListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserBuyOfferListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offer_maker_id?: InputMaybe<Scalars['Int']>;
  offer_receiver_id?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserItemFavouriteListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
};


export type QueryGlobalSearchArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QueryItemBuyOfferListArgs = {
  item_id: Scalars['Int'];
};


export type QueryMyCollectionWatchListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type Ranking = {
  __typename?: 'Ranking';
  blockchain_id: Scalars['Int'];
  collection?: Maybe<Collection>;
  collection_id: Scalars['Int'];
  created_at: Scalars['Date'];
  floor_price_in_native?: Maybe<Scalars['Decimal']>;
  floor_price_in_usd?: Maybe<Scalars['Decimal']>;
  id: Scalars['Int'];
  item_count: Scalars['Int'];
  native_token?: Maybe<PaymentTokenModel>;
  native_token_id: Scalars['Int'];
  one_day_volume_in_native?: Maybe<Scalars['Decimal']>;
  one_day_volume_in_usd?: Maybe<Scalars['Decimal']>;
  one_day_volume_percent?: Maybe<Scalars['Float']>;
  seven_days_volume_in_native?: Maybe<Scalars['Decimal']>;
  seven_days_volume_in_usd?: Maybe<Scalars['Decimal']>;
  seven_days_volume_percent?: Maybe<Scalars['Float']>;
  thirty_days_volume_in_native?: Maybe<Scalars['Decimal']>;
  thirty_days_volume_in_usd?: Maybe<Scalars['Decimal']>;
  thirty_days_volume_percent?: Maybe<Scalars['Float']>;
  total_volume_in_native?: Maybe<Scalars['Decimal']>;
  total_volume_in_usd?: Maybe<Scalars['Decimal']>;
  updated_at?: Maybe<Scalars['Date']>;
  user?: Maybe<PaymentTokenModel>;
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type ResponseMessageWithStatusModel = {
  __typename?: 'ResponseMessageWithStatusModel';
  /** message */
  message: Scalars['String'];
  /** success */
  success: Scalars['Boolean'];
};

export type ResponseModel = {
  __typename?: 'ResponseModel';
  /** custom code */
  code: Scalars['Int'];
  /** message */
  message: Scalars['String'];
  /** success */
  success: Scalars['Boolean'];
};

export type Role = {
  __typename?: 'Role';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
};

export type RoleOrder = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type SearchModel = {
  __typename?: 'SearchModel';
  account?: Maybe<Array<User>>;
  collection?: Maybe<Array<Collection>>;
  item?: Maybe<Array<Item>>;
};

export type SellOffer = {
  __typename?: 'SellOffer';
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  end_date: Scalars['Date'];
  fee_amount: Scalars['Decimal'];
  fee_percentage: Scalars['Float'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token?: Maybe<PaymentTokenModel>;
  payment_token_id: Scalars['Int'];
  reserved_address?: Maybe<Scalars['String']>;
  reserved_price?: Maybe<Scalars['Decimal']>;
  royalty_address?: Maybe<Scalars['String']>;
  royalty_amount: Scalars['Decimal'];
  royalty_percentage: Scalars['Float'];
  seller_amount: Scalars['Decimal'];
  signature?: Maybe<Scalars['String']>;
  start_date: Scalars['Date'];
  status: Scalars['Int'];
  total_amount: Scalars['Decimal'];
  type: Scalars['Int'];
  uid: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type SellOfferConnection = {
  __typename?: 'SellOfferConnection';
  edges?: Maybe<Array<SellOfferEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type SellOfferEdge = {
  __typename?: 'SellOfferEdge';
  cursor: Scalars['String'];
  node: SellOffer;
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['Int'];
  option_group?: Maybe<Scalars['String']>;
  option_key: Scalars['String'];
  option_value?: Maybe<Scalars['String']>;
  value_type?: Maybe<Scalars['Int']>;
};

export type SigDataModel = {
  __typename?: 'SigDataModel';
  domainData: DomainData;
  offerValue: OfferValue;
  type: Type;
};

export type SocialLinkModel = {
  __typename?: 'SocialLinkModel';
  discord_link?: Maybe<Scalars['String']>;
  facebook_link?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  instagram_link?: Maybe<Scalars['String']>;
  linkedin_link?: Maybe<Scalars['String']>;
  medium_link?: Maybe<Scalars['String']>;
  model_id: Scalars['Int'];
  model_type: Scalars['Int'];
  telegram_link?: Maybe<Scalars['String']>;
  website_link?: Maybe<Scalars['String']>;
  whatsapp_link?: Maybe<Scalars['String']>;
};

export type Staff = {
  __typename?: 'Staff';
  avatar?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerifiedAt?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  isEmailVerified: Scalars['Boolean'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  resetCode?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  username: Scalars['String'];
};

export type StaffConnection = {
  __typename?: 'StaffConnection';
  edges?: Maybe<Array<StaffEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StaffCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type StaffEdge = {
  __typename?: 'StaffEdge';
  cursor: Scalars['String'];
  node: Staff;
};

export type StaffLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type StaffOrder = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type StaffUpdateInput = {
  avatarFile?: InputMaybe<Scalars['Upload']>;
  description?: InputMaybe<Scalars['String']>;
  /** Send email field only if it is admin */
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT expiration time */
  expireAt: Scalars['Date'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type Transfer = {
  __typename?: 'Transfer';
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  item?: Maybe<Item>;
  item_id: Scalars['Int'];
  status: Scalars['Int'];
  to_address: Scalars['String'];
  to_user?: Maybe<User>;
  to_user_id: Scalars['Int'];
  transaction_hash?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at: Scalars['Date'];
  user?: Maybe<User>;
  user_id: Scalars['Int'];
};

export type UpdateBlockChainDto = {
  api_key?: InputMaybe<Scalars['String']>;
  currency_symbol: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  exchange_contract?: InputMaybe<Scalars['String']>;
  exchange_contract_name?: InputMaybe<Scalars['String']>;
  exchange_contract_version?: InputMaybe<Scalars['String']>;
  explorer_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['Upload']>;
  network_name: Scalars['String'];
  nft_contract?: InputMaybe<Scalars['String']>;
  provider: Scalars['Int'];
  public_rpc_url?: InputMaybe<Scalars['String']>;
  rpc_url?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  wss_url?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryDto = {
  imageFile?: InputMaybe<Scalars['Upload']>;
  status?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type UpdateCollectionDto = {
  banner_image_file?: InputMaybe<Scalars['Upload']>;
  category_id: Scalars['Int'];
  contract_address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  discord_link?: InputMaybe<Scalars['String']>;
  display_theme: Scalars['Int'];
  feature_image_file?: InputMaybe<Scalars['Upload']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  is_sensitive: Scalars['Int'];
  logo_file?: InputMaybe<Scalars['Upload']>;
  medium_link?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  payment_tokens?: InputMaybe<Scalars['String']>;
  payout_address?: InputMaybe<Scalars['String']>;
  royalties: Scalars['Float'];
  slug?: InputMaybe<Scalars['String']>;
  telegram_link?: InputMaybe<Scalars['String']>;
  website_link?: InputMaybe<Scalars['String']>;
};

export type UpdateItemDto = {
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['String']>;
  is_unlockable_content: Scalars['Int'];
  unlockable_content?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  oldPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UpdatePaymentTokenDto = {
  blockchain_id: Scalars['Int'];
  contract_address: Scalars['String'];
  is_default?: InputMaybe<Scalars['Int']>;
  is_wrapable?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['Upload']>;
  min_amount_to_execute_auction: Scalars['Float'];
  name: Scalars['String'];
  status?: InputMaybe<Scalars['Int']>;
  sync_rate_status?: InputMaybe<Scalars['Int']>;
  token_symbol: Scalars['String'];
  total_decimal: Scalars['Int'];
  type: Scalars['Int'];
  usd_rate?: InputMaybe<Scalars['Float']>;
};

export type UpdateProfileInput = {
  banner_img_file?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img_file?: InputMaybe<Scalars['Upload']>;
  username: Scalars['String'];
  website_link?: InputMaybe<Scalars['String']>;
};

export type UsefulLinkSettingsInput = {
  footer_useful_link_title_1?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_2?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_3?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_4?: InputMaybe<Scalars['String']>;
  footer_useful_link_title_5?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_1?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_2?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_3?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_4?: InputMaybe<Scalars['String']>;
  footer_useful_link_url_5?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  banner_img?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  collections?: Maybe<Array<Collection>>;
  createdItems?: Maybe<Array<Item>>;
  /** Identifies the date and time when the object was created. */
  created_at: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  email_verified_at?: Maybe<Scalars['Date']>;
  exchangesAsBuyer?: Maybe<Array<Exchange>>;
  exchangesAsSeller?: Maybe<Array<Exchange>>;
  id: Scalars['Int'];
  is_email_verified?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  notfication_settings?: Maybe<NotificationSettingModel>;
  ownedItems?: Maybe<Array<Item>>;
  phone?: Maybe<Scalars['String']>;
  profile_img?: Maybe<Scalars['String']>;
  reset_code?: Maybe<Scalars['String']>;
  social_links?: Maybe<SocialLinkModel>;
  status?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was last updated. */
  updated_at: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
  wallet_address: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserNotificationSettingDto = {
  events?: InputMaybe<Array<Scalars['Int']>>;
};

export type UserOrder = {
  direction: OrderDirection;
  field: UserOrderField;
};

/** Properties by which User connections can be ordered. */
export enum UserOrderField {
  Id = 'id',
  Name = 'name'
}

export type WalletLoginInput = {
  address: Scalars['String'];
  nonce: Scalars['String'];
  signature: Scalars['String'];
};

export type WalletLoginMessage = {
  __typename?: 'WalletLoginMessage';
  login_message?: Maybe<Scalars['String']>;
  nonce: Scalars['String'];
};

export type DomainData = {
  __typename?: 'domainData';
  chainId: Scalars['Int'];
  name: Scalars['String'];
  verifyingContract: Scalars['String'];
  version: Scalars['String'];
};

export type GeneralSettingsInput = {
  address?: InputMaybe<Scalars['String']>;
  admin_commission?: InputMaybe<Scalars['String']>;
  application_title?: InputMaybe<Scalars['String']>;
  contract_email?: InputMaybe<Scalars['String']>;
  contract_phone?: InputMaybe<Scalars['String']>;
  copy_right_text?: InputMaybe<Scalars['String']>;
  wallet_address?: InputMaybe<Scalars['String']>;
};

export type LogoSettingsInput = {
  app_logo_large?: InputMaybe<Scalars['Upload']>;
  app_logo_small?: InputMaybe<Scalars['Upload']>;
  favicon_logo?: InputMaybe<Scalars['Upload']>;
};

export type MailSettingsInput = {
  mail_driver?: InputMaybe<Scalars['String']>;
  mail_encryption?: InputMaybe<Scalars['String']>;
  mail_from_address?: InputMaybe<Scalars['String']>;
  mail_from_name?: InputMaybe<Scalars['String']>;
  mail_host?: InputMaybe<Scalars['String']>;
  mail_password?: InputMaybe<Scalars['String']>;
  mail_port?: InputMaybe<Scalars['String']>;
  mail_username?: InputMaybe<Scalars['String']>;
};

export type OfferValue = {
  __typename?: 'offerValue';
  _buyer?: Maybe<Scalars['String']>;
  _expiresAt: Scalars['Int'];
  _feeAmount: Scalars['String'];
  _nftContract: Scalars['String'];
  _nftTokenId: Scalars['String'];
  _nonce: Scalars['String'];
  _paymentTokenContract: Scalars['String'];
  _royaltyAmount: Scalars['String'];
  _royaltyPayTo: Scalars['String'];
  _seller?: Maybe<Scalars['String']>;
  _sellerAmount: Scalars['String'];
  _startsAt: Scalars['Int'];
  _totalAmount: Scalars['String'];
};

export type OwnedNft = {
  __typename?: 'ownedNft';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type RoleInput = {
  name: Scalars['String'];
  permissions?: InputMaybe<Scalars['String']>;
};

export type SocialSettingsInput = {
  discord_link?: InputMaybe<Scalars['String']>;
  facebook_link?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  linkedin_link?: InputMaybe<Scalars['String']>;
  twitter_link?: InputMaybe<Scalars['String']>;
  whatsapp_link?: InputMaybe<Scalars['String']>;
};

export type Type = {
  __typename?: 'type';
  BuyOrder?: Maybe<Array<OrderType>>;
  SellOrder?: Maybe<Array<OrderType>>;
};

export type AcceptOfferMutationVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type AcceptOfferMutation = { __typename?: 'Mutation', acceptOffer: { __typename?: 'Exchange', id: number, uid: string, item?: { __typename?: 'Item', id: number, token_id?: string | null | undefined, token_uri?: string | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number } | null | undefined } };

export type BuyNowMutationVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type BuyNowMutation = { __typename?: 'Mutation', buyNow: { __typename?: 'Exchange', id: number, uid: string, item?: { __typename?: 'Item', id: number, token_id?: string | null | undefined, token_uri?: string | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number } | null | undefined } };

export type CancelBuyOfferMutationVariables = Exact<{
  sell_uid: Scalars['String'];
}>;


export type CancelBuyOfferMutation = { __typename?: 'Mutation', cancelBuyOffer: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type CancelExchangeMutationVariables = Exact<{
  exchangeId: Scalars['Int'];
}>;


export type CancelExchangeMutation = { __typename?: 'Mutation', cancelExchange: { __typename?: 'ResponseModel', success: boolean, code: number, message: string } };

export type CancelSellOfferMutationVariables = Exact<{
  sell_uid: Scalars['String'];
}>;


export type CancelSellOfferMutation = { __typename?: 'Mutation', cancelSellOffer: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type CancelTransferMutationVariables = Exact<{
  transfer_id: Scalars['Int'];
}>;


export type CancelTransferMutation = { __typename?: 'Mutation', cancelTransfer: { __typename?: 'ResponseModel', code: number, success: boolean, message: string } };

export type CollectionWatchListToggleMutationVariables = Exact<{
  collectionId: Scalars['Int'];
}>;


export type CollectionWatchListToggleMutation = { __typename?: 'Mutation', collectionWatchListToggle: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type CreateBuyOfferMutationVariables = Exact<{
  amount: Scalars['Float'];
  end_date: Scalars['String'];
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token_id: Scalars['Int'];
  signature: Scalars['String'];
  start_date: Scalars['String'];
  type: Scalars['Int'];
}>;


export type CreateBuyOfferMutation = { __typename?: 'Mutation', createBuyOffer: { __typename?: 'BuyOffer', id: number, status: number } };

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  logo_file: Scalars['Upload'];
  feature_image_file?: InputMaybe<Scalars['Upload']>;
  banner_image_file?: InputMaybe<Scalars['Upload']>;
  category_id: Scalars['Int'];
  blockchain_id: Scalars['Int'];
  display_theme: Scalars['Int'];
  payment_tokens?: InputMaybe<Scalars['String']>;
  is_sensitive: Scalars['Int'];
  website_link?: InputMaybe<Scalars['String']>;
  discord_link?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  medium_link?: InputMaybe<Scalars['String']>;
  royalties: Scalars['Float'];
  payout_address?: InputMaybe<Scalars['String']>;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: number, name: string } };

export type CreateItemMutationVariables = Exact<{
  collection_id: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['String']>;
  is_unlockable_content: Scalars['Int'];
  media_file: Scalars['Upload'];
  thumbnail_file?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
  unlockable_content?: InputMaybe<Scalars['String']>;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: number, name: string, slug: string, token_id?: string | null | undefined } };

export type CreateSellOfferMutationVariables = Exact<{
  amount: Scalars['Float'];
  end_date: Scalars['String'];
  item_id: Scalars['Int'];
  nonce: Scalars['String'];
  payment_token_id: Scalars['Int'];
  reserved_address?: InputMaybe<Scalars['String']>;
  reserved_price?: InputMaybe<Scalars['Int']>;
  signature: Scalars['String'];
  start_date: Scalars['String'];
  type: Scalars['Int'];
}>;


export type CreateSellOfferMutation = { __typename?: 'Mutation', createSellOffer: { __typename?: 'SellOffer', id: number, status: number } };

export type CreateTransferMutationVariables = Exact<{
  item_id: Scalars['Int'];
  to_address: Scalars['String'];
}>;


export type CreateTransferMutation = { __typename?: 'Mutation', createTransfer: { __typename?: 'Transfer', id: number, uid: string, status: number, transaction_hash?: string | null | undefined } };

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ResponseModel', success: boolean, message: string, code: number } };

export type FinishExchangMutationVariables = Exact<{
  exchangeId: Scalars['Int'];
  transactionHash: Scalars['String'];
}>;


export type FinishExchangMutation = { __typename?: 'Mutation', finishExchang: { __typename?: 'ResponseModel', success: boolean, code: number, message: string } };

export type FinishTransferMutationVariables = Exact<{
  transaction_hash: Scalars['String'];
  transfer_id: Scalars['Int'];
}>;


export type FinishTransferMutation = { __typename?: 'Mutation', finishTransfer: { __typename?: 'ResponseModel', code: number, success: boolean, message: string } };

export type GenerateLoginMessageMutationVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type GenerateLoginMessageMutation = { __typename?: 'Mutation', generateLoginMessage: { __typename?: 'WalletLoginMessage', login_message?: string | null | undefined, nonce: string } };

export type ItemFavouriteListToggleMutationVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type ItemFavouriteListToggleMutation = { __typename?: 'Mutation', itemFavouriteListToggle: { __typename?: 'CountModel', count: number } };

export type ItemReMintMutationVariables = Exact<{
  activity_id: Scalars['Int'];
}>;


export type ItemReMintMutation = { __typename?: 'Mutation', itemReMint: { __typename?: 'ResponseModel', success: boolean, message: string } };

export type ItemViewCountMutationVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type ItemViewCountMutation = { __typename?: 'Mutation', itemViewCount: { __typename?: 'CountModel', count: number } };

export type ResendVerifcationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendVerifcationEmailMutation = { __typename?: 'Mutation', resendVerifcationEmail: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type SaveNewsLetterSubscriptionMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SaveNewsLetterSubscriptionMutation = { __typename?: 'Mutation', saveNewsLetterSubscription: { __typename?: 'ResponseModel', success: boolean, message: string } };

export type SyncItemOwnerMutationVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type SyncItemOwnerMutation = { __typename?: 'Mutation', syncItemOwner: { __typename?: 'ResponseModel', success: boolean, message: string, code: number } };

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  logo_file?: InputMaybe<Scalars['Upload']>;
  feature_image_file?: InputMaybe<Scalars['Upload']>;
  banner_image_file?: InputMaybe<Scalars['Upload']>;
  category_id: Scalars['Int'];
  display_theme: Scalars['Int'];
  payment_tokens?: InputMaybe<Scalars['String']>;
  is_sensitive: Scalars['Int'];
  website_link?: InputMaybe<Scalars['String']>;
  discord_link?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  royalties: Scalars['Float'];
  medium_link?: InputMaybe<Scalars['String']>;
  payout_address?: InputMaybe<Scalars['String']>;
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'Collection', id: number, name: string } };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['String']>;
  is_unlockable_content: Scalars['Int'];
  unlockable_content?: InputMaybe<Scalars['String']>;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number, name: string, slug: string, token_id?: string | null | undefined } };

export type UpdateProfileMutationVariables = Exact<{
  banner_img_file?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  instagram_link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile_img_file?: InputMaybe<Scalars['Upload']>;
  username: Scalars['String'];
  website_link?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type UserNotificationSettingSaveMutationVariables = Exact<{
  events?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type UserNotificationSettingSaveMutation = { __typename?: 'Mutation', userNotificationSettingSave: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type UserVerifyMailMutationVariables = Exact<{
  verificationCode: Scalars['String'];
}>;


export type UserVerifyMailMutation = { __typename?: 'Mutation', userVerifyMail: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type WalletLoginMutationVariables = Exact<{
  address: Scalars['String'];
  nonce: Scalars['String'];
  signature: Scalars['String'];
}>;


export type WalletLoginMutation = { __typename?: 'Mutation', walletLogin: { __typename?: 'Token', accessToken: string, expireAt: any, refreshToken: string } };

export type ItemDetailsBySlugOrTokenIdQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type ItemDetailsBySlugOrTokenIdQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', description?: string | null | undefined, external_url?: string | null | undefined, id: number, is_minted: number, is_unlockable_content?: number | null | undefined, like_count: number, filetype: string, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, name: string, price: any, slug: string, status: number, token_id?: string | null | undefined, token_uri?: string | null | undefined, view_count: number, exchange_in_progress?: { __typename?: 'Exchange', id: number } | null | undefined, collection?: { __typename?: 'Collection', id: number, name: string, slug: string, logo: string, description?: string | null | undefined, royalties?: number | null | undefined, payout_address?: string | null | undefined, contract_address?: string | null | undefined, blockchain?: { __typename?: 'BlockchainModel', status?: number | null | undefined, id: number, chain_id?: number | null | undefined, explorer_url?: string | null | undefined, logo?: string | null | undefined, network_name: string, exchange_contract?: string | null | undefined, exchange_contract_name?: string | null | undefined, exchange_contract_version?: string | null | undefined, nft_contract?: string | null | undefined } | null | undefined } | null | undefined, owner?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, creator?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, active_buy?: { __typename?: 'BuyOffer', id: number, uid: string, type: number, total_amount: any, start_date: any, end_date: any, created_at: any, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, logo?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', wallet_address: string } | null | undefined } | null | undefined, active_sell?: { __typename?: 'SellOffer', id: number, uid: string, nonce: string, signature?: string | null | undefined, type: number, total_amount: any, seller_amount: any, fee_amount: any, royalty_address?: string | null | undefined, royalty_amount: any, reserved_price?: any | null | undefined, start_date: any, end_date: any, created_at: any, payment_token?: { __typename?: 'PaymentTokenModel', id: number, type: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, logo?: string | null | undefined, usd_rate: any } | null | undefined, user?: { __typename?: 'User', wallet_address: string } | null | undefined } | null | undefined, highest_bid?: { __typename?: 'BuyOffer', fee_amount: any, total_amount: any } | null | undefined } };

export type ItemDetailsForActiveBuyQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type ItemDetailsForActiveBuyQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', id: number, name: string, slug: string, active_buy?: { __typename?: 'BuyOffer', id: number, uid: string, type: number, total_amount: any, start_date: any, end_date: any, created_at: any, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, logo?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', wallet_address: string } | null | undefined } | null | undefined } };

export type ItemDetailsForEditQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
}>;


export type ItemDetailsForEditQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', id: number, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, name: string, external_url?: string | null | undefined, description?: string | null | undefined, is_unlockable_content?: number | null | undefined, unlockable_content?: string | null | undefined, collection?: { __typename?: 'Collection', id: number, logo: string, name: string, blockchain?: { __typename?: 'BlockchainModel', id: number, status?: number | null | undefined } | null | undefined } | null | undefined, owner?: { __typename?: 'User', id: number, wallet_address: string } | null | undefined, active_sell?: { __typename?: 'SellOffer', id: number } | null | undefined } };

export type ItemDetailsForHighestBidQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
}>;


export type ItemDetailsForHighestBidQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', highest_bid?: { __typename?: 'BuyOffer', fee_amount: any, total_amount: any } | null | undefined } };

export type ItemExchangeInProgressQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
}>;


export type ItemExchangeInProgressQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', exchange_in_progress?: { __typename?: 'Exchange', id: number } | null | undefined } };

export type CheckCollectionWatchedByUserQueryVariables = Exact<{
  collection_id: Scalars['Int'];
  user_id?: InputMaybe<Scalars['Int']>;
  user_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type CheckCollectionWatchedByUserQuery = { __typename?: 'Query', checkCollectionWatchedByUser: boolean };

export type CheckItemFavouriteByUserQueryVariables = Exact<{
  item_id: Scalars['Int'];
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type CheckItemFavouriteByUserQuery = { __typename?: 'Query', checkItemFavouriteByUser: boolean };

export type CheckUniqueCollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type CheckUniqueCollectionQuery = { __typename?: 'Query', checkUniqueCollection: { __typename?: 'ResponseModel', success: boolean, message: string } };

export type CheckUniqueItemQueryVariables = Exact<{
  name: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
}>;


export type CheckUniqueItemQuery = { __typename?: 'Query', checkUniqueItem: { __typename?: 'ResponseModel', code: number, message: string, success: boolean } };

export type CheckUniqueUserQueryVariables = Exact<{
  wallet_address: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type CheckUniqueUserQuery = { __typename?: 'Query', checkUniqueUser: { __typename?: 'ResponseModel', code: number, success: boolean, message: string } };

export type CollectionsByAddressQueryVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type CollectionsByAddressQuery = { __typename?: 'Query', collectionsByAddress: Array<{ __typename?: 'Collection', id: number, name: string, slug: string, description?: string | null | undefined, logo: string, royalties?: number | null | undefined, payout_address?: string | null | undefined, contract_address?: string | null | undefined, category_id: number, display_theme: number, feature_image?: string | null | undefined, banner_image?: string | null | undefined, status: number, _count?: { __typename?: 'Count', items: number } | null | undefined, user?: { __typename?: 'User', id: number, name?: string | null | undefined } | null | undefined }> };

export type CollectionsForItemQueryVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type CollectionsForItemQuery = { __typename?: 'Query', collectionsForItem: Array<{ __typename?: 'Collection', id: number, name: string, slug: string, logo: string }> };

export type GetAccountQueryVariables = Exact<{
  address_or_username: Scalars['String'];
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'User', banner_img?: string | null | undefined, bio?: string | null | undefined, created_at: any, email?: string | null | undefined, id: number, name?: string | null | undefined, phone?: string | null | undefined, profile_img?: string | null | undefined, status?: number | null | undefined, updated_at: any, username?: string | null | undefined, is_email_verified?: number | null | undefined, wallet_address: string, social_links?: { __typename?: 'SocialLinkModel', instagram_link?: string | null | undefined, website_link?: string | null | undefined, discord_link?: string | null | undefined, facebook_link?: string | null | undefined, linkedin_link?: string | null | undefined, medium_link?: string | null | undefined } | null | undefined } };

export type GetAccountByAddressQueryVariables = Exact<{
  wallet_address: Scalars['String'];
}>;


export type GetAccountByAddressQuery = { __typename?: 'Query', getAccountByAddress: { __typename?: 'User', banner_img?: string | null | undefined, bio?: string | null | undefined, email?: string | null | undefined, id: number, name?: string | null | undefined, phone?: string | null | undefined, profile_img?: string | null | undefined, status?: number | null | undefined, username?: string | null | undefined, wallet_address: string, is_email_verified?: number | null | undefined, social_links?: { __typename?: 'SocialLinkModel', id: number, instagram_link?: string | null | undefined, website_link?: string | null | undefined } | null | undefined } };

export type GetAccountListsPaginateForSearchQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  totalItem?: InputMaybe<Scalars['Int']>;
  withItem?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetAccountListsPaginateForSearchQuery = { __typename?: 'Query', getAccountListsPaginate: { __typename?: 'UserConnection', totalCount?: number | null | undefined, edges?: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: number, username?: string | null | undefined, profile_img?: string | null | undefined, wallet_address: string, ownedItems?: Array<{ __typename?: 'Item', id: number, name: string, thumbnail_path?: string | null | undefined }> | null | undefined } }> | null | undefined } };

export type GetActiveSellOfferListsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetActiveSellOfferListsQuery = { __typename?: 'Query', getActiveSellOfferLists: { __typename?: 'SellOfferConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, startCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'SellOfferEdge', node: { __typename?: 'SellOffer', id: number, total_amount: any, created_at: any, end_date: any, item?: { __typename?: 'Item', name: string, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, slug: string, collection?: { __typename?: 'Collection', name: string, slug: string } | null | undefined } | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined, wallet_address: string } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, contract_address?: string | null | undefined, name: string, logo?: string | null | undefined, token_symbol?: string | null | undefined, usd_rate: any } | null | undefined } }> | null | undefined } };

export type GetBlockchainListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', chain_id?: number | null | undefined, currency_symbol: string, exchange_contract?: string | null | undefined, exchange_contract_name?: string | null | undefined, exchange_contract_version?: string | null | undefined, explorer_url?: string | null | undefined, id: number, description?: string | null | undefined, logo?: string | null | undefined, network_name: string, nft_contract?: string | null | undefined, provider: number, status?: number | null | undefined, payment_tokens?: Array<{ __typename?: 'PaymentTokenModel', blockchain_id: number, contract_address?: string | null | undefined, id: number, is_default: number, logo?: string | null | undefined, min_amount_to_execute_auction: any, name: string, status?: number | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, type: number }> | null | undefined }> };

export type GetBlockchainListsForChainIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsForChainIdsQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', chain_id?: number | null | undefined }> };

export type GetBlockchainListsForFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockchainListsForFilterQuery = { __typename?: 'Query', getBlockchainLists: Array<{ __typename?: 'BlockchainModel', id: number, chain_id?: number | null | undefined, network_name: string, logo?: string | null | undefined, status?: number | null | undefined }> };

export type GetBuyOfferByIdQueryVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type GetBuyOfferByIdQuery = { __typename?: 'Query', getBuyOfferById: { __typename?: 'BuyOffer', id: number, uid: string, signature?: string | null | undefined, nonce: string, start_date: any, end_date: any, total_amount: any, seller_amount: any, fee_amount: any, fee_percentage: number, royalty_percentage: number, royalty_amount: any, royalty_address?: string | null | undefined, user?: { __typename?: 'User', wallet_address: string } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, logo?: string | null | undefined } | null | undefined } };

export type GetCategoriesQueryVariables = Exact<{
  status?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, image?: string | null | undefined, title: string, status: number }> };

export type GetCategoriesForMarketPlaceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesForMarketPlaceQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, title: string }> };

export type GetCollectionDetailsQueryVariables = Exact<{
  slug: Scalars['String'];
  user_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type GetCollectionDetailsQuery = { __typename?: 'Query', getCollectionDetails: { __typename?: 'CollectionWithMeta', itemCount: number, owner_count?: number | null | undefined, is_watched: boolean, native_token?: { __typename?: 'PaymentTokenModel', id: number, usd_rate: any, logo?: string | null | undefined, name: string, token_symbol?: string | null | undefined } | null | undefined, volume?: { __typename?: 'PriceConvertModel', native_price?: number | null | undefined, usd_price?: number | null | undefined } | null | undefined, floor_price?: { __typename?: 'PriceConvertModel', native_price?: number | null | undefined, usd_price?: number | null | undefined } | null | undefined, collection: { __typename?: 'Collection', id: number, name: string, slug: string, description?: string | null | undefined, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, royalties?: number | null | undefined, payout_address?: string | null | undefined, contract_address?: string | null | undefined, category_id: number, blockchain_id: number, display_theme: number, is_sensitive: number, status: number, blockchain?: { __typename?: 'BlockchainModel', id: number, status?: number | null | undefined, chain_id?: number | null | undefined, description?: string | null | undefined, currency_symbol: string, explorer_url?: string | null | undefined, logo?: string | null | undefined, network_name: string, nft_contract?: string | null | undefined, payment_tokens?: Array<{ __typename?: 'PaymentTokenModel', blockchain_id: number, contract_address?: string | null | undefined, id: number, is_default: number, is_wrapable: number, logo?: string | null | undefined, min_amount_to_execute_auction: any, name: string, status?: number | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, type: number }> | null | undefined } | null | undefined, user?: { __typename?: 'User', id: number, name?: string | null | undefined, username?: string | null | undefined, wallet_address: string } | null | undefined }, social_links: { __typename?: 'SocialLinkModel', instagram_link?: string | null | undefined, website_link?: string | null | undefined, discord_link?: string | null | undefined, medium_link?: string | null | undefined }, token_mappings: Array<{ __typename?: 'PaymentTokenMappingModel', payment_token: { __typename?: 'PaymentTokenModel', blockchain_id: number, contract_address?: string | null | undefined, id: number, is_default: number, is_wrapable: number, logo?: string | null | undefined, min_amount_to_execute_auction: any, name: string, status?: number | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, type: number } }> } };

export type GetCollectionListsForSearchQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  totalItem?: InputMaybe<Scalars['Int']>;
  withItem?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetCollectionListsForSearchQuery = { __typename?: 'Query', getCollectionListsPaginate: { __typename?: 'CollectionConnection', totalCount?: number | null | undefined, edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: number, name: string, slug: string, logo: string, royalties?: number | null | undefined, blockchain?: { __typename?: 'BlockchainModel', id: number, logo?: string | null | undefined, network_name: string } | null | undefined, user?: { __typename?: 'User', id: number, username?: string | null | undefined } | null | undefined, items?: Array<{ __typename?: 'Item', id: number, name: string, thumbnail_path?: string | null | undefined }> | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined, metadata?: { __typename?: 'CollectionModelMetadata', owner_count?: number | null | undefined, floor_price?: { __typename?: 'PriceConvertModel', usd_price?: number | null | undefined, native_price?: number | null | undefined } | null | undefined, volume?: { __typename?: 'PriceConvertModel', usd_price?: number | null | undefined, native_price?: number | null | undefined } | null | undefined, native_token?: { __typename?: 'PaymentTokenModel', id: number, usd_rate: any, logo?: string | null | undefined, name: string, token_symbol?: string | null | undefined } | null | undefined } | null | undefined } }> | null | undefined } };

export type GetCollectionListsPaginateQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionOrder>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
  category_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetCollectionListsPaginateQuery = { __typename?: 'Query', getCollectionListsPaginate: { __typename?: 'CollectionConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: number, name: string, slug: string, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined, user?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined } }> | null | undefined } };

export type GetCollectionListsPaginateForFilterQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetCollectionListsPaginateForFilterQuery = { __typename?: 'Query', getCollectionListsPaginate: { __typename?: 'CollectionConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: number, name: string, slug: string, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined } }> | null | undefined } };

export type GetCreatorEarningListPaginateQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetCreatorEarningListPaginateQuery = { __typename?: 'Query', getCreatorEarningListPaginate: { __typename?: 'CreatorEarningConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CreatorEarningEdge', cursor: string, node: { __typename?: 'CreatorEarning', royalty_amount: any, royalty_address?: string | null | undefined, created_at: any, item?: { __typename?: 'Item', collection_id: number, name: string, slug: string, thumbnail_path?: string | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', token_symbol?: string | null | undefined, logo?: string | null | undefined } | null | undefined } }> | null | undefined } };

export type GetDayWiseCollectionPriceQueryVariables = Exact<{
  collection_id: Scalars['Int'];
  days: Scalars['String'];
}>;


export type GetDayWiseCollectionPriceQuery = { __typename?: 'Query', getDayWiseCollectionPrice?: { __typename?: 'PriceCalculationModel', total_avg_price: number, total_sum_price: number, day_wise_price_count: Array<{ __typename?: 'DayWisePriceCountModel', date: any, avg_price: number, sum_price: number }> } | null | undefined };

export type GetDayWiseItemPriceQueryVariables = Exact<{
  item_id: Scalars['Int'];
  days: Scalars['String'];
}>;


export type GetDayWiseItemPriceQuery = { __typename?: 'Query', getDayWiseItemPrice?: { __typename?: 'PriceCalculationModel', total_avg_price: number, total_sum_price: number, day_wise_price_count: Array<{ __typename?: 'DayWisePriceCountModel', date: any, avg_price: number, sum_price: number }> } | null | undefined };

export type GetFeaturedCollectionListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetFeaturedCollectionListQuery = { __typename?: 'Query', getFeaturedCollectionList: Array<{ __typename?: 'Collection', id: number, name: string, description?: string | null | undefined, slug: string, feature_image?: string | null | undefined, logo: string }> };

export type GetItemActivitiesQueryVariables = Exact<{
  item_id: Scalars['Int'];
  events?: InputMaybe<Scalars['String']>;
}>;


export type GetItemActivitiesQuery = { __typename?: 'Query', getItemActivities: Array<{ __typename?: 'ItemActivity', id: number, item_id: number, hash?: string | null | undefined, amount?: string | null | undefined, event: number, status: number, created_at: any, updated_at: any, from?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, to?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, item?: { __typename?: 'Item', owner?: { __typename?: 'User', id: number, name?: string | null | undefined } | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, logo?: string | null | undefined } | null | undefined }> };

export type GetItemActivitiesPaginateQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  collection_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  event_type?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  item_id?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
}>;


export type GetItemActivitiesPaginateQuery = { __typename?: 'Query', getItemActivitiesPaginate: { __typename?: 'ItemActivitiesConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, startCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'ItemActivityEdge', node: { __typename?: 'ItemActivity', id: number, item_id: number, hash?: string | null | undefined, amount?: string | null | undefined, event: number, status: number, created_at: any, updated_at: any, from?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, to?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined, item?: { __typename?: 'Item', name: string, slug: string, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, owner?: { __typename?: 'User', id: number, name?: string | null | undefined } | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, logo?: string | null | undefined } | null | undefined } }> | null | undefined } };

export type GetItemListsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  viewer_id?: InputMaybe<Scalars['Int']>;
  blockchain_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  category_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  collection_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  creator_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  max_price?: InputMaybe<Scalars['Float']>;
  min_price?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<ItemOrder>;
  owner_id?: InputMaybe<Scalars['Int']>;
  payment_token_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetItemListsQuery = { __typename?: 'Query', getItemLists: { __typename?: 'ItemConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'ItemEdge', node: { __typename?: 'Item', id: number, name: string, price: any, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, slug: string, like_count: number, item_favourite_lists?: Array<{ __typename?: 'ItemFavouriteList', id: number }> | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, logo?: string | null | undefined, token_symbol?: string | null | undefined } | null | undefined, collection?: { __typename?: 'Collection', id: number, name: string, slug: string } | null | undefined, owner?: { __typename?: 'User', name?: string | null | undefined, username?: string | null | undefined, id: number, wallet_address: string } | null | undefined } }> | null | undefined } };

export type GetItemListsForAssetDetailsQueryVariables = Exact<{
  viewer_id?: InputMaybe<Scalars['Int']>;
  collection_id?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;


export type GetItemListsForAssetDetailsQuery = { __typename?: 'Query', getItemLists: { __typename?: 'ItemConnection', totalCount?: number | null | undefined, edges?: Array<{ __typename?: 'ItemEdge', node: { __typename?: 'Item', id: number, name: string, filetype: string, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, like_count: number, price: any, slug: string, token_id?: string | null | undefined, item_favourite_lists?: Array<{ __typename?: 'ItemFavouriteList', id: number }> | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', logo?: string | null | undefined, token_symbol?: string | null | undefined } | null | undefined } }> | null | undefined } };

export type GetItemUnlockAbleContentQueryVariables = Exact<{
  item_slug: Scalars['String'];
}>;


export type GetItemUnlockAbleContentQuery = { __typename?: 'Query', getItemUnlockAbleContent: string };

export type GetItemsTokensQueryVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type GetItemsTokensQuery = { __typename?: 'Query', getItemsTokens: Array<{ __typename?: 'PaymentTokenModel', id: number, is_default: number, is_wrapable: number, logo?: string | null | undefined, min_amount_to_execute_auction: any, name: string, token_symbol?: string | null | undefined, total_decimal: number, type: number, usd_rate: any, contract_address?: string | null | undefined }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', wallet_address: string } };

export type GetNativeNwrapTokenQueryVariables = Exact<{
  blockchain_id?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetNativeNwrapTokenQuery = { __typename?: 'Query', getNativeNwrapToken: { __typename?: 'NativeNwrapTokenModel', native_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, is_wrapable: number, is_default: number, min_amount_to_execute_auction: any, type: number, logo?: string | null | undefined, usd_rate: any, blockchain?: { __typename?: 'BlockchainModel', id: number, network_name: string } | null | undefined } | null | undefined, wrap_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, is_wrapable: number, is_default: number, min_amount_to_execute_auction: any, type: number, logo?: string | null | undefined, usd_rate: any, blockchain?: { __typename?: 'BlockchainModel', id: number, network_name: string } | null | undefined } | null | undefined } };

export type GetNotificationSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationSettingsQuery = { __typename?: 'Query', getNotificationSettings?: { __typename?: 'NotificationSettingModel', events?: string | null | undefined, id: number, user_id: number } | null | undefined };

export type GetNotificationSettingsEventQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationSettingsEventQuery = { __typename?: 'Query', getNotificationSettingsEvent: Array<{ __typename?: 'NotificationEventModel', description?: string | null | undefined, id: number, status: number, title?: string | null | undefined }> };

export type GetRankingListQueryVariables = Exact<{
  blockchain_id?: InputMaybe<Scalars['Int']>;
  days: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetRankingListQuery = { __typename?: 'Query', getRankingList: Array<{ __typename?: 'Ranking', id: number, one_day_volume_in_native?: any | null | undefined, one_day_volume_in_usd?: any | null | undefined, one_day_volume_percent?: number | null | undefined, seven_days_volume_in_native?: any | null | undefined, seven_days_volume_in_usd?: any | null | undefined, seven_days_volume_percent?: number | null | undefined, thirty_days_volume_in_native?: any | null | undefined, thirty_days_volume_in_usd?: any | null | undefined, thirty_days_volume_percent?: number | null | undefined, floor_price_in_native?: any | null | undefined, floor_price_in_usd?: any | null | undefined, native_token?: { __typename?: 'PaymentTokenModel', id: number, logo?: string | null | undefined, name: string, token_symbol?: string | null | undefined } | null | undefined, collection?: { __typename?: 'Collection', id: number, slug: string, name: string, logo: string } | null | undefined }> };

export type GetSellOfferListsByUserQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  status: Scalars['Int'];
  user_id?: InputMaybe<Scalars['Int']>;
  user_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type GetSellOfferListsByUserQuery = { __typename?: 'Query', getSellOfferListsByUser: { __typename?: 'SellOfferConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, startCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'SellOfferEdge', node: { __typename?: 'SellOffer', id: number, total_amount: any, created_at: any, end_date: any, item?: { __typename?: 'Item', name: string, thumbnail_path?: string | null | undefined, slug: string, collection?: { __typename?: 'Collection', name: string, slug: string } | null | undefined } | null | undefined, user?: { __typename?: 'User', username?: string | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, logo?: string | null | undefined } | null | undefined } }> | null | undefined } };

export type GetSettingsDataQueryVariables = Exact<{
  optionGroup?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetSettingsDataQuery = { __typename?: 'Query', getSettingsData: Array<{ __typename?: 'Setting', id: number, option_key: string, option_group?: string | null | undefined, option_value?: string | null | undefined }> };

export type GetTokenListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenListsQuery = { __typename?: 'Query', getTokenLists: Array<{ __typename?: 'PaymentTokenModel', id: number, name: string, logo?: string | null | undefined, token_symbol?: string | null | undefined, status?: number | null | undefined }> };

export type GetTokenListsForWalletQueryVariables = Exact<{
  chain_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetTokenListsForWalletQuery = { __typename?: 'Query', getTokenLists: Array<{ __typename?: 'PaymentTokenModel', id: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, is_wrapable: number, is_default: number, min_amount_to_execute_auction: any, type: number, logo?: string | null | undefined, usd_rate: any, blockchain?: { __typename?: 'BlockchainModel', network_name: string } | null | undefined }> };

export type GetTokenListsPaginateForFilterQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  collection_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetTokenListsPaginateForFilterQuery = { __typename?: 'Query', getTokenListsPaginate: { __typename?: 'PaymentTokenConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'PaymentTokenModelEdge', node: { __typename?: 'PaymentTokenModel', id: number, name: string, logo?: string | null | undefined, token_symbol?: string | null | undefined } }> | null | undefined } };

export type GetTopCollectionListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetTopCollectionListQuery = { __typename?: 'Query', getTopCollectionList: Array<{ __typename?: 'Collection', id: number, name: string, slug: string, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined, user?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined }> };

export type GetTrendingCollectionListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetTrendingCollectionListQuery = { __typename?: 'Query', getTrendingCollectionList: Array<{ __typename?: 'Collection', id: number, name: string, username?: string | null | undefined, user_wallet_address?: string | null | undefined, user_id?: number | null | undefined, slug: string, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined }> };

export type GetTrendingItemListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  viewer_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetTrendingItemListQuery = { __typename?: 'Query', getTrendingItemList: Array<{ __typename?: 'Item', description?: string | null | undefined, external_url?: string | null | undefined, id: number, is_minted: number, is_unlockable_content?: number | null | undefined, like_count: number, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, name: string, price: any, slug: string, status: number, token_id?: string | null | undefined, token_uri?: string | null | undefined, unlockable_content?: string | null | undefined, view_count: number, item_favourite_lists?: Array<{ __typename?: 'ItemFavouriteList', id: number }> | null | undefined, owner?: { __typename?: 'User', name?: string | null | undefined, username?: string | null | undefined, id: number, wallet_address: string } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, logo?: string | null | undefined, token_symbol?: string | null | undefined } | null | undefined }> };

export type GetUserBuyOfferListsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  collection_id?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offer_maker_id?: InputMaybe<Scalars['Int']>;
  offer_receiver_id?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetUserBuyOfferListsQuery = { __typename?: 'Query', getUserBuyOfferLists: { __typename?: 'BuyOfferConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'BuyOfferEdge', cursor: string, node: { __typename?: 'BuyOffer', created_at: any, end_date: any, fee_amount: any, total_amount: any, start_date: any, fee_percentage: number, id: number, user_id: number, item_id: number, user?: { __typename?: 'User', name?: string | null | undefined, username?: string | null | undefined, wallet_address: string } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, logo?: string | null | undefined, name: string, token_symbol?: string | null | undefined, usd_rate: any } | null | undefined, item?: { __typename?: 'Item', id: number, slug: string, name: string, owner_id: number, status: number, creator?: { __typename?: 'User', wallet_address: string, username?: string | null | undefined } | null | undefined } | null | undefined } }> | null | undefined } };

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'User', wallet_address: string } };

export type GetUserItemFavouriteListsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  viewer_id?: InputMaybe<Scalars['Int']>;
  viewer_wallet_address?: InputMaybe<Scalars['String']>;
}>;


export type GetUserItemFavouriteListsQuery = { __typename?: 'Query', getUserItemFavouriteLists: { __typename?: 'ItemConnection', totalCount?: number | null | undefined, edges?: Array<{ __typename?: 'ItemEdge', cursor: string, node: { __typename?: 'Item', id: number, name: string, price: any, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, slug: string, like_count: number, item_favourite_lists?: Array<{ __typename?: 'ItemFavouriteList', id: number }> | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, logo?: string | null | undefined, token_symbol?: string | null | undefined } | null | undefined, collection?: { __typename?: 'Collection', id: number, name: string, slug: string } | null | undefined, owner?: { __typename?: 'User', name?: string | null | undefined, username?: string | null | undefined, id: number, wallet_address: string } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined } } };

export type GlobalSearchQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
}>;


export type GlobalSearchQuery = { __typename?: 'Query', globalSearch: { __typename?: 'SearchModel', account?: Array<{ __typename?: 'User', id: number, profile_img?: string | null | undefined, username?: string | null | undefined }> | null | undefined, collection?: Array<{ __typename?: 'Collection', id: number, name: string, slug: string, logo: string, blockchain?: { __typename?: 'BlockchainModel', id: number, logo?: string | null | undefined, network_name: string } | null | undefined }> | null | undefined, item?: Array<{ __typename?: 'Item', id: number, name: string, slug: string, thumbnail_path?: string | null | undefined }> | null | undefined } };

export type ItemBuyOfferListQueryVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type ItemBuyOfferListQuery = { __typename?: 'Query', itemBuyOfferList: Array<{ __typename?: 'BuyOffer', id: number, uid: string, status: number, type: number, seller_amount: any, total_amount: any, created_at: any, start_date: any, end_date: any, user?: { __typename?: 'User', id: number, wallet_address: string, username?: string | null | undefined } | null | undefined, payment_token?: { __typename?: 'PaymentTokenModel', id: number, type: number, name: string, contract_address?: string | null | undefined, token_symbol?: string | null | undefined, total_decimal: number, logo?: string | null | undefined, usd_rate: any } | null | undefined }> };

export type ItemBuyOfferListIdsQueryVariables = Exact<{
  item_id: Scalars['Int'];
}>;


export type ItemBuyOfferListIdsQuery = { __typename?: 'Query', itemBuyOfferList: Array<{ __typename?: 'BuyOffer', id: number, uid: string }> };

export type ItemDetailsForTransferQueryVariables = Exact<{
  slugOrTokenId: Scalars['String'];
}>;


export type ItemDetailsForTransferQuery = { __typename?: 'Query', ItemDetailsBySlugOrTokenId: { __typename?: 'Item', id: number, name: string, slug: string, media_path?: string | null | undefined, thumbnail_path?: string | null | undefined, token_id?: string | null | undefined, is_minted: number, owner?: { __typename?: 'User', id: number, wallet_address: string } | null | undefined, collection?: { __typename?: 'Collection', id: number, blockchain?: { __typename?: 'BlockchainModel', id: number, chain_id?: number | null | undefined, status?: number | null | undefined, nft_contract?: string | null | undefined, exchange_contract?: string | null | undefined, exchange_contract_name?: string | null | undefined, exchange_contract_version?: string | null | undefined } | null | undefined } | null | undefined, active_sell?: { __typename?: 'SellOffer', id: number } | null | undefined, active_buy?: { __typename?: 'BuyOffer', id: number } | null | undefined } };

export type MyCollectionWatchListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type MyCollectionWatchListQuery = { __typename?: 'Query', myCollectionWatchList: { __typename?: 'CollectionConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: number, name: string, slug: string, logo: string, feature_image?: string | null | undefined, banner_image?: string | null | undefined, _count?: { __typename?: 'Count', items: number } | null | undefined, user?: { __typename?: 'User', id: number, username?: string | null | undefined, wallet_address: string } | null | undefined } }> | null | undefined } };


export const AcceptOfferDocument = `
    mutation acceptOffer($offerId: Int!) {
  acceptOffer(offerId: $offerId) {
    id
    uid
    item {
      id
      token_id
      token_uri
    }
    payment_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
    }
  }
}
    `;
export const useAcceptOfferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AcceptOfferMutation, TError, AcceptOfferMutationVariables, TContext>) =>
    useMutation<AcceptOfferMutation, TError, AcceptOfferMutationVariables, TContext>(
      'acceptOffer',
      (variables?: AcceptOfferMutationVariables) => graphqlFetcher<AcceptOfferMutation, AcceptOfferMutationVariables>(AcceptOfferDocument, variables)(),
      options
    );
export const BuyNowDocument = `
    mutation buyNow($offerId: Int!) {
  buyNow(offerId: $offerId) {
    id
    uid
    item {
      id
      token_id
      token_uri
    }
    payment_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
    }
  }
}
    `;
export const useBuyNowMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BuyNowMutation, TError, BuyNowMutationVariables, TContext>) =>
    useMutation<BuyNowMutation, TError, BuyNowMutationVariables, TContext>(
      'buyNow',
      (variables?: BuyNowMutationVariables) => graphqlFetcher<BuyNowMutation, BuyNowMutationVariables>(BuyNowDocument, variables)(),
      options
    );
export const CancelBuyOfferDocument = `
    mutation cancelBuyOffer($sell_uid: String!) {
  cancelBuyOffer(sell_uid: $sell_uid) {
    code
    message
    success
  }
}
    `;
export const useCancelBuyOfferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CancelBuyOfferMutation, TError, CancelBuyOfferMutationVariables, TContext>) =>
    useMutation<CancelBuyOfferMutation, TError, CancelBuyOfferMutationVariables, TContext>(
      'cancelBuyOffer',
      (variables?: CancelBuyOfferMutationVariables) => graphqlFetcher<CancelBuyOfferMutation, CancelBuyOfferMutationVariables>(CancelBuyOfferDocument, variables)(),
      options
    );
export const CancelExchangeDocument = `
    mutation cancelExchange($exchangeId: Int!) {
  cancelExchange(exchangeId: $exchangeId) {
    success
    code
    message
  }
}
    `;
export const useCancelExchangeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CancelExchangeMutation, TError, CancelExchangeMutationVariables, TContext>) =>
    useMutation<CancelExchangeMutation, TError, CancelExchangeMutationVariables, TContext>(
      'cancelExchange',
      (variables?: CancelExchangeMutationVariables) => graphqlFetcher<CancelExchangeMutation, CancelExchangeMutationVariables>(CancelExchangeDocument, variables)(),
      options
    );
export const CancelSellOfferDocument = `
    mutation cancelSellOffer($sell_uid: String!) {
  cancelSellOffer(sell_uid: $sell_uid) {
    code
    message
    success
  }
}
    `;
export const useCancelSellOfferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CancelSellOfferMutation, TError, CancelSellOfferMutationVariables, TContext>) =>
    useMutation<CancelSellOfferMutation, TError, CancelSellOfferMutationVariables, TContext>(
      'cancelSellOffer',
      (variables?: CancelSellOfferMutationVariables) => graphqlFetcher<CancelSellOfferMutation, CancelSellOfferMutationVariables>(CancelSellOfferDocument, variables)(),
      options
    );
export const CancelTransferDocument = `
    mutation cancelTransfer($transfer_id: Int!) {
  cancelTransfer(transfer_id: $transfer_id) {
    code
    success
    message
  }
}
    `;
export const useCancelTransferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CancelTransferMutation, TError, CancelTransferMutationVariables, TContext>) =>
    useMutation<CancelTransferMutation, TError, CancelTransferMutationVariables, TContext>(
      'cancelTransfer',
      (variables?: CancelTransferMutationVariables) => graphqlFetcher<CancelTransferMutation, CancelTransferMutationVariables>(CancelTransferDocument, variables)(),
      options
    );
export const CollectionWatchListToggleDocument = `
    mutation collectionWatchListToggle($collectionId: Int!) {
  collectionWatchListToggle(collectionId: $collectionId) {
    code
    message
    success
  }
}
    `;
export const useCollectionWatchListToggleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CollectionWatchListToggleMutation, TError, CollectionWatchListToggleMutationVariables, TContext>) =>
    useMutation<CollectionWatchListToggleMutation, TError, CollectionWatchListToggleMutationVariables, TContext>(
      'collectionWatchListToggle',
      (variables?: CollectionWatchListToggleMutationVariables) => graphqlFetcher<CollectionWatchListToggleMutation, CollectionWatchListToggleMutationVariables>(CollectionWatchListToggleDocument, variables)(),
      options
    );
export const CreateBuyOfferDocument = `
    mutation createBuyOffer($amount: Float!, $end_date: String!, $item_id: Int!, $nonce: String!, $payment_token_id: Int!, $signature: String!, $start_date: String!, $type: Int!) {
  createBuyOffer(
    data: {amount: $amount, end_date: $end_date, item_id: $item_id, nonce: $nonce, payment_token_id: $payment_token_id, signature: $signature, start_date: $start_date, type: $type}
  ) {
    id
    status
  }
}
    `;
export const useCreateBuyOfferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBuyOfferMutation, TError, CreateBuyOfferMutationVariables, TContext>) =>
    useMutation<CreateBuyOfferMutation, TError, CreateBuyOfferMutationVariables, TContext>(
      'createBuyOffer',
      (variables?: CreateBuyOfferMutationVariables) => graphqlFetcher<CreateBuyOfferMutation, CreateBuyOfferMutationVariables>(CreateBuyOfferDocument, variables)(),
      options
    );
export const CreateCollectionDocument = `
    mutation createCollection($name: String!, $slug: String, $description: String, $logo_file: Upload!, $feature_image_file: Upload, $banner_image_file: Upload, $category_id: Int!, $blockchain_id: Int!, $display_theme: Int!, $payment_tokens: String, $is_sensitive: Int!, $website_link: String, $discord_link: String, $instagram_link: String, $medium_link: String, $royalties: Float!, $payout_address: String) {
  createCollection(
    data: {name: $name, slug: $slug, description: $description, logo_file: $logo_file, feature_image_file: $feature_image_file, banner_image_file: $banner_image_file, category_id: $category_id, blockchain_id: $blockchain_id, display_theme: $display_theme, payment_tokens: $payment_tokens, is_sensitive: $is_sensitive, discord_link: $discord_link, website_link: $website_link, instagram_link: $instagram_link, medium_link: $medium_link, royalties: $royalties, payout_address: $payout_address}
  ) {
    id
    name
  }
}
    `;
export const useCreateCollectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>) =>
    useMutation<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>(
      'createCollection',
      (variables?: CreateCollectionMutationVariables) => graphqlFetcher<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument, variables)(),
      options
    );
export const CreateItemDocument = `
    mutation createItem($collection_id: Int!, $description: String, $external_url: String, $is_unlockable_content: Int!, $media_file: Upload!, $thumbnail_file: Upload, $name: String!, $unlockable_content: String) {
  createItem(
    data: {collection_id: $collection_id, description: $description, external_url: $external_url, is_unlockable_content: $is_unlockable_content, media_file: $media_file, thumbnail_file: $thumbnail_file, name: $name, unlockable_content: $unlockable_content}
  ) {
    id
    name
    slug
    token_id
  }
}
    `;
export const useCreateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateItemMutation, TError, CreateItemMutationVariables, TContext>) =>
    useMutation<CreateItemMutation, TError, CreateItemMutationVariables, TContext>(
      'createItem',
      (variables?: CreateItemMutationVariables) => graphqlFetcher<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, variables)(),
      options
    );
export const CreateSellOfferDocument = `
    mutation createSellOffer($amount: Float!, $end_date: String!, $item_id: Int!, $nonce: String!, $payment_token_id: Int!, $reserved_address: String, $reserved_price: Int, $signature: String!, $start_date: String!, $type: Int!) {
  createSellOffer(
    data: {amount: $amount, end_date: $end_date, item_id: $item_id, nonce: $nonce, payment_token_id: $payment_token_id, reserved_address: $reserved_address, reserved_price: $reserved_price, signature: $signature, start_date: $start_date, type: $type}
  ) {
    id
    status
  }
}
    `;
export const useCreateSellOfferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateSellOfferMutation, TError, CreateSellOfferMutationVariables, TContext>) =>
    useMutation<CreateSellOfferMutation, TError, CreateSellOfferMutationVariables, TContext>(
      'createSellOffer',
      (variables?: CreateSellOfferMutationVariables) => graphqlFetcher<CreateSellOfferMutation, CreateSellOfferMutationVariables>(CreateSellOfferDocument, variables)(),
      options
    );
export const CreateTransferDocument = `
    mutation createTransfer($item_id: Int!, $to_address: String!) {
  createTransfer(item_id: $item_id, to_address: $to_address) {
    id
    uid
    status
    transaction_hash
  }
}
    `;
export const useCreateTransferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTransferMutation, TError, CreateTransferMutationVariables, TContext>) =>
    useMutation<CreateTransferMutation, TError, CreateTransferMutationVariables, TContext>(
      'createTransfer',
      (variables?: CreateTransferMutationVariables) => graphqlFetcher<CreateTransferMutation, CreateTransferMutationVariables>(CreateTransferDocument, variables)(),
      options
    );
export const DeleteCollectionDocument = `
    mutation deleteCollection($id: Int!) {
  deleteCollection(collectionId: $id) {
    success
    message
    code
  }
}
    `;
export const useDeleteCollectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCollectionMutation, TError, DeleteCollectionMutationVariables, TContext>) =>
    useMutation<DeleteCollectionMutation, TError, DeleteCollectionMutationVariables, TContext>(
      'deleteCollection',
      (variables?: DeleteCollectionMutationVariables) => graphqlFetcher<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument, variables)(),
      options
    );
export const FinishExchangDocument = `
    mutation finishExchang($exchangeId: Int!, $transactionHash: String!) {
  finishExchang(exchangeId: $exchangeId, transactionHash: $transactionHash) {
    success
    code
    message
  }
}
    `;
export const useFinishExchangMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FinishExchangMutation, TError, FinishExchangMutationVariables, TContext>) =>
    useMutation<FinishExchangMutation, TError, FinishExchangMutationVariables, TContext>(
      'finishExchang',
      (variables?: FinishExchangMutationVariables) => graphqlFetcher<FinishExchangMutation, FinishExchangMutationVariables>(FinishExchangDocument, variables)(),
      options
    );
export const FinishTransferDocument = `
    mutation finishTransfer($transaction_hash: String!, $transfer_id: Int!) {
  finishTransfer(transaction_hash: $transaction_hash, transfer_id: $transfer_id) {
    code
    success
    message
  }
}
    `;
export const useFinishTransferMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FinishTransferMutation, TError, FinishTransferMutationVariables, TContext>) =>
    useMutation<FinishTransferMutation, TError, FinishTransferMutationVariables, TContext>(
      'finishTransfer',
      (variables?: FinishTransferMutationVariables) => graphqlFetcher<FinishTransferMutation, FinishTransferMutationVariables>(FinishTransferDocument, variables)(),
      options
    );
export const GenerateLoginMessageDocument = `
    mutation generateLoginMessage($wallet_address: String!) {
  generateLoginMessage(wallet_address: $wallet_address) {
    login_message
    nonce
  }
}
    `;
export const useGenerateLoginMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GenerateLoginMessageMutation, TError, GenerateLoginMessageMutationVariables, TContext>) =>
    useMutation<GenerateLoginMessageMutation, TError, GenerateLoginMessageMutationVariables, TContext>(
      'generateLoginMessage',
      (variables?: GenerateLoginMessageMutationVariables) => graphqlFetcher<GenerateLoginMessageMutation, GenerateLoginMessageMutationVariables>(GenerateLoginMessageDocument, variables)(),
      options
    );
export const ItemFavouriteListToggleDocument = `
    mutation itemFavouriteListToggle($item_id: Int!) {
  itemFavouriteListToggle(item_id: $item_id) {
    count
  }
}
    `;
export const useItemFavouriteListToggleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ItemFavouriteListToggleMutation, TError, ItemFavouriteListToggleMutationVariables, TContext>) =>
    useMutation<ItemFavouriteListToggleMutation, TError, ItemFavouriteListToggleMutationVariables, TContext>(
      'itemFavouriteListToggle',
      (variables?: ItemFavouriteListToggleMutationVariables) => graphqlFetcher<ItemFavouriteListToggleMutation, ItemFavouriteListToggleMutationVariables>(ItemFavouriteListToggleDocument, variables)(),
      options
    );
export const ItemReMintDocument = `
    mutation itemReMint($activity_id: Int!) {
  itemReMint(activity_id: $activity_id) {
    success
    message
  }
}
    `;
export const useItemReMintMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ItemReMintMutation, TError, ItemReMintMutationVariables, TContext>) =>
    useMutation<ItemReMintMutation, TError, ItemReMintMutationVariables, TContext>(
      'itemReMint',
      (variables?: ItemReMintMutationVariables) => graphqlFetcher<ItemReMintMutation, ItemReMintMutationVariables>(ItemReMintDocument, variables)(),
      options
    );
export const ItemViewCountDocument = `
    mutation itemViewCount($item_id: Int!) {
  itemViewCount(item_id: $item_id) {
    count
  }
}
    `;
export const useItemViewCountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ItemViewCountMutation, TError, ItemViewCountMutationVariables, TContext>) =>
    useMutation<ItemViewCountMutation, TError, ItemViewCountMutationVariables, TContext>(
      'itemViewCount',
      (variables?: ItemViewCountMutationVariables) => graphqlFetcher<ItemViewCountMutation, ItemViewCountMutationVariables>(ItemViewCountDocument, variables)(),
      options
    );
export const ResendVerifcationEmailDocument = `
    mutation resendVerifcationEmail {
  resendVerifcationEmail {
    code
    message
    success
  }
}
    `;
export const useResendVerifcationEmailMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResendVerifcationEmailMutation, TError, ResendVerifcationEmailMutationVariables, TContext>) =>
    useMutation<ResendVerifcationEmailMutation, TError, ResendVerifcationEmailMutationVariables, TContext>(
      'resendVerifcationEmail',
      (variables?: ResendVerifcationEmailMutationVariables) => graphqlFetcher<ResendVerifcationEmailMutation, ResendVerifcationEmailMutationVariables>(ResendVerifcationEmailDocument, variables)(),
      options
    );
export const SaveNewsLetterSubscriptionDocument = `
    mutation saveNewsLetterSubscription($email: String!) {
  saveNewsLetterSubscription(email: $email) {
    success
    message
  }
}
    `;
export const useSaveNewsLetterSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SaveNewsLetterSubscriptionMutation, TError, SaveNewsLetterSubscriptionMutationVariables, TContext>) =>
    useMutation<SaveNewsLetterSubscriptionMutation, TError, SaveNewsLetterSubscriptionMutationVariables, TContext>(
      'saveNewsLetterSubscription',
      (variables?: SaveNewsLetterSubscriptionMutationVariables) => graphqlFetcher<SaveNewsLetterSubscriptionMutation, SaveNewsLetterSubscriptionMutationVariables>(SaveNewsLetterSubscriptionDocument, variables)(),
      options
    );
export const SyncItemOwnerDocument = `
    mutation syncItemOwner($item_id: Int!) {
  syncItemOwner(item_id: $item_id) {
    success
    message
    code
  }
}
    `;
export const useSyncItemOwnerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SyncItemOwnerMutation, TError, SyncItemOwnerMutationVariables, TContext>) =>
    useMutation<SyncItemOwnerMutation, TError, SyncItemOwnerMutationVariables, TContext>(
      'syncItemOwner',
      (variables?: SyncItemOwnerMutationVariables) => graphqlFetcher<SyncItemOwnerMutation, SyncItemOwnerMutationVariables>(SyncItemOwnerDocument, variables)(),
      options
    );
export const UpdateCollectionDocument = `
    mutation updateCollection($id: Int!, $name: String!, $slug: String, $description: String, $logo_file: Upload, $feature_image_file: Upload, $banner_image_file: Upload, $category_id: Int!, $display_theme: Int!, $payment_tokens: String, $is_sensitive: Int!, $website_link: String, $discord_link: String, $instagram_link: String, $royalties: Float!, $medium_link: String, $payout_address: String) {
  updateCollection(
    id: $id
    data: {name: $name, slug: $slug, description: $description, logo_file: $logo_file, feature_image_file: $feature_image_file, banner_image_file: $banner_image_file, category_id: $category_id, display_theme: $display_theme, payment_tokens: $payment_tokens, is_sensitive: $is_sensitive, royalties: $royalties, discord_link: $discord_link, website_link: $website_link, instagram_link: $instagram_link, medium_link: $medium_link, payout_address: $payout_address}
  ) {
    id
    name
  }
}
    `;
export const useUpdateCollectionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCollectionMutation, TError, UpdateCollectionMutationVariables, TContext>) =>
    useMutation<UpdateCollectionMutation, TError, UpdateCollectionMutationVariables, TContext>(
      'updateCollection',
      (variables?: UpdateCollectionMutationVariables) => graphqlFetcher<UpdateCollectionMutation, UpdateCollectionMutationVariables>(UpdateCollectionDocument, variables)(),
      options
    );
export const UpdateItemDocument = `
    mutation updateItem($id: Int!, $description: String, $external_url: String, $is_unlockable_content: Int!, $unlockable_content: String) {
  updateItem(
    id: $id
    data: {description: $description, external_url: $external_url, is_unlockable_content: $is_unlockable_content, unlockable_content: $unlockable_content}
  ) {
    id
    name
    slug
    token_id
  }
}
    `;
export const useUpdateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>) =>
    useMutation<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>(
      'updateItem',
      (variables?: UpdateItemMutationVariables) => graphqlFetcher<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, variables)(),
      options
    );
export const UpdateProfileDocument = `
    mutation updateProfile($banner_img_file: Upload, $bio: String, $email: String, $instagram_link: String, $name: String, $phone: String, $profile_img_file: Upload, $username: String!, $website_link: String) {
  updateProfile(
    data: {banner_img_file: $banner_img_file, bio: $bio, email: $email, instagram_link: $instagram_link, name: $name, phone: $phone, profile_img_file: $profile_img_file, username: $username, website_link: $website_link}
  ) {
    code
    message
    success
  }
}
    `;
export const useUpdateProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>) =>
    useMutation<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>(
      'updateProfile',
      (variables?: UpdateProfileMutationVariables) => graphqlFetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, variables)(),
      options
    );
export const UserNotificationSettingSaveDocument = `
    mutation userNotificationSettingSave($events: [Int!]) {
  userNotificationSettingSave(data: {events: $events}) {
    code
    message
    success
  }
}
    `;
export const useUserNotificationSettingSaveMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UserNotificationSettingSaveMutation, TError, UserNotificationSettingSaveMutationVariables, TContext>) =>
    useMutation<UserNotificationSettingSaveMutation, TError, UserNotificationSettingSaveMutationVariables, TContext>(
      'userNotificationSettingSave',
      (variables?: UserNotificationSettingSaveMutationVariables) => graphqlFetcher<UserNotificationSettingSaveMutation, UserNotificationSettingSaveMutationVariables>(UserNotificationSettingSaveDocument, variables)(),
      options
    );
export const UserVerifyMailDocument = `
    mutation userVerifyMail($verificationCode: String!) {
  userVerifyMail(verificationCode: $verificationCode) {
    code
    message
    success
  }
}
    `;
export const useUserVerifyMailMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UserVerifyMailMutation, TError, UserVerifyMailMutationVariables, TContext>) =>
    useMutation<UserVerifyMailMutation, TError, UserVerifyMailMutationVariables, TContext>(
      'userVerifyMail',
      (variables?: UserVerifyMailMutationVariables) => graphqlFetcher<UserVerifyMailMutation, UserVerifyMailMutationVariables>(UserVerifyMailDocument, variables)(),
      options
    );
export const WalletLoginDocument = `
    mutation walletLogin($address: String!, $nonce: String!, $signature: String!) {
  walletLogin(data: {address: $address, nonce: $nonce, signature: $signature}) {
    accessToken
    expireAt
    refreshToken
  }
}
    `;
export const useWalletLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<WalletLoginMutation, TError, WalletLoginMutationVariables, TContext>) =>
    useMutation<WalletLoginMutation, TError, WalletLoginMutationVariables, TContext>(
      'walletLogin',
      (variables?: WalletLoginMutationVariables) => graphqlFetcher<WalletLoginMutation, WalletLoginMutationVariables>(WalletLoginDocument, variables)(),
      options
    );
export const ItemDetailsBySlugOrTokenIdDocument = `
    query ItemDetailsBySlugOrTokenId($slugOrTokenId: String!, $viewer_wallet_address: String) {
  ItemDetailsBySlugOrTokenId(
    slugOrTokenId: $slugOrTokenId
    viewer_wallet_address: $viewer_wallet_address
  ) {
    description
    external_url
    id
    is_minted
    is_unlockable_content
    like_count
    filetype
    media_path
    thumbnail_path
    name
    exchange_in_progress {
      id
    }
    collection {
      id
      name
      slug
      logo
      description
      royalties
      payout_address
      contract_address
      blockchain {
        status
        id
        chain_id
        explorer_url
        logo
        network_name
        exchange_contract
        exchange_contract_name
        exchange_contract_version
        nft_contract
      }
    }
    owner {
      id
      username
      wallet_address
    }
    creator {
      id
      username
      wallet_address
    }
    active_buy {
      id
      uid
      type
      total_amount
      start_date
      end_date
      created_at
      payment_token {
        id
        name
        contract_address
        token_symbol
        total_decimal
        logo
      }
      user {
        wallet_address
      }
    }
    active_sell {
      id
      uid
      nonce
      signature
      type
      total_amount
      seller_amount
      fee_amount
      royalty_address
      royalty_amount
      reserved_price
      start_date
      end_date
      created_at
      payment_token {
        id
        type
        name
        contract_address
        token_symbol
        total_decimal
        logo
        usd_rate
      }
      user {
        wallet_address
      }
    }
    highest_bid {
      fee_amount
      total_amount
    }
    price
    slug
    status
    token_id
    token_uri
    view_count
  }
}
    `;
export const useItemDetailsBySlugOrTokenIdQuery = <
      TData = ItemDetailsBySlugOrTokenIdQuery,
      TError = unknown
    >(
      variables: ItemDetailsBySlugOrTokenIdQueryVariables,
      options?: UseQueryOptions<ItemDetailsBySlugOrTokenIdQuery, TError, TData>
    ) =>
    useQuery<ItemDetailsBySlugOrTokenIdQuery, TError, TData>(
      ['ItemDetailsBySlugOrTokenId', variables],
      graphqlFetcher<ItemDetailsBySlugOrTokenIdQuery, ItemDetailsBySlugOrTokenIdQueryVariables>(ItemDetailsBySlugOrTokenIdDocument, variables),
      options
    );
export const useInfiniteItemDetailsBySlugOrTokenIdQuery = <
      TData = ItemDetailsBySlugOrTokenIdQuery,
      TError = unknown
    >(
      variables: ItemDetailsBySlugOrTokenIdQueryVariables,
      options?: UseInfiniteQueryOptions<ItemDetailsBySlugOrTokenIdQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemDetailsBySlugOrTokenIdQuery, TError, TData>(
      ['ItemDetailsBySlugOrTokenId.infinite', variables],
      (metaData) => graphqlFetcher<ItemDetailsBySlugOrTokenIdQuery, ItemDetailsBySlugOrTokenIdQueryVariables>(ItemDetailsBySlugOrTokenIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemDetailsForActiveBuyDocument = `
    query ItemDetailsForActiveBuy($slugOrTokenId: String!, $viewer_wallet_address: String) {
  ItemDetailsBySlugOrTokenId(
    slugOrTokenId: $slugOrTokenId
    viewer_wallet_address: $viewer_wallet_address
  ) {
    id
    name
    slug
    active_buy {
      id
      uid
      type
      total_amount
      start_date
      end_date
      created_at
      payment_token {
        id
        name
        contract_address
        token_symbol
        total_decimal
        logo
      }
      user {
        wallet_address
      }
    }
  }
}
    `;
export const useItemDetailsForActiveBuyQuery = <
      TData = ItemDetailsForActiveBuyQuery,
      TError = unknown
    >(
      variables: ItemDetailsForActiveBuyQueryVariables,
      options?: UseQueryOptions<ItemDetailsForActiveBuyQuery, TError, TData>
    ) =>
    useQuery<ItemDetailsForActiveBuyQuery, TError, TData>(
      ['ItemDetailsForActiveBuy', variables],
      graphqlFetcher<ItemDetailsForActiveBuyQuery, ItemDetailsForActiveBuyQueryVariables>(ItemDetailsForActiveBuyDocument, variables),
      options
    );
export const useInfiniteItemDetailsForActiveBuyQuery = <
      TData = ItemDetailsForActiveBuyQuery,
      TError = unknown
    >(
      variables: ItemDetailsForActiveBuyQueryVariables,
      options?: UseInfiniteQueryOptions<ItemDetailsForActiveBuyQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemDetailsForActiveBuyQuery, TError, TData>(
      ['ItemDetailsForActiveBuy.infinite', variables],
      (metaData) => graphqlFetcher<ItemDetailsForActiveBuyQuery, ItemDetailsForActiveBuyQueryVariables>(ItemDetailsForActiveBuyDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemDetailsForEditDocument = `
    query ItemDetailsForEdit($slugOrTokenId: String!) {
  ItemDetailsBySlugOrTokenId(slugOrTokenId: $slugOrTokenId) {
    id
    media_path
    thumbnail_path
    name
    external_url
    description
    is_unlockable_content
    unlockable_content
    collection {
      id
      logo
      name
      blockchain {
        id
        status
      }
    }
    owner {
      id
      wallet_address
    }
    active_sell {
      id
    }
  }
}
    `;
export const useItemDetailsForEditQuery = <
      TData = ItemDetailsForEditQuery,
      TError = unknown
    >(
      variables: ItemDetailsForEditQueryVariables,
      options?: UseQueryOptions<ItemDetailsForEditQuery, TError, TData>
    ) =>
    useQuery<ItemDetailsForEditQuery, TError, TData>(
      ['ItemDetailsForEdit', variables],
      graphqlFetcher<ItemDetailsForEditQuery, ItemDetailsForEditQueryVariables>(ItemDetailsForEditDocument, variables),
      options
    );
export const useInfiniteItemDetailsForEditQuery = <
      TData = ItemDetailsForEditQuery,
      TError = unknown
    >(
      variables: ItemDetailsForEditQueryVariables,
      options?: UseInfiniteQueryOptions<ItemDetailsForEditQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemDetailsForEditQuery, TError, TData>(
      ['ItemDetailsForEdit.infinite', variables],
      (metaData) => graphqlFetcher<ItemDetailsForEditQuery, ItemDetailsForEditQueryVariables>(ItemDetailsForEditDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemDetailsForHighestBidDocument = `
    query ItemDetailsForHighestBid($slugOrTokenId: String!) {
  ItemDetailsBySlugOrTokenId(slugOrTokenId: $slugOrTokenId) {
    highest_bid {
      fee_amount
      total_amount
    }
  }
}
    `;
export const useItemDetailsForHighestBidQuery = <
      TData = ItemDetailsForHighestBidQuery,
      TError = unknown
    >(
      variables: ItemDetailsForHighestBidQueryVariables,
      options?: UseQueryOptions<ItemDetailsForHighestBidQuery, TError, TData>
    ) =>
    useQuery<ItemDetailsForHighestBidQuery, TError, TData>(
      ['ItemDetailsForHighestBid', variables],
      graphqlFetcher<ItemDetailsForHighestBidQuery, ItemDetailsForHighestBidQueryVariables>(ItemDetailsForHighestBidDocument, variables),
      options
    );
export const useInfiniteItemDetailsForHighestBidQuery = <
      TData = ItemDetailsForHighestBidQuery,
      TError = unknown
    >(
      variables: ItemDetailsForHighestBidQueryVariables,
      options?: UseInfiniteQueryOptions<ItemDetailsForHighestBidQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemDetailsForHighestBidQuery, TError, TData>(
      ['ItemDetailsForHighestBid.infinite', variables],
      (metaData) => graphqlFetcher<ItemDetailsForHighestBidQuery, ItemDetailsForHighestBidQueryVariables>(ItemDetailsForHighestBidDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemExchangeInProgressDocument = `
    query ItemExchangeInProgress($slugOrTokenId: String!) {
  ItemDetailsBySlugOrTokenId(slugOrTokenId: $slugOrTokenId) {
    exchange_in_progress {
      id
    }
  }
}
    `;
export const useItemExchangeInProgressQuery = <
      TData = ItemExchangeInProgressQuery,
      TError = unknown
    >(
      variables: ItemExchangeInProgressQueryVariables,
      options?: UseQueryOptions<ItemExchangeInProgressQuery, TError, TData>
    ) =>
    useQuery<ItemExchangeInProgressQuery, TError, TData>(
      ['ItemExchangeInProgress', variables],
      graphqlFetcher<ItemExchangeInProgressQuery, ItemExchangeInProgressQueryVariables>(ItemExchangeInProgressDocument, variables),
      options
    );
export const useInfiniteItemExchangeInProgressQuery = <
      TData = ItemExchangeInProgressQuery,
      TError = unknown
    >(
      variables: ItemExchangeInProgressQueryVariables,
      options?: UseInfiniteQueryOptions<ItemExchangeInProgressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemExchangeInProgressQuery, TError, TData>(
      ['ItemExchangeInProgress.infinite', variables],
      (metaData) => graphqlFetcher<ItemExchangeInProgressQuery, ItemExchangeInProgressQueryVariables>(ItemExchangeInProgressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CheckCollectionWatchedByUserDocument = `
    query checkCollectionWatchedByUser($collection_id: Int!, $user_id: Int, $user_wallet_address: String) {
  checkCollectionWatchedByUser(
    collection_id: $collection_id
    user_id: $user_id
    user_wallet_address: $user_wallet_address
  )
}
    `;
export const useCheckCollectionWatchedByUserQuery = <
      TData = CheckCollectionWatchedByUserQuery,
      TError = unknown
    >(
      variables: CheckCollectionWatchedByUserQueryVariables,
      options?: UseQueryOptions<CheckCollectionWatchedByUserQuery, TError, TData>
    ) =>
    useQuery<CheckCollectionWatchedByUserQuery, TError, TData>(
      ['checkCollectionWatchedByUser', variables],
      graphqlFetcher<CheckCollectionWatchedByUserQuery, CheckCollectionWatchedByUserQueryVariables>(CheckCollectionWatchedByUserDocument, variables),
      options
    );
export const useInfiniteCheckCollectionWatchedByUserQuery = <
      TData = CheckCollectionWatchedByUserQuery,
      TError = unknown
    >(
      variables: CheckCollectionWatchedByUserQueryVariables,
      options?: UseInfiniteQueryOptions<CheckCollectionWatchedByUserQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckCollectionWatchedByUserQuery, TError, TData>(
      ['checkCollectionWatchedByUser.infinite', variables],
      (metaData) => graphqlFetcher<CheckCollectionWatchedByUserQuery, CheckCollectionWatchedByUserQueryVariables>(CheckCollectionWatchedByUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CheckItemFavouriteByUserDocument = `
    query checkItemFavouriteByUser($item_id: Int!, $viewer_id: Int, $viewer_wallet_address: String) {
  checkItemFavouriteByUser(
    item_id: $item_id
    viewer_id: $viewer_id
    viewer_wallet_address: $viewer_wallet_address
  )
}
    `;
export const useCheckItemFavouriteByUserQuery = <
      TData = CheckItemFavouriteByUserQuery,
      TError = unknown
    >(
      variables: CheckItemFavouriteByUserQueryVariables,
      options?: UseQueryOptions<CheckItemFavouriteByUserQuery, TError, TData>
    ) =>
    useQuery<CheckItemFavouriteByUserQuery, TError, TData>(
      ['checkItemFavouriteByUser', variables],
      graphqlFetcher<CheckItemFavouriteByUserQuery, CheckItemFavouriteByUserQueryVariables>(CheckItemFavouriteByUserDocument, variables),
      options
    );
export const useInfiniteCheckItemFavouriteByUserQuery = <
      TData = CheckItemFavouriteByUserQuery,
      TError = unknown
    >(
      variables: CheckItemFavouriteByUserQueryVariables,
      options?: UseInfiniteQueryOptions<CheckItemFavouriteByUserQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckItemFavouriteByUserQuery, TError, TData>(
      ['checkItemFavouriteByUser.infinite', variables],
      (metaData) => graphqlFetcher<CheckItemFavouriteByUserQuery, CheckItemFavouriteByUserQueryVariables>(CheckItemFavouriteByUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CheckUniqueCollectionDocument = `
    query checkUniqueCollection($id: Int, $name: String, $slug: String) {
  checkUniqueCollection(id: $id, name: $name, slug: $slug) {
    success
    message
  }
}
    `;
export const useCheckUniqueCollectionQuery = <
      TData = CheckUniqueCollectionQuery,
      TError = unknown
    >(
      variables?: CheckUniqueCollectionQueryVariables,
      options?: UseQueryOptions<CheckUniqueCollectionQuery, TError, TData>
    ) =>
    useQuery<CheckUniqueCollectionQuery, TError, TData>(
      variables === undefined ? ['checkUniqueCollection'] : ['checkUniqueCollection', variables],
      graphqlFetcher<CheckUniqueCollectionQuery, CheckUniqueCollectionQueryVariables>(CheckUniqueCollectionDocument, variables),
      options
    );
export const useInfiniteCheckUniqueCollectionQuery = <
      TData = CheckUniqueCollectionQuery,
      TError = unknown
    >(
      variables?: CheckUniqueCollectionQueryVariables,
      options?: UseInfiniteQueryOptions<CheckUniqueCollectionQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckUniqueCollectionQuery, TError, TData>(
      variables === undefined ? ['checkUniqueCollection.infinite'] : ['checkUniqueCollection.infinite', variables],
      (metaData) => graphqlFetcher<CheckUniqueCollectionQuery, CheckUniqueCollectionQueryVariables>(CheckUniqueCollectionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CheckUniqueItemDocument = `
    query checkUniqueItem($name: String!, $id: Int) {
  checkUniqueItem(name: $name, id: $id) {
    code
    message
    success
  }
}
    `;
export const useCheckUniqueItemQuery = <
      TData = CheckUniqueItemQuery,
      TError = unknown
    >(
      variables: CheckUniqueItemQueryVariables,
      options?: UseQueryOptions<CheckUniqueItemQuery, TError, TData>
    ) =>
    useQuery<CheckUniqueItemQuery, TError, TData>(
      ['checkUniqueItem', variables],
      graphqlFetcher<CheckUniqueItemQuery, CheckUniqueItemQueryVariables>(CheckUniqueItemDocument, variables),
      options
    );
export const useInfiniteCheckUniqueItemQuery = <
      TData = CheckUniqueItemQuery,
      TError = unknown
    >(
      variables: CheckUniqueItemQueryVariables,
      options?: UseInfiniteQueryOptions<CheckUniqueItemQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckUniqueItemQuery, TError, TData>(
      ['checkUniqueItem.infinite', variables],
      (metaData) => graphqlFetcher<CheckUniqueItemQuery, CheckUniqueItemQueryVariables>(CheckUniqueItemDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CheckUniqueUserDocument = `
    query checkUniqueUser($wallet_address: String!, $email: String, $username: String) {
  checkUniqueUser(
    wallet_address: $wallet_address
    email: $email
    username: $username
  ) {
    code
    success
    message
  }
}
    `;
export const useCheckUniqueUserQuery = <
      TData = CheckUniqueUserQuery,
      TError = unknown
    >(
      variables: CheckUniqueUserQueryVariables,
      options?: UseQueryOptions<CheckUniqueUserQuery, TError, TData>
    ) =>
    useQuery<CheckUniqueUserQuery, TError, TData>(
      ['checkUniqueUser', variables],
      graphqlFetcher<CheckUniqueUserQuery, CheckUniqueUserQueryVariables>(CheckUniqueUserDocument, variables),
      options
    );
export const useInfiniteCheckUniqueUserQuery = <
      TData = CheckUniqueUserQuery,
      TError = unknown
    >(
      variables: CheckUniqueUserQueryVariables,
      options?: UseInfiniteQueryOptions<CheckUniqueUserQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CheckUniqueUserQuery, TError, TData>(
      ['checkUniqueUser.infinite', variables],
      (metaData) => graphqlFetcher<CheckUniqueUserQuery, CheckUniqueUserQueryVariables>(CheckUniqueUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CollectionsByAddressDocument = `
    query collectionsByAddress($wallet_address: String!) {
  collectionsByAddress(wallet_address: $wallet_address) {
    id
    name
    slug
    description
    logo
    royalties
    payout_address
    contract_address
    description
    category_id
    display_theme
    feature_image
    banner_image
    status
    _count {
      items
    }
    user {
      id
      name
    }
  }
}
    `;
export const useCollectionsByAddressQuery = <
      TData = CollectionsByAddressQuery,
      TError = unknown
    >(
      variables: CollectionsByAddressQueryVariables,
      options?: UseQueryOptions<CollectionsByAddressQuery, TError, TData>
    ) =>
    useQuery<CollectionsByAddressQuery, TError, TData>(
      ['collectionsByAddress', variables],
      graphqlFetcher<CollectionsByAddressQuery, CollectionsByAddressQueryVariables>(CollectionsByAddressDocument, variables),
      options
    );
export const useInfiniteCollectionsByAddressQuery = <
      TData = CollectionsByAddressQuery,
      TError = unknown
    >(
      variables: CollectionsByAddressQueryVariables,
      options?: UseInfiniteQueryOptions<CollectionsByAddressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CollectionsByAddressQuery, TError, TData>(
      ['collectionsByAddress.infinite', variables],
      (metaData) => graphqlFetcher<CollectionsByAddressQuery, CollectionsByAddressQueryVariables>(CollectionsByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CollectionsForItemDocument = `
    query collectionsForItem($wallet_address: String!) {
  collectionsForItem(wallet_address: $wallet_address) {
    id
    name
    slug
    logo
  }
}
    `;
export const useCollectionsForItemQuery = <
      TData = CollectionsForItemQuery,
      TError = unknown
    >(
      variables: CollectionsForItemQueryVariables,
      options?: UseQueryOptions<CollectionsForItemQuery, TError, TData>
    ) =>
    useQuery<CollectionsForItemQuery, TError, TData>(
      ['collectionsForItem', variables],
      graphqlFetcher<CollectionsForItemQuery, CollectionsForItemQueryVariables>(CollectionsForItemDocument, variables),
      options
    );
export const useInfiniteCollectionsForItemQuery = <
      TData = CollectionsForItemQuery,
      TError = unknown
    >(
      variables: CollectionsForItemQueryVariables,
      options?: UseInfiniteQueryOptions<CollectionsForItemQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CollectionsForItemQuery, TError, TData>(
      ['collectionsForItem.infinite', variables],
      (metaData) => graphqlFetcher<CollectionsForItemQuery, CollectionsForItemQueryVariables>(CollectionsForItemDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAccountDocument = `
    query getAccount($address_or_username: String!) {
  getAccount(address_or_username: $address_or_username) {
    banner_img
    bio
    created_at
    email
    id
    name
    phone
    profile_img
    status
    updated_at
    username
    is_email_verified
    wallet_address
    social_links {
      instagram_link
      website_link
      discord_link
      facebook_link
      linkedin_link
      medium_link
    }
  }
}
    `;
export const useGetAccountQuery = <
      TData = GetAccountQuery,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options?: UseQueryOptions<GetAccountQuery, TError, TData>
    ) =>
    useQuery<GetAccountQuery, TError, TData>(
      ['getAccount', variables],
      graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, variables),
      options
    );
export const useInfiniteGetAccountQuery = <
      TData = GetAccountQuery,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountQuery, TError, TData>(
      ['getAccount.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAccountByAddressDocument = `
    query getAccountByAddress($wallet_address: String!) {
  getAccountByAddress(wallet_address: $wallet_address) {
    banner_img
    bio
    email
    id
    name
    phone
    profile_img
    status
    username
    wallet_address
    is_email_verified
    social_links {
      id
      instagram_link
      website_link
    }
  }
}
    `;
export const useGetAccountByAddressQuery = <
      TData = GetAccountByAddressQuery,
      TError = unknown
    >(
      variables: GetAccountByAddressQueryVariables,
      options?: UseQueryOptions<GetAccountByAddressQuery, TError, TData>
    ) =>
    useQuery<GetAccountByAddressQuery, TError, TData>(
      ['getAccountByAddress', variables],
      graphqlFetcher<GetAccountByAddressQuery, GetAccountByAddressQueryVariables>(GetAccountByAddressDocument, variables),
      options
    );
export const useInfiniteGetAccountByAddressQuery = <
      TData = GetAccountByAddressQuery,
      TError = unknown
    >(
      variables: GetAccountByAddressQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountByAddressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountByAddressQuery, TError, TData>(
      ['getAccountByAddress.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountByAddressQuery, GetAccountByAddressQueryVariables>(GetAccountByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAccountListsPaginateForSearchDocument = `
    query getAccountListsPaginateForSearch($first: Int, $query: String, $totalItem: Int, $withItem: Boolean) {
  getAccountListsPaginate(
    first: $first
    query: $query
    totalItem: $totalItem
    withItem: $withItem
  ) {
    totalCount
    edges {
      node {
        id
        username
        profile_img
        wallet_address
        ownedItems {
          id
          name
          thumbnail_path
        }
      }
    }
  }
}
    `;
export const useGetAccountListsPaginateForSearchQuery = <
      TData = GetAccountListsPaginateForSearchQuery,
      TError = unknown
    >(
      variables?: GetAccountListsPaginateForSearchQueryVariables,
      options?: UseQueryOptions<GetAccountListsPaginateForSearchQuery, TError, TData>
    ) =>
    useQuery<GetAccountListsPaginateForSearchQuery, TError, TData>(
      variables === undefined ? ['getAccountListsPaginateForSearch'] : ['getAccountListsPaginateForSearch', variables],
      graphqlFetcher<GetAccountListsPaginateForSearchQuery, GetAccountListsPaginateForSearchQueryVariables>(GetAccountListsPaginateForSearchDocument, variables),
      options
    );
export const useInfiniteGetAccountListsPaginateForSearchQuery = <
      TData = GetAccountListsPaginateForSearchQuery,
      TError = unknown
    >(
      variables?: GetAccountListsPaginateForSearchQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountListsPaginateForSearchQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountListsPaginateForSearchQuery, TError, TData>(
      variables === undefined ? ['getAccountListsPaginateForSearch.infinite'] : ['getAccountListsPaginateForSearch.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountListsPaginateForSearchQuery, GetAccountListsPaginateForSearchQueryVariables>(GetAccountListsPaginateForSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetActiveSellOfferListsDocument = `
    query getActiveSellOfferLists($after: String, $before: String, $first: Int, $last: Int, $skip: Int) {
  getActiveSellOfferLists(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
  ) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        total_amount
        created_at
        end_date
        item {
          name
          media_path
          thumbnail_path
          slug
          collection {
            name
            slug
          }
        }
        user {
          username
          wallet_address
        }
        payment_token {
          id
          contract_address
          name
          logo
          token_symbol
          usd_rate
        }
      }
    }
  }
}
    `;
export const useGetActiveSellOfferListsQuery = <
      TData = GetActiveSellOfferListsQuery,
      TError = unknown
    >(
      variables?: GetActiveSellOfferListsQueryVariables,
      options?: UseQueryOptions<GetActiveSellOfferListsQuery, TError, TData>
    ) =>
    useQuery<GetActiveSellOfferListsQuery, TError, TData>(
      variables === undefined ? ['getActiveSellOfferLists'] : ['getActiveSellOfferLists', variables],
      graphqlFetcher<GetActiveSellOfferListsQuery, GetActiveSellOfferListsQueryVariables>(GetActiveSellOfferListsDocument, variables),
      options
    );
export const useInfiniteGetActiveSellOfferListsQuery = <
      TData = GetActiveSellOfferListsQuery,
      TError = unknown
    >(
      variables?: GetActiveSellOfferListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetActiveSellOfferListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetActiveSellOfferListsQuery, TError, TData>(
      variables === undefined ? ['getActiveSellOfferLists.infinite'] : ['getActiveSellOfferLists.infinite', variables],
      (metaData) => graphqlFetcher<GetActiveSellOfferListsQuery, GetActiveSellOfferListsQueryVariables>(GetActiveSellOfferListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsDocument = `
    query getBlockchainLists {
  getBlockchainLists {
    chain_id
    currency_symbol
    exchange_contract
    exchange_contract_name
    exchange_contract_version
    explorer_url
    id
    description
    logo
    payment_tokens {
      blockchain_id
      contract_address
      id
      is_default
      logo
      min_amount_to_execute_auction
      name
      status
      token_symbol
      total_decimal
      type
    }
    network_name
    nft_contract
    provider
    status
  }
}
    `;
export const useGetBlockchainListsQuery = <
      TData = GetBlockchainListsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainLists'] : ['getBlockchainLists', variables],
      graphqlFetcher<GetBlockchainListsQuery, GetBlockchainListsQueryVariables>(GetBlockchainListsDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsQuery = <
      TData = GetBlockchainListsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainLists.infinite'] : ['getBlockchainLists.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsQuery, GetBlockchainListsQueryVariables>(GetBlockchainListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsForChainIdsDocument = `
    query getBlockchainListsForChainIds {
  getBlockchainLists {
    chain_id
  }
}
    `;
export const useGetBlockchainListsForChainIdsQuery = <
      TData = GetBlockchainListsForChainIdsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForChainIdsQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsForChainIdsQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsForChainIdsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForChainIds'] : ['getBlockchainListsForChainIds', variables],
      graphqlFetcher<GetBlockchainListsForChainIdsQuery, GetBlockchainListsForChainIdsQueryVariables>(GetBlockchainListsForChainIdsDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsForChainIdsQuery = <
      TData = GetBlockchainListsForChainIdsQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForChainIdsQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsForChainIdsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsForChainIdsQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForChainIds.infinite'] : ['getBlockchainListsForChainIds.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsForChainIdsQuery, GetBlockchainListsForChainIdsQueryVariables>(GetBlockchainListsForChainIdsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlockchainListsForFilterDocument = `
    query getBlockchainListsForFilter {
  getBlockchainLists {
    id
    chain_id
    network_name
    logo
    status
  }
}
    `;
export const useGetBlockchainListsForFilterQuery = <
      TData = GetBlockchainListsForFilterQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForFilterQueryVariables,
      options?: UseQueryOptions<GetBlockchainListsForFilterQuery, TError, TData>
    ) =>
    useQuery<GetBlockchainListsForFilterQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForFilter'] : ['getBlockchainListsForFilter', variables],
      graphqlFetcher<GetBlockchainListsForFilterQuery, GetBlockchainListsForFilterQueryVariables>(GetBlockchainListsForFilterDocument, variables),
      options
    );
export const useInfiniteGetBlockchainListsForFilterQuery = <
      TData = GetBlockchainListsForFilterQuery,
      TError = unknown
    >(
      variables?: GetBlockchainListsForFilterQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlockchainListsForFilterQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlockchainListsForFilterQuery, TError, TData>(
      variables === undefined ? ['getBlockchainListsForFilter.infinite'] : ['getBlockchainListsForFilter.infinite', variables],
      (metaData) => graphqlFetcher<GetBlockchainListsForFilterQuery, GetBlockchainListsForFilterQueryVariables>(GetBlockchainListsForFilterDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBuyOfferByIdDocument = `
    query getBuyOfferById($offerId: Int!) {
  getBuyOfferById(offerId: $offerId) {
    id
    uid
    signature
    nonce
    start_date
    end_date
    total_amount
    seller_amount
    fee_amount
    fee_percentage
    royalty_percentage
    royalty_amount
    royalty_address
    user {
      wallet_address
    }
    payment_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
      logo
    }
  }
}
    `;
export const useGetBuyOfferByIdQuery = <
      TData = GetBuyOfferByIdQuery,
      TError = unknown
    >(
      variables: GetBuyOfferByIdQueryVariables,
      options?: UseQueryOptions<GetBuyOfferByIdQuery, TError, TData>
    ) =>
    useQuery<GetBuyOfferByIdQuery, TError, TData>(
      ['getBuyOfferById', variables],
      graphqlFetcher<GetBuyOfferByIdQuery, GetBuyOfferByIdQueryVariables>(GetBuyOfferByIdDocument, variables),
      options
    );
export const useInfiniteGetBuyOfferByIdQuery = <
      TData = GetBuyOfferByIdQuery,
      TError = unknown
    >(
      variables: GetBuyOfferByIdQueryVariables,
      options?: UseInfiniteQueryOptions<GetBuyOfferByIdQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBuyOfferByIdQuery, TError, TData>(
      ['getBuyOfferById.infinite', variables],
      (metaData) => graphqlFetcher<GetBuyOfferByIdQuery, GetBuyOfferByIdQueryVariables>(GetBuyOfferByIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCategoriesDocument = `
    query getCategories($status: Int) {
  getCategories(status: $status) {
    id
    image
    title
    status
  }
}
    `;
export const useGetCategoriesQuery = <
      TData = GetCategoriesQuery,
      TError = unknown
    >(
      variables?: GetCategoriesQueryVariables,
      options?: UseQueryOptions<GetCategoriesQuery, TError, TData>
    ) =>
    useQuery<GetCategoriesQuery, TError, TData>(
      variables === undefined ? ['getCategories'] : ['getCategories', variables],
      graphqlFetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, variables),
      options
    );
export const useInfiniteGetCategoriesQuery = <
      TData = GetCategoriesQuery,
      TError = unknown
    >(
      variables?: GetCategoriesQueryVariables,
      options?: UseInfiniteQueryOptions<GetCategoriesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCategoriesQuery, TError, TData>(
      variables === undefined ? ['getCategories.infinite'] : ['getCategories.infinite', variables],
      (metaData) => graphqlFetcher<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCategoriesForMarketPlaceDocument = `
    query getCategoriesForMarketPlace {
  getCategories {
    id
    title
  }
}
    `;
export const useGetCategoriesForMarketPlaceQuery = <
      TData = GetCategoriesForMarketPlaceQuery,
      TError = unknown
    >(
      variables?: GetCategoriesForMarketPlaceQueryVariables,
      options?: UseQueryOptions<GetCategoriesForMarketPlaceQuery, TError, TData>
    ) =>
    useQuery<GetCategoriesForMarketPlaceQuery, TError, TData>(
      variables === undefined ? ['getCategoriesForMarketPlace'] : ['getCategoriesForMarketPlace', variables],
      graphqlFetcher<GetCategoriesForMarketPlaceQuery, GetCategoriesForMarketPlaceQueryVariables>(GetCategoriesForMarketPlaceDocument, variables),
      options
    );
export const useInfiniteGetCategoriesForMarketPlaceQuery = <
      TData = GetCategoriesForMarketPlaceQuery,
      TError = unknown
    >(
      variables?: GetCategoriesForMarketPlaceQueryVariables,
      options?: UseInfiniteQueryOptions<GetCategoriesForMarketPlaceQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCategoriesForMarketPlaceQuery, TError, TData>(
      variables === undefined ? ['getCategoriesForMarketPlace.infinite'] : ['getCategoriesForMarketPlace.infinite', variables],
      (metaData) => graphqlFetcher<GetCategoriesForMarketPlaceQuery, GetCategoriesForMarketPlaceQueryVariables>(GetCategoriesForMarketPlaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionDetailsDocument = `
    query getCollectionDetails($slug: String!, $user_wallet_address: String) {
  getCollectionDetails(slug: $slug, user_wallet_address: $user_wallet_address) {
    itemCount
    owner_count
    is_watched
    native_token {
      id
      usd_rate
      logo
      name
      token_symbol
    }
    volume {
      native_price
      usd_price
    }
    floor_price {
      native_price
      usd_price
    }
    collection {
      id
      name
      slug
      description
      logo
      feature_image
      banner_image
      royalties
      payout_address
      contract_address
      description
      category_id
      blockchain_id
      display_theme
      is_sensitive
      status
      blockchain_id
      blockchain {
        id
        status
        chain_id
        description
        currency_symbol
        explorer_url
        logo
        payment_tokens {
          blockchain_id
          contract_address
          id
          is_default
          is_wrapable
          logo
          min_amount_to_execute_auction
          name
          status
          token_symbol
          total_decimal
          type
        }
        network_name
        nft_contract
      }
      user {
        id
        name
        username
        wallet_address
      }
    }
    social_links {
      instagram_link
      website_link
      discord_link
      medium_link
    }
    token_mappings {
      payment_token {
        blockchain_id
        contract_address
        id
        is_default
        is_wrapable
        logo
        min_amount_to_execute_auction
        name
        status
        token_symbol
        total_decimal
        type
      }
    }
  }
}
    `;
export const useGetCollectionDetailsQuery = <
      TData = GetCollectionDetailsQuery,
      TError = unknown
    >(
      variables: GetCollectionDetailsQueryVariables,
      options?: UseQueryOptions<GetCollectionDetailsQuery, TError, TData>
    ) =>
    useQuery<GetCollectionDetailsQuery, TError, TData>(
      ['getCollectionDetails', variables],
      graphqlFetcher<GetCollectionDetailsQuery, GetCollectionDetailsQueryVariables>(GetCollectionDetailsDocument, variables),
      options
    );
export const useInfiniteGetCollectionDetailsQuery = <
      TData = GetCollectionDetailsQuery,
      TError = unknown
    >(
      variables: GetCollectionDetailsQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionDetailsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionDetailsQuery, TError, TData>(
      ['getCollectionDetails.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionDetailsQuery, GetCollectionDetailsQueryVariables>(GetCollectionDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionListsForSearchDocument = `
    query getCollectionListsForSearch($first: Int, $query: String, $totalItem: Int, $withItem: Boolean) {
  getCollectionListsPaginate(
    first: $first
    query: $query
    totalItem: $totalItem
    withItem: $withItem
  ) {
    totalCount
    edges {
      node {
        id
        name
        slug
        logo
        royalties
        blockchain {
          id
          logo
          network_name
        }
        user {
          id
          username
        }
        items {
          id
          name
          thumbnail_path
        }
        _count {
          items
        }
        metadata {
          floor_price {
            usd_price
            native_price
          }
          volume {
            usd_price
            native_price
          }
          native_token {
            id
            usd_rate
            logo
            name
            token_symbol
          }
          owner_count
        }
      }
    }
  }
}
    `;
export const useGetCollectionListsForSearchQuery = <
      TData = GetCollectionListsForSearchQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsForSearchQueryVariables,
      options?: UseQueryOptions<GetCollectionListsForSearchQuery, TError, TData>
    ) =>
    useQuery<GetCollectionListsForSearchQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsForSearch'] : ['getCollectionListsForSearch', variables],
      graphqlFetcher<GetCollectionListsForSearchQuery, GetCollectionListsForSearchQueryVariables>(GetCollectionListsForSearchDocument, variables),
      options
    );
export const useInfiniteGetCollectionListsForSearchQuery = <
      TData = GetCollectionListsForSearchQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsForSearchQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionListsForSearchQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionListsForSearchQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsForSearch.infinite'] : ['getCollectionListsForSearch.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionListsForSearchQuery, GetCollectionListsForSearchQueryVariables>(GetCollectionListsForSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionListsPaginateDocument = `
    query getCollectionListsPaginate($after: String, $before: String, $first: Int, $last: Int, $orderBy: CollectionOrder, $query: String, $skip: Int, $user_id: Int, $category_id: Int) {
  getCollectionListsPaginate(
    after: $after
    before: $before
    first: $first
    last: $last
    orderBy: $orderBy
    query: $query
    skip: $skip
    user_id: $user_id
    category_id: $category_id
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        name
        slug
        logo
        feature_image
        banner_image
        _count {
          items
        }
        user {
          id
          username
          wallet_address
        }
      }
    }
  }
}
    `;
export const useGetCollectionListsPaginateQuery = <
      TData = GetCollectionListsPaginateQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsPaginateQueryVariables,
      options?: UseQueryOptions<GetCollectionListsPaginateQuery, TError, TData>
    ) =>
    useQuery<GetCollectionListsPaginateQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsPaginate'] : ['getCollectionListsPaginate', variables],
      graphqlFetcher<GetCollectionListsPaginateQuery, GetCollectionListsPaginateQueryVariables>(GetCollectionListsPaginateDocument, variables),
      options
    );
export const useInfiniteGetCollectionListsPaginateQuery = <
      TData = GetCollectionListsPaginateQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsPaginateQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionListsPaginateQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionListsPaginateQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsPaginate.infinite'] : ['getCollectionListsPaginate.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionListsPaginateQuery, GetCollectionListsPaginateQueryVariables>(GetCollectionListsPaginateDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionListsPaginateForFilterDocument = `
    query getCollectionListsPaginateForFilter($after: String, $before: String, $first: Int, $last: Int, $query: String, $user_id: Int) {
  getCollectionListsPaginate(
    after: $after
    before: $before
    first: $first
    last: $last
    query: $query
    user_id: $user_id
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        name
        slug
        logo
        feature_image
        banner_image
        _count {
          items
        }
      }
    }
  }
}
    `;
export const useGetCollectionListsPaginateForFilterQuery = <
      TData = GetCollectionListsPaginateForFilterQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsPaginateForFilterQueryVariables,
      options?: UseQueryOptions<GetCollectionListsPaginateForFilterQuery, TError, TData>
    ) =>
    useQuery<GetCollectionListsPaginateForFilterQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsPaginateForFilter'] : ['getCollectionListsPaginateForFilter', variables],
      graphqlFetcher<GetCollectionListsPaginateForFilterQuery, GetCollectionListsPaginateForFilterQueryVariables>(GetCollectionListsPaginateForFilterDocument, variables),
      options
    );
export const useInfiniteGetCollectionListsPaginateForFilterQuery = <
      TData = GetCollectionListsPaginateForFilterQuery,
      TError = unknown
    >(
      variables?: GetCollectionListsPaginateForFilterQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionListsPaginateForFilterQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionListsPaginateForFilterQuery, TError, TData>(
      variables === undefined ? ['getCollectionListsPaginateForFilter.infinite'] : ['getCollectionListsPaginateForFilter.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionListsPaginateForFilterQuery, GetCollectionListsPaginateForFilterQueryVariables>(GetCollectionListsPaginateForFilterDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCreatorEarningListPaginateDocument = `
    query getCreatorEarningListPaginate($after: String, $before: String, $collection_id: Int, $first: Int, $last: Int, $skip: Int, $user_id: Int) {
  getCreatorEarningListPaginate(
    after: $after
    before: $before
    collection_id: $collection_id
    first: $first
    last: $last
    skip: $skip
    user_id: $user_id
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        item {
          collection_id
          name
          slug
          thumbnail_path
        }
        payment_token {
          token_symbol
          logo
        }
        royalty_amount
        royalty_address
        created_at
      }
    }
  }
}
    `;
export const useGetCreatorEarningListPaginateQuery = <
      TData = GetCreatorEarningListPaginateQuery,
      TError = unknown
    >(
      variables?: GetCreatorEarningListPaginateQueryVariables,
      options?: UseQueryOptions<GetCreatorEarningListPaginateQuery, TError, TData>
    ) =>
    useQuery<GetCreatorEarningListPaginateQuery, TError, TData>(
      variables === undefined ? ['getCreatorEarningListPaginate'] : ['getCreatorEarningListPaginate', variables],
      graphqlFetcher<GetCreatorEarningListPaginateQuery, GetCreatorEarningListPaginateQueryVariables>(GetCreatorEarningListPaginateDocument, variables),
      options
    );
export const useInfiniteGetCreatorEarningListPaginateQuery = <
      TData = GetCreatorEarningListPaginateQuery,
      TError = unknown
    >(
      variables?: GetCreatorEarningListPaginateQueryVariables,
      options?: UseInfiniteQueryOptions<GetCreatorEarningListPaginateQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCreatorEarningListPaginateQuery, TError, TData>(
      variables === undefined ? ['getCreatorEarningListPaginate.infinite'] : ['getCreatorEarningListPaginate.infinite', variables],
      (metaData) => graphqlFetcher<GetCreatorEarningListPaginateQuery, GetCreatorEarningListPaginateQueryVariables>(GetCreatorEarningListPaginateDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetDayWiseCollectionPriceDocument = `
    query getDayWiseCollectionPrice($collection_id: Int!, $days: String!) {
  getDayWiseCollectionPrice(collection_id: $collection_id, days: $days) {
    total_avg_price
    total_sum_price
    day_wise_price_count {
      date
      avg_price
      sum_price
    }
  }
}
    `;
export const useGetDayWiseCollectionPriceQuery = <
      TData = GetDayWiseCollectionPriceQuery,
      TError = unknown
    >(
      variables: GetDayWiseCollectionPriceQueryVariables,
      options?: UseQueryOptions<GetDayWiseCollectionPriceQuery, TError, TData>
    ) =>
    useQuery<GetDayWiseCollectionPriceQuery, TError, TData>(
      ['getDayWiseCollectionPrice', variables],
      graphqlFetcher<GetDayWiseCollectionPriceQuery, GetDayWiseCollectionPriceQueryVariables>(GetDayWiseCollectionPriceDocument, variables),
      options
    );
export const useInfiniteGetDayWiseCollectionPriceQuery = <
      TData = GetDayWiseCollectionPriceQuery,
      TError = unknown
    >(
      variables: GetDayWiseCollectionPriceQueryVariables,
      options?: UseInfiniteQueryOptions<GetDayWiseCollectionPriceQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDayWiseCollectionPriceQuery, TError, TData>(
      ['getDayWiseCollectionPrice.infinite', variables],
      (metaData) => graphqlFetcher<GetDayWiseCollectionPriceQuery, GetDayWiseCollectionPriceQueryVariables>(GetDayWiseCollectionPriceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetDayWiseItemPriceDocument = `
    query getDayWiseItemPrice($item_id: Int!, $days: String!) {
  getDayWiseItemPrice(item_id: $item_id, days: $days) {
    total_avg_price
    total_sum_price
    day_wise_price_count {
      date
      avg_price
      sum_price
    }
  }
}
    `;
export const useGetDayWiseItemPriceQuery = <
      TData = GetDayWiseItemPriceQuery,
      TError = unknown
    >(
      variables: GetDayWiseItemPriceQueryVariables,
      options?: UseQueryOptions<GetDayWiseItemPriceQuery, TError, TData>
    ) =>
    useQuery<GetDayWiseItemPriceQuery, TError, TData>(
      ['getDayWiseItemPrice', variables],
      graphqlFetcher<GetDayWiseItemPriceQuery, GetDayWiseItemPriceQueryVariables>(GetDayWiseItemPriceDocument, variables),
      options
    );
export const useInfiniteGetDayWiseItemPriceQuery = <
      TData = GetDayWiseItemPriceQuery,
      TError = unknown
    >(
      variables: GetDayWiseItemPriceQueryVariables,
      options?: UseInfiniteQueryOptions<GetDayWiseItemPriceQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDayWiseItemPriceQuery, TError, TData>(
      ['getDayWiseItemPrice.infinite', variables],
      (metaData) => graphqlFetcher<GetDayWiseItemPriceQuery, GetDayWiseItemPriceQueryVariables>(GetDayWiseItemPriceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetFeaturedCollectionListDocument = `
    query getFeaturedCollectionList($limit: Int) {
  getFeaturedCollectionList(limit: $limit) {
    id
    name
    description
    slug
    feature_image
    logo
  }
}
    `;
export const useGetFeaturedCollectionListQuery = <
      TData = GetFeaturedCollectionListQuery,
      TError = unknown
    >(
      variables?: GetFeaturedCollectionListQueryVariables,
      options?: UseQueryOptions<GetFeaturedCollectionListQuery, TError, TData>
    ) =>
    useQuery<GetFeaturedCollectionListQuery, TError, TData>(
      variables === undefined ? ['getFeaturedCollectionList'] : ['getFeaturedCollectionList', variables],
      graphqlFetcher<GetFeaturedCollectionListQuery, GetFeaturedCollectionListQueryVariables>(GetFeaturedCollectionListDocument, variables),
      options
    );
export const useInfiniteGetFeaturedCollectionListQuery = <
      TData = GetFeaturedCollectionListQuery,
      TError = unknown
    >(
      variables?: GetFeaturedCollectionListQueryVariables,
      options?: UseInfiniteQueryOptions<GetFeaturedCollectionListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetFeaturedCollectionListQuery, TError, TData>(
      variables === undefined ? ['getFeaturedCollectionList.infinite'] : ['getFeaturedCollectionList.infinite', variables],
      (metaData) => graphqlFetcher<GetFeaturedCollectionListQuery, GetFeaturedCollectionListQueryVariables>(GetFeaturedCollectionListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemActivitiesDocument = `
    query getItemActivities($item_id: Int!, $events: String) {
  getItemActivities(item_id: $item_id, events: $events) {
    id
    item_id
    from {
      id
      username
      wallet_address
    }
    to {
      id
      username
      wallet_address
    }
    item {
      owner {
        id
        name
      }
    }
    payment_token {
      id
      name
      contract_address
      token_symbol
      logo
    }
    hash
    amount
    event
    status
    created_at
    updated_at
  }
}
    `;
export const useGetItemActivitiesQuery = <
      TData = GetItemActivitiesQuery,
      TError = unknown
    >(
      variables: GetItemActivitiesQueryVariables,
      options?: UseQueryOptions<GetItemActivitiesQuery, TError, TData>
    ) =>
    useQuery<GetItemActivitiesQuery, TError, TData>(
      ['getItemActivities', variables],
      graphqlFetcher<GetItemActivitiesQuery, GetItemActivitiesQueryVariables>(GetItemActivitiesDocument, variables),
      options
    );
export const useInfiniteGetItemActivitiesQuery = <
      TData = GetItemActivitiesQuery,
      TError = unknown
    >(
      variables: GetItemActivitiesQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemActivitiesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemActivitiesQuery, TError, TData>(
      ['getItemActivities.infinite', variables],
      (metaData) => graphqlFetcher<GetItemActivitiesQuery, GetItemActivitiesQueryVariables>(GetItemActivitiesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemActivitiesPaginateDocument = `
    query getItemActivitiesPaginate($after: String, $before: String, $blockchain_id: [Int!], $collection_id: [Int!], $event_type: [Int!], $first: Int, $item_id: Int, $last: Int, $skip: Int, $user_id: Int, $query: String) {
  getItemActivitiesPaginate(
    after: $after
    before: $before
    first: $first
    blockchain_id: $blockchain_id
    last: $last
    event_type: $event_type
    skip: $skip
    collection_id: $collection_id
    item_id: $item_id
    user_id: $user_id
    query: $query
  ) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        item_id
        from {
          id
          username
          wallet_address
        }
        to {
          id
          username
          wallet_address
        }
        item {
          name
          slug
          media_path
          thumbnail_path
          owner {
            id
            name
          }
        }
        payment_token {
          id
          name
          contract_address
          token_symbol
          logo
        }
        hash
        amount
        event
        status
        created_at
        updated_at
      }
    }
  }
}
    `;
export const useGetItemActivitiesPaginateQuery = <
      TData = GetItemActivitiesPaginateQuery,
      TError = unknown
    >(
      variables?: GetItemActivitiesPaginateQueryVariables,
      options?: UseQueryOptions<GetItemActivitiesPaginateQuery, TError, TData>
    ) =>
    useQuery<GetItemActivitiesPaginateQuery, TError, TData>(
      variables === undefined ? ['getItemActivitiesPaginate'] : ['getItemActivitiesPaginate', variables],
      graphqlFetcher<GetItemActivitiesPaginateQuery, GetItemActivitiesPaginateQueryVariables>(GetItemActivitiesPaginateDocument, variables),
      options
    );
export const useInfiniteGetItemActivitiesPaginateQuery = <
      TData = GetItemActivitiesPaginateQuery,
      TError = unknown
    >(
      variables?: GetItemActivitiesPaginateQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemActivitiesPaginateQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemActivitiesPaginateQuery, TError, TData>(
      variables === undefined ? ['getItemActivitiesPaginate.infinite'] : ['getItemActivitiesPaginate.infinite', variables],
      (metaData) => graphqlFetcher<GetItemActivitiesPaginateQuery, GetItemActivitiesPaginateQueryVariables>(GetItemActivitiesPaginateDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemListsDocument = `
    query getItemLists($after: String, $before: String, $viewer_id: Int, $blockchain_id: [Int!], $category_id: [Int!], $collection_id: [Int!], $creator_id: Int, $first: Int, $last: Int, $max_price: Float, $min_price: Float, $orderBy: ItemOrder, $owner_id: Int, $payment_token_id: [Int!], $query: String, $skip: Int, $status: [Int!]) {
  getItemLists(
    after: $after
    before: $before
    viewer_id: $viewer_id
    blockchain_id: $blockchain_id
    category_id: $category_id
    collection_id: $collection_id
    creator_id: $creator_id
    first: $first
    last: $last
    max_price: $max_price
    min_price: $min_price
    orderBy: $orderBy
    owner_id: $owner_id
    payment_token_id: $payment_token_id
    query: $query
    skip: $skip
    status: $status
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        name
        price
        media_path
        thumbnail_path
        slug
        like_count
        item_favourite_lists {
          id
        }
        payment_token {
          id
          logo
          token_symbol
        }
        collection {
          id
          name
          slug
        }
        owner {
          name
          username
          id
          wallet_address
        }
      }
    }
  }
}
    `;
export const useGetItemListsQuery = <
      TData = GetItemListsQuery,
      TError = unknown
    >(
      variables?: GetItemListsQueryVariables,
      options?: UseQueryOptions<GetItemListsQuery, TError, TData>
    ) =>
    useQuery<GetItemListsQuery, TError, TData>(
      variables === undefined ? ['getItemLists'] : ['getItemLists', variables],
      graphqlFetcher<GetItemListsQuery, GetItemListsQueryVariables>(GetItemListsDocument, variables),
      options
    );
export const useInfiniteGetItemListsQuery = <
      TData = GetItemListsQuery,
      TError = unknown
    >(
      variables?: GetItemListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemListsQuery, TError, TData>(
      variables === undefined ? ['getItemLists.infinite'] : ['getItemLists.infinite', variables],
      (metaData) => graphqlFetcher<GetItemListsQuery, GetItemListsQueryVariables>(GetItemListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemListsForAssetDetailsDocument = `
    query getItemListsForAssetDetails($viewer_id: Int, $collection_id: [Int!], $first: Int, $last: Int) {
  getItemLists(
    viewer_id: $viewer_id
    collection_id: $collection_id
    first: $first
    last: $last
  ) {
    totalCount
    edges {
      node {
        id
        name
        filetype
        media_path
        thumbnail_path
        like_count
        item_favourite_lists {
          id
        }
        price
        slug
        token_id
        payment_token {
          logo
          token_symbol
        }
      }
    }
  }
}
    `;
export const useGetItemListsForAssetDetailsQuery = <
      TData = GetItemListsForAssetDetailsQuery,
      TError = unknown
    >(
      variables?: GetItemListsForAssetDetailsQueryVariables,
      options?: UseQueryOptions<GetItemListsForAssetDetailsQuery, TError, TData>
    ) =>
    useQuery<GetItemListsForAssetDetailsQuery, TError, TData>(
      variables === undefined ? ['getItemListsForAssetDetails'] : ['getItemListsForAssetDetails', variables],
      graphqlFetcher<GetItemListsForAssetDetailsQuery, GetItemListsForAssetDetailsQueryVariables>(GetItemListsForAssetDetailsDocument, variables),
      options
    );
export const useInfiniteGetItemListsForAssetDetailsQuery = <
      TData = GetItemListsForAssetDetailsQuery,
      TError = unknown
    >(
      variables?: GetItemListsForAssetDetailsQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemListsForAssetDetailsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemListsForAssetDetailsQuery, TError, TData>(
      variables === undefined ? ['getItemListsForAssetDetails.infinite'] : ['getItemListsForAssetDetails.infinite', variables],
      (metaData) => graphqlFetcher<GetItemListsForAssetDetailsQuery, GetItemListsForAssetDetailsQueryVariables>(GetItemListsForAssetDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemUnlockAbleContentDocument = `
    query getItemUnlockAbleContent($item_slug: String!) {
  getItemUnlockAbleContent(item_slug: $item_slug)
}
    `;
export const useGetItemUnlockAbleContentQuery = <
      TData = GetItemUnlockAbleContentQuery,
      TError = unknown
    >(
      variables: GetItemUnlockAbleContentQueryVariables,
      options?: UseQueryOptions<GetItemUnlockAbleContentQuery, TError, TData>
    ) =>
    useQuery<GetItemUnlockAbleContentQuery, TError, TData>(
      ['getItemUnlockAbleContent', variables],
      graphqlFetcher<GetItemUnlockAbleContentQuery, GetItemUnlockAbleContentQueryVariables>(GetItemUnlockAbleContentDocument, variables),
      options
    );
export const useInfiniteGetItemUnlockAbleContentQuery = <
      TData = GetItemUnlockAbleContentQuery,
      TError = unknown
    >(
      variables: GetItemUnlockAbleContentQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemUnlockAbleContentQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemUnlockAbleContentQuery, TError, TData>(
      ['getItemUnlockAbleContent.infinite', variables],
      (metaData) => graphqlFetcher<GetItemUnlockAbleContentQuery, GetItemUnlockAbleContentQueryVariables>(GetItemUnlockAbleContentDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetItemsTokensDocument = `
    query getItemsTokens($item_id: Int!) {
  getItemsTokens(item_id: $item_id) {
    id
    is_default
    is_wrapable
    logo
    min_amount_to_execute_auction
    name
    token_symbol
    total_decimal
    type
    usd_rate
    contract_address
  }
}
    `;
export const useGetItemsTokensQuery = <
      TData = GetItemsTokensQuery,
      TError = unknown
    >(
      variables: GetItemsTokensQueryVariables,
      options?: UseQueryOptions<GetItemsTokensQuery, TError, TData>
    ) =>
    useQuery<GetItemsTokensQuery, TError, TData>(
      ['getItemsTokens', variables],
      graphqlFetcher<GetItemsTokensQuery, GetItemsTokensQueryVariables>(GetItemsTokensDocument, variables),
      options
    );
export const useInfiniteGetItemsTokensQuery = <
      TData = GetItemsTokensQuery,
      TError = unknown
    >(
      variables: GetItemsTokensQueryVariables,
      options?: UseInfiniteQueryOptions<GetItemsTokensQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetItemsTokensQuery, TError, TData>(
      ['getItemsTokens.infinite', variables],
      (metaData) => graphqlFetcher<GetItemsTokensQuery, GetItemsTokensQueryVariables>(GetItemsTokensDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const MeDocument = `
    query me {
  me {
    wallet_address
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      graphqlFetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
export const useInfiniteMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseInfiniteQueryOptions<MeQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me.infinite'] : ['me.infinite', variables],
      (metaData) => graphqlFetcher<MeQuery, MeQueryVariables>(MeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetNativeNwrapTokenDocument = `
    query getNativeNwrapToken($blockchain_id: Int, $chain_id: Int) {
  getNativeNwrapToken(blockchain_id: $blockchain_id, chain_id: $chain_id) {
    native_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
      is_wrapable
      is_default
      min_amount_to_execute_auction
      type
      logo
      usd_rate
      blockchain {
        id
        network_name
      }
    }
    wrap_token {
      id
      name
      contract_address
      token_symbol
      total_decimal
      is_wrapable
      is_default
      min_amount_to_execute_auction
      type
      logo
      usd_rate
      blockchain {
        id
        network_name
      }
    }
  }
}
    `;
export const useGetNativeNwrapTokenQuery = <
      TData = GetNativeNwrapTokenQuery,
      TError = unknown
    >(
      variables?: GetNativeNwrapTokenQueryVariables,
      options?: UseQueryOptions<GetNativeNwrapTokenQuery, TError, TData>
    ) =>
    useQuery<GetNativeNwrapTokenQuery, TError, TData>(
      variables === undefined ? ['getNativeNwrapToken'] : ['getNativeNwrapToken', variables],
      graphqlFetcher<GetNativeNwrapTokenQuery, GetNativeNwrapTokenQueryVariables>(GetNativeNwrapTokenDocument, variables),
      options
    );
export const useInfiniteGetNativeNwrapTokenQuery = <
      TData = GetNativeNwrapTokenQuery,
      TError = unknown
    >(
      variables?: GetNativeNwrapTokenQueryVariables,
      options?: UseInfiniteQueryOptions<GetNativeNwrapTokenQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetNativeNwrapTokenQuery, TError, TData>(
      variables === undefined ? ['getNativeNwrapToken.infinite'] : ['getNativeNwrapToken.infinite', variables],
      (metaData) => graphqlFetcher<GetNativeNwrapTokenQuery, GetNativeNwrapTokenQueryVariables>(GetNativeNwrapTokenDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetNotificationSettingsDocument = `
    query getNotificationSettings {
  getNotificationSettings {
    events
    id
    user_id
  }
}
    `;
export const useGetNotificationSettingsQuery = <
      TData = GetNotificationSettingsQuery,
      TError = unknown
    >(
      variables?: GetNotificationSettingsQueryVariables,
      options?: UseQueryOptions<GetNotificationSettingsQuery, TError, TData>
    ) =>
    useQuery<GetNotificationSettingsQuery, TError, TData>(
      variables === undefined ? ['getNotificationSettings'] : ['getNotificationSettings', variables],
      graphqlFetcher<GetNotificationSettingsQuery, GetNotificationSettingsQueryVariables>(GetNotificationSettingsDocument, variables),
      options
    );
export const useInfiniteGetNotificationSettingsQuery = <
      TData = GetNotificationSettingsQuery,
      TError = unknown
    >(
      variables?: GetNotificationSettingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetNotificationSettingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetNotificationSettingsQuery, TError, TData>(
      variables === undefined ? ['getNotificationSettings.infinite'] : ['getNotificationSettings.infinite', variables],
      (metaData) => graphqlFetcher<GetNotificationSettingsQuery, GetNotificationSettingsQueryVariables>(GetNotificationSettingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetNotificationSettingsEventDocument = `
    query getNotificationSettingsEvent {
  getNotificationSettingsEvent {
    description
    id
    status
    title
  }
}
    `;
export const useGetNotificationSettingsEventQuery = <
      TData = GetNotificationSettingsEventQuery,
      TError = unknown
    >(
      variables?: GetNotificationSettingsEventQueryVariables,
      options?: UseQueryOptions<GetNotificationSettingsEventQuery, TError, TData>
    ) =>
    useQuery<GetNotificationSettingsEventQuery, TError, TData>(
      variables === undefined ? ['getNotificationSettingsEvent'] : ['getNotificationSettingsEvent', variables],
      graphqlFetcher<GetNotificationSettingsEventQuery, GetNotificationSettingsEventQueryVariables>(GetNotificationSettingsEventDocument, variables),
      options
    );
export const useInfiniteGetNotificationSettingsEventQuery = <
      TData = GetNotificationSettingsEventQuery,
      TError = unknown
    >(
      variables?: GetNotificationSettingsEventQueryVariables,
      options?: UseInfiniteQueryOptions<GetNotificationSettingsEventQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetNotificationSettingsEventQuery, TError, TData>(
      variables === undefined ? ['getNotificationSettingsEvent.infinite'] : ['getNotificationSettingsEvent.infinite', variables],
      (metaData) => graphqlFetcher<GetNotificationSettingsEventQuery, GetNotificationSettingsEventQueryVariables>(GetNotificationSettingsEventDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetRankingListDocument = `
    query getRankingList($blockchain_id: Int, $days: Int!, $limit: Int) {
  getRankingList(blockchain_id: $blockchain_id, days: $days, limit: $limit) {
    id
    one_day_volume_in_native
    one_day_volume_in_usd
    one_day_volume_percent
    seven_days_volume_in_native
    seven_days_volume_in_usd
    seven_days_volume_percent
    thirty_days_volume_in_native
    thirty_days_volume_in_usd
    thirty_days_volume_percent
    floor_price_in_native
    floor_price_in_usd
    native_token {
      id
      logo
      name
      token_symbol
    }
    collection {
      id
      slug
      name
      logo
    }
  }
}
    `;
export const useGetRankingListQuery = <
      TData = GetRankingListQuery,
      TError = unknown
    >(
      variables: GetRankingListQueryVariables,
      options?: UseQueryOptions<GetRankingListQuery, TError, TData>
    ) =>
    useQuery<GetRankingListQuery, TError, TData>(
      ['getRankingList', variables],
      graphqlFetcher<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, variables),
      options
    );
export const useInfiniteGetRankingListQuery = <
      TData = GetRankingListQuery,
      TError = unknown
    >(
      variables: GetRankingListQueryVariables,
      options?: UseInfiniteQueryOptions<GetRankingListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetRankingListQuery, TError, TData>(
      ['getRankingList.infinite', variables],
      (metaData) => graphqlFetcher<GetRankingListQuery, GetRankingListQueryVariables>(GetRankingListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetSellOfferListsByUserDocument = `
    query getSellOfferListsByUser($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $status: Int!, $user_id: Int, $user_wallet_address: String) {
  getSellOfferListsByUser(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    status: $status
    user_id: $user_id
    user_wallet_address: $user_wallet_address
  ) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        total_amount
        created_at
        end_date
        item {
          name
          thumbnail_path
          slug
          collection {
            name
            slug
          }
        }
        user {
          username
        }
        payment_token {
          id
          name
          contract_address
          token_symbol
          logo
        }
      }
    }
  }
}
    `;
export const useGetSellOfferListsByUserQuery = <
      TData = GetSellOfferListsByUserQuery,
      TError = unknown
    >(
      variables: GetSellOfferListsByUserQueryVariables,
      options?: UseQueryOptions<GetSellOfferListsByUserQuery, TError, TData>
    ) =>
    useQuery<GetSellOfferListsByUserQuery, TError, TData>(
      ['getSellOfferListsByUser', variables],
      graphqlFetcher<GetSellOfferListsByUserQuery, GetSellOfferListsByUserQueryVariables>(GetSellOfferListsByUserDocument, variables),
      options
    );
export const useInfiniteGetSellOfferListsByUserQuery = <
      TData = GetSellOfferListsByUserQuery,
      TError = unknown
    >(
      variables: GetSellOfferListsByUserQueryVariables,
      options?: UseInfiniteQueryOptions<GetSellOfferListsByUserQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSellOfferListsByUserQuery, TError, TData>(
      ['getSellOfferListsByUser.infinite', variables],
      (metaData) => graphqlFetcher<GetSellOfferListsByUserQuery, GetSellOfferListsByUserQueryVariables>(GetSellOfferListsByUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetSettingsDataDocument = `
    query getSettingsData($optionGroup: [String!]) {
  getSettingsData(optionGroup: $optionGroup) {
    id
    option_key
    option_group
    option_value
  }
}
    `;
export const useGetSettingsDataQuery = <
      TData = GetSettingsDataQuery,
      TError = unknown
    >(
      variables?: GetSettingsDataQueryVariables,
      options?: UseQueryOptions<GetSettingsDataQuery, TError, TData>
    ) =>
    useQuery<GetSettingsDataQuery, TError, TData>(
      variables === undefined ? ['getSettingsData'] : ['getSettingsData', variables],
      graphqlFetcher<GetSettingsDataQuery, GetSettingsDataQueryVariables>(GetSettingsDataDocument, variables),
      options
    );
export const useInfiniteGetSettingsDataQuery = <
      TData = GetSettingsDataQuery,
      TError = unknown
    >(
      variables?: GetSettingsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSettingsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSettingsDataQuery, TError, TData>(
      variables === undefined ? ['getSettingsData.infinite'] : ['getSettingsData.infinite', variables],
      (metaData) => graphqlFetcher<GetSettingsDataQuery, GetSettingsDataQueryVariables>(GetSettingsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTokenListsDocument = `
    query getTokenLists {
  getTokenLists {
    id
    name
    logo
    token_symbol
    status
  }
}
    `;
export const useGetTokenListsQuery = <
      TData = GetTokenListsQuery,
      TError = unknown
    >(
      variables?: GetTokenListsQueryVariables,
      options?: UseQueryOptions<GetTokenListsQuery, TError, TData>
    ) =>
    useQuery<GetTokenListsQuery, TError, TData>(
      variables === undefined ? ['getTokenLists'] : ['getTokenLists', variables],
      graphqlFetcher<GetTokenListsQuery, GetTokenListsQueryVariables>(GetTokenListsDocument, variables),
      options
    );
export const useInfiniteGetTokenListsQuery = <
      TData = GetTokenListsQuery,
      TError = unknown
    >(
      variables?: GetTokenListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetTokenListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTokenListsQuery, TError, TData>(
      variables === undefined ? ['getTokenLists.infinite'] : ['getTokenLists.infinite', variables],
      (metaData) => graphqlFetcher<GetTokenListsQuery, GetTokenListsQueryVariables>(GetTokenListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTokenListsForWalletDocument = `
    query getTokenListsForWallet($chain_id: Int) {
  getTokenLists(chain_id: $chain_id) {
    id
    name
    contract_address
    token_symbol
    total_decimal
    is_wrapable
    is_default
    min_amount_to_execute_auction
    type
    logo
    usd_rate
    blockchain {
      network_name
    }
  }
}
    `;
export const useGetTokenListsForWalletQuery = <
      TData = GetTokenListsForWalletQuery,
      TError = unknown
    >(
      variables?: GetTokenListsForWalletQueryVariables,
      options?: UseQueryOptions<GetTokenListsForWalletQuery, TError, TData>
    ) =>
    useQuery<GetTokenListsForWalletQuery, TError, TData>(
      variables === undefined ? ['getTokenListsForWallet'] : ['getTokenListsForWallet', variables],
      graphqlFetcher<GetTokenListsForWalletQuery, GetTokenListsForWalletQueryVariables>(GetTokenListsForWalletDocument, variables),
      options
    );
export const useInfiniteGetTokenListsForWalletQuery = <
      TData = GetTokenListsForWalletQuery,
      TError = unknown
    >(
      variables?: GetTokenListsForWalletQueryVariables,
      options?: UseInfiniteQueryOptions<GetTokenListsForWalletQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTokenListsForWalletQuery, TError, TData>(
      variables === undefined ? ['getTokenListsForWallet.infinite'] : ['getTokenListsForWallet.infinite', variables],
      (metaData) => graphqlFetcher<GetTokenListsForWalletQuery, GetTokenListsForWalletQueryVariables>(GetTokenListsForWalletDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTokenListsPaginateForFilterDocument = `
    query getTokenListsPaginateForFilter($after: String, $before: String, $first: Int, $last: Int, $query: String, $collection_id: Int) {
  getTokenListsPaginate(
    after: $after
    before: $before
    first: $first
    last: $last
    query: $query
    collection_id: $collection_id
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        name
        logo
        token_symbol
      }
    }
  }
}
    `;
export const useGetTokenListsPaginateForFilterQuery = <
      TData = GetTokenListsPaginateForFilterQuery,
      TError = unknown
    >(
      variables?: GetTokenListsPaginateForFilterQueryVariables,
      options?: UseQueryOptions<GetTokenListsPaginateForFilterQuery, TError, TData>
    ) =>
    useQuery<GetTokenListsPaginateForFilterQuery, TError, TData>(
      variables === undefined ? ['getTokenListsPaginateForFilter'] : ['getTokenListsPaginateForFilter', variables],
      graphqlFetcher<GetTokenListsPaginateForFilterQuery, GetTokenListsPaginateForFilterQueryVariables>(GetTokenListsPaginateForFilterDocument, variables),
      options
    );
export const useInfiniteGetTokenListsPaginateForFilterQuery = <
      TData = GetTokenListsPaginateForFilterQuery,
      TError = unknown
    >(
      variables?: GetTokenListsPaginateForFilterQueryVariables,
      options?: UseInfiniteQueryOptions<GetTokenListsPaginateForFilterQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTokenListsPaginateForFilterQuery, TError, TData>(
      variables === undefined ? ['getTokenListsPaginateForFilter.infinite'] : ['getTokenListsPaginateForFilter.infinite', variables],
      (metaData) => graphqlFetcher<GetTokenListsPaginateForFilterQuery, GetTokenListsPaginateForFilterQueryVariables>(GetTokenListsPaginateForFilterDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTopCollectionListDocument = `
    query getTopCollectionList($limit: Int) {
  getTopCollectionList(limit: $limit) {
    id
    name
    slug
    logo
    feature_image
    banner_image
    _count {
      items
    }
    user {
      id
      username
      wallet_address
    }
  }
}
    `;
export const useGetTopCollectionListQuery = <
      TData = GetTopCollectionListQuery,
      TError = unknown
    >(
      variables?: GetTopCollectionListQueryVariables,
      options?: UseQueryOptions<GetTopCollectionListQuery, TError, TData>
    ) =>
    useQuery<GetTopCollectionListQuery, TError, TData>(
      variables === undefined ? ['getTopCollectionList'] : ['getTopCollectionList', variables],
      graphqlFetcher<GetTopCollectionListQuery, GetTopCollectionListQueryVariables>(GetTopCollectionListDocument, variables),
      options
    );
export const useInfiniteGetTopCollectionListQuery = <
      TData = GetTopCollectionListQuery,
      TError = unknown
    >(
      variables?: GetTopCollectionListQueryVariables,
      options?: UseInfiniteQueryOptions<GetTopCollectionListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTopCollectionListQuery, TError, TData>(
      variables === undefined ? ['getTopCollectionList.infinite'] : ['getTopCollectionList.infinite', variables],
      (metaData) => graphqlFetcher<GetTopCollectionListQuery, GetTopCollectionListQueryVariables>(GetTopCollectionListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTrendingCollectionListDocument = `
    query getTrendingCollectionList($limit: Int) {
  getTrendingCollectionList(limit: $limit) {
    id
    name
    username
    user_wallet_address
    user_id
    slug
    logo
    feature_image
    banner_image
    _count {
      items
    }
  }
}
    `;
export const useGetTrendingCollectionListQuery = <
      TData = GetTrendingCollectionListQuery,
      TError = unknown
    >(
      variables?: GetTrendingCollectionListQueryVariables,
      options?: UseQueryOptions<GetTrendingCollectionListQuery, TError, TData>
    ) =>
    useQuery<GetTrendingCollectionListQuery, TError, TData>(
      variables === undefined ? ['getTrendingCollectionList'] : ['getTrendingCollectionList', variables],
      graphqlFetcher<GetTrendingCollectionListQuery, GetTrendingCollectionListQueryVariables>(GetTrendingCollectionListDocument, variables),
      options
    );
export const useInfiniteGetTrendingCollectionListQuery = <
      TData = GetTrendingCollectionListQuery,
      TError = unknown
    >(
      variables?: GetTrendingCollectionListQueryVariables,
      options?: UseInfiniteQueryOptions<GetTrendingCollectionListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTrendingCollectionListQuery, TError, TData>(
      variables === undefined ? ['getTrendingCollectionList.infinite'] : ['getTrendingCollectionList.infinite', variables],
      (metaData) => graphqlFetcher<GetTrendingCollectionListQuery, GetTrendingCollectionListQueryVariables>(GetTrendingCollectionListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTrendingItemListDocument = `
    query getTrendingItemList($limit: Int, $viewer_id: Int) {
  getTrendingItemList(limit: $limit, viewer_id: $viewer_id) {
    description
    external_url
    id
    is_minted
    is_unlockable_content
    like_count
    media_path
    thumbnail_path
    name
    price
    slug
    status
    token_id
    token_uri
    unlockable_content
    view_count
    item_favourite_lists {
      id
    }
    owner {
      name
      username
      id
      wallet_address
    }
    payment_token {
      id
      logo
      token_symbol
    }
  }
}
    `;
export const useGetTrendingItemListQuery = <
      TData = GetTrendingItemListQuery,
      TError = unknown
    >(
      variables?: GetTrendingItemListQueryVariables,
      options?: UseQueryOptions<GetTrendingItemListQuery, TError, TData>
    ) =>
    useQuery<GetTrendingItemListQuery, TError, TData>(
      variables === undefined ? ['getTrendingItemList'] : ['getTrendingItemList', variables],
      graphqlFetcher<GetTrendingItemListQuery, GetTrendingItemListQueryVariables>(GetTrendingItemListDocument, variables),
      options
    );
export const useInfiniteGetTrendingItemListQuery = <
      TData = GetTrendingItemListQuery,
      TError = unknown
    >(
      variables?: GetTrendingItemListQueryVariables,
      options?: UseInfiniteQueryOptions<GetTrendingItemListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTrendingItemListQuery, TError, TData>(
      variables === undefined ? ['getTrendingItemList.infinite'] : ['getTrendingItemList.infinite', variables],
      (metaData) => graphqlFetcher<GetTrendingItemListQuery, GetTrendingItemListQueryVariables>(GetTrendingItemListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetUserBuyOfferListsDocument = `
    query getUserBuyOfferLists($after: String, $before: String, $collection_id: Int, $first: Int, $last: Int, $offer_maker_id: Int, $offer_receiver_id: Int, $skip: Int) {
  getUserBuyOfferLists(
    after: $after
    before: $before
    collection_id: $collection_id
    first: $first
    last: $last
    offer_maker_id: $offer_maker_id
    offer_receiver_id: $offer_receiver_id
    skip: $skip
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        created_at
        end_date
        fee_amount
        total_amount
        start_date
        fee_percentage
        id
        user_id
        user {
          name
          username
          wallet_address
        }
        payment_token {
          id
          logo
          name
          token_symbol
          usd_rate
        }
        item {
          id
          slug
          name
          owner_id
          status
          creator {
            wallet_address
            username
          }
        }
        item_id
      }
    }
  }
}
    `;
export const useGetUserBuyOfferListsQuery = <
      TData = GetUserBuyOfferListsQuery,
      TError = unknown
    >(
      variables?: GetUserBuyOfferListsQueryVariables,
      options?: UseQueryOptions<GetUserBuyOfferListsQuery, TError, TData>
    ) =>
    useQuery<GetUserBuyOfferListsQuery, TError, TData>(
      variables === undefined ? ['getUserBuyOfferLists'] : ['getUserBuyOfferLists', variables],
      graphqlFetcher<GetUserBuyOfferListsQuery, GetUserBuyOfferListsQueryVariables>(GetUserBuyOfferListsDocument, variables),
      options
    );
export const useInfiniteGetUserBuyOfferListsQuery = <
      TData = GetUserBuyOfferListsQuery,
      TError = unknown
    >(
      variables?: GetUserBuyOfferListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserBuyOfferListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetUserBuyOfferListsQuery, TError, TData>(
      variables === undefined ? ['getUserBuyOfferLists.infinite'] : ['getUserBuyOfferLists.infinite', variables],
      (metaData) => graphqlFetcher<GetUserBuyOfferListsQuery, GetUserBuyOfferListsQueryVariables>(GetUserBuyOfferListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetUserByTokenDocument = `
    query getUserByToken {
  getUserByToken {
    wallet_address
  }
}
    `;
export const useGetUserByTokenQuery = <
      TData = GetUserByTokenQuery,
      TError = unknown
    >(
      variables?: GetUserByTokenQueryVariables,
      options?: UseQueryOptions<GetUserByTokenQuery, TError, TData>
    ) =>
    useQuery<GetUserByTokenQuery, TError, TData>(
      variables === undefined ? ['getUserByToken'] : ['getUserByToken', variables],
      graphqlFetcher<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, variables),
      options
    );
export const useInfiniteGetUserByTokenQuery = <
      TData = GetUserByTokenQuery,
      TError = unknown
    >(
      variables?: GetUserByTokenQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserByTokenQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetUserByTokenQuery, TError, TData>(
      variables === undefined ? ['getUserByToken.infinite'] : ['getUserByToken.infinite', variables],
      (metaData) => graphqlFetcher<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetUserItemFavouriteListsDocument = `
    query getUserItemFavouriteLists($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $viewer_id: Int, $viewer_wallet_address: String) {
  getUserItemFavouriteLists(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    viewer_id: $viewer_id
    viewer_wallet_address: $viewer_wallet_address
  ) {
    edges {
      cursor
      node {
        id
        name
        price
        media_path
        thumbnail_path
        slug
        like_count
        item_favourite_lists {
          id
        }
        payment_token {
          id
          logo
          token_symbol
        }
        collection {
          id
          name
          slug
        }
        owner {
          name
          username
          id
          wallet_address
        }
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;
export const useGetUserItemFavouriteListsQuery = <
      TData = GetUserItemFavouriteListsQuery,
      TError = unknown
    >(
      variables?: GetUserItemFavouriteListsQueryVariables,
      options?: UseQueryOptions<GetUserItemFavouriteListsQuery, TError, TData>
    ) =>
    useQuery<GetUserItemFavouriteListsQuery, TError, TData>(
      variables === undefined ? ['getUserItemFavouriteLists'] : ['getUserItemFavouriteLists', variables],
      graphqlFetcher<GetUserItemFavouriteListsQuery, GetUserItemFavouriteListsQueryVariables>(GetUserItemFavouriteListsDocument, variables),
      options
    );
export const useInfiniteGetUserItemFavouriteListsQuery = <
      TData = GetUserItemFavouriteListsQuery,
      TError = unknown
    >(
      variables?: GetUserItemFavouriteListsQueryVariables,
      options?: UseInfiniteQueryOptions<GetUserItemFavouriteListsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetUserItemFavouriteListsQuery, TError, TData>(
      variables === undefined ? ['getUserItemFavouriteLists.infinite'] : ['getUserItemFavouriteLists.infinite', variables],
      (metaData) => graphqlFetcher<GetUserItemFavouriteListsQuery, GetUserItemFavouriteListsQueryVariables>(GetUserItemFavouriteListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GlobalSearchDocument = `
    query globalSearch($limit: Int, $query: String!) {
  globalSearch(query: $query, limit: $limit) {
    account {
      id
      profile_img
      username
    }
    collection {
      id
      name
      slug
      logo
      blockchain {
        id
        logo
        network_name
      }
    }
    item {
      id
      name
      slug
      thumbnail_path
    }
  }
}
    `;
export const useGlobalSearchQuery = <
      TData = GlobalSearchQuery,
      TError = unknown
    >(
      variables: GlobalSearchQueryVariables,
      options?: UseQueryOptions<GlobalSearchQuery, TError, TData>
    ) =>
    useQuery<GlobalSearchQuery, TError, TData>(
      ['globalSearch', variables],
      graphqlFetcher<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, variables),
      options
    );
export const useInfiniteGlobalSearchQuery = <
      TData = GlobalSearchQuery,
      TError = unknown
    >(
      variables: GlobalSearchQueryVariables,
      options?: UseInfiniteQueryOptions<GlobalSearchQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GlobalSearchQuery, TError, TData>(
      ['globalSearch.infinite', variables],
      (metaData) => graphqlFetcher<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemBuyOfferListDocument = `
    query itemBuyOfferList($item_id: Int!) {
  itemBuyOfferList(item_id: $item_id) {
    id
    uid
    status
    type
    seller_amount
    total_amount
    created_at
    start_date
    end_date
    user {
      id
      wallet_address
      username
    }
    payment_token {
      id
      type
      name
      contract_address
      token_symbol
      total_decimal
      logo
      usd_rate
    }
  }
}
    `;
export const useItemBuyOfferListQuery = <
      TData = ItemBuyOfferListQuery,
      TError = unknown
    >(
      variables: ItemBuyOfferListQueryVariables,
      options?: UseQueryOptions<ItemBuyOfferListQuery, TError, TData>
    ) =>
    useQuery<ItemBuyOfferListQuery, TError, TData>(
      ['itemBuyOfferList', variables],
      graphqlFetcher<ItemBuyOfferListQuery, ItemBuyOfferListQueryVariables>(ItemBuyOfferListDocument, variables),
      options
    );
export const useInfiniteItemBuyOfferListQuery = <
      TData = ItemBuyOfferListQuery,
      TError = unknown
    >(
      variables: ItemBuyOfferListQueryVariables,
      options?: UseInfiniteQueryOptions<ItemBuyOfferListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemBuyOfferListQuery, TError, TData>(
      ['itemBuyOfferList.infinite', variables],
      (metaData) => graphqlFetcher<ItemBuyOfferListQuery, ItemBuyOfferListQueryVariables>(ItemBuyOfferListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemBuyOfferListIdsDocument = `
    query itemBuyOfferListIds($item_id: Int!) {
  itemBuyOfferList(item_id: $item_id) {
    id
    uid
  }
}
    `;
export const useItemBuyOfferListIdsQuery = <
      TData = ItemBuyOfferListIdsQuery,
      TError = unknown
    >(
      variables: ItemBuyOfferListIdsQueryVariables,
      options?: UseQueryOptions<ItemBuyOfferListIdsQuery, TError, TData>
    ) =>
    useQuery<ItemBuyOfferListIdsQuery, TError, TData>(
      ['itemBuyOfferListIds', variables],
      graphqlFetcher<ItemBuyOfferListIdsQuery, ItemBuyOfferListIdsQueryVariables>(ItemBuyOfferListIdsDocument, variables),
      options
    );
export const useInfiniteItemBuyOfferListIdsQuery = <
      TData = ItemBuyOfferListIdsQuery,
      TError = unknown
    >(
      variables: ItemBuyOfferListIdsQueryVariables,
      options?: UseInfiniteQueryOptions<ItemBuyOfferListIdsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemBuyOfferListIdsQuery, TError, TData>(
      ['itemBuyOfferListIds.infinite', variables],
      (metaData) => graphqlFetcher<ItemBuyOfferListIdsQuery, ItemBuyOfferListIdsQueryVariables>(ItemBuyOfferListIdsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const ItemDetailsForTransferDocument = `
    query ItemDetailsForTransfer($slugOrTokenId: String!) {
  ItemDetailsBySlugOrTokenId(slugOrTokenId: $slugOrTokenId) {
    id
    name
    slug
    media_path
    thumbnail_path
    token_id
    is_minted
    owner {
      id
      wallet_address
    }
    collection {
      id
      blockchain {
        id
        chain_id
        status
        nft_contract
        exchange_contract
        exchange_contract_name
        exchange_contract_version
      }
    }
    active_sell {
      id
    }
    active_buy {
      id
    }
  }
}
    `;
export const useItemDetailsForTransferQuery = <
      TData = ItemDetailsForTransferQuery,
      TError = unknown
    >(
      variables: ItemDetailsForTransferQueryVariables,
      options?: UseQueryOptions<ItemDetailsForTransferQuery, TError, TData>
    ) =>
    useQuery<ItemDetailsForTransferQuery, TError, TData>(
      ['ItemDetailsForTransfer', variables],
      graphqlFetcher<ItemDetailsForTransferQuery, ItemDetailsForTransferQueryVariables>(ItemDetailsForTransferDocument, variables),
      options
    );
export const useInfiniteItemDetailsForTransferQuery = <
      TData = ItemDetailsForTransferQuery,
      TError = unknown
    >(
      variables: ItemDetailsForTransferQueryVariables,
      options?: UseInfiniteQueryOptions<ItemDetailsForTransferQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ItemDetailsForTransferQuery, TError, TData>(
      ['ItemDetailsForTransfer.infinite', variables],
      (metaData) => graphqlFetcher<ItemDetailsForTransferQuery, ItemDetailsForTransferQueryVariables>(ItemDetailsForTransferDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const MyCollectionWatchListDocument = `
    query myCollectionWatchList($after: String, $before: String, $first: Int, $last: Int, $skip: Int) {
  myCollectionWatchList(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        name
        slug
        logo
        feature_image
        banner_image
        _count {
          items
        }
        user {
          id
          username
          wallet_address
        }
      }
    }
  }
}
    `;
export const useMyCollectionWatchListQuery = <
      TData = MyCollectionWatchListQuery,
      TError = unknown
    >(
      variables?: MyCollectionWatchListQueryVariables,
      options?: UseQueryOptions<MyCollectionWatchListQuery, TError, TData>
    ) =>
    useQuery<MyCollectionWatchListQuery, TError, TData>(
      variables === undefined ? ['myCollectionWatchList'] : ['myCollectionWatchList', variables],
      graphqlFetcher<MyCollectionWatchListQuery, MyCollectionWatchListQueryVariables>(MyCollectionWatchListDocument, variables),
      options
    );
export const useInfiniteMyCollectionWatchListQuery = <
      TData = MyCollectionWatchListQuery,
      TError = unknown
    >(
      variables?: MyCollectionWatchListQueryVariables,
      options?: UseInfiniteQueryOptions<MyCollectionWatchListQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<MyCollectionWatchListQuery, TError, TData>(
      variables === undefined ? ['myCollectionWatchList.infinite'] : ['myCollectionWatchList.infinite', variables],
      (metaData) => graphqlFetcher<MyCollectionWatchListQuery, MyCollectionWatchListQueryVariables>(MyCollectionWatchListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};
