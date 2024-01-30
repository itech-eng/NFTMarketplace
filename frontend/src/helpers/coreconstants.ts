// collection theme type
export const COLLECTION_THEME_PADDED = 1;
export const COLLECTION_THEME_CONTAINED = 2;
export const COLLECTION_THEME_COVERED = 3;

//
export const NULL_ETH_ADDRESS = "0x0000000000000000000000000000000000000000";
//

// image upload size
export const MAX_IMAGE_SIZE_IN_MB = 2;
export const MAX_ITEM_IMAGE_SIZE_IN_MB = 2;
export const MAX_ITEM_FILE_SIZE_IN_MB = 100;
//

//blockchain testnets slugs
export const BLOCKCHAIN_RINKEBY_SLUG = "rinkeby";
export const BLOCKCHAIN_ROPSTEN_SLUG = "ropsten";
export const BLOCKCHAIN_GOERLI_SLUG = "goerli";
export const BLOCKCHAIN_KOVAN_SLUG = "kovan";
export const BLOCKCHAIN_BINANCE_TESTNET_SLUG = "bsctestnet";
export const BLOCKCHAIN_MUMBAI_SLUG = "mumbai";
//

//blockchain mainnets slugs
export const BLOCKCHAIN_ETHEREUM_SLUG = "ethereum";
export const BLOCKCHAIN_POLYGON_SLUG = "polygon";
export const BLOCKCHAIN_BINANCE_MAINNET_SLUG = "bscmainnet";
//

//blockchain testnets chain id
export const BLOCKCHAIN_RINKEBY_CHAIN_ID = 4;
export const BLOCKCHAIN_ROPSTEN_CHAIN_ID = 3;
export const BLOCKCHAIN_GOERLI_CHAIN_ID = 5;
export const BLOCKCHAIN_KOVAN_CHAIN_ID = 42;
export const BLOCKCHAIN_BINANCE_TESTNET_CHAIN_ID = 97;
export const BLOCKCHAIN_MUMBAI_CHAIN_ID = 80001;
//

//blockchain mainnets chain id
export const BLOCKCHAIN_ETHEREUM_CHAIN_ID = 1;
export const BLOCKCHAIN_POLYGON_CHAIN_ID = 137;
export const BLOCKCHAIN_BINANCE_MAINNET_CHAIN_ID = 56;
//

// supported chain ids
export const SUPPORTED_CHAIN_IDS = [
  BLOCKCHAIN_RINKEBY_CHAIN_ID,
  BLOCKCHAIN_ROPSTEN_CHAIN_ID,
  BLOCKCHAIN_GOERLI_CHAIN_ID,
  // BLOCKCHAIN_KOVAN_CHAIN_ID,
  BLOCKCHAIN_BINANCE_TESTNET_CHAIN_ID,
  BLOCKCHAIN_MUMBAI_CHAIN_ID,
  BLOCKCHAIN_ETHEREUM_CHAIN_ID,
  BLOCKCHAIN_POLYGON_CHAIN_ID,
  BLOCKCHAIN_BINANCE_MAINNET_CHAIN_ID,
];
//
export const LANGUAGES = ["en", "es"];
// from server for collection
export const STATUS_ACTIVE = 1;
export const STATUS_INACTIVE = 0;
export const STATUS_DONE = 1;
export const STATUS_PENDING = 0;
export const STATUS_SUSPENDED = 10;

// Item Events
export const ITEM_EVENT_TYPE_MINT = 1;
export const ITEM_EVENT_TYPE_LISTINGS = 2;
export const ITEM_EVENT_TYPE_SALES = 3;
export const ITEM_EVENT_TYPE_BUY_OFFERS = 4;
export const ITEM_EVENT_TYPE_BIDS = 5;
export const ITEM_EVENT_TYPE_TRANSFERS = 6;
export const ITEM_EVENT_TYPE_LISTING_CANCEL = 7;
export const ITEM_EVENT_TYPE_BUY_OFFER_CANCEL = 8;
export const ITEM_EVENT_TYPE_BID_CANCEL = 9;

// item activity
export const ITEM_MINT_STATUS_IN_PROGRESS = 0;
export const ITEM_MINT_STATUS_DONE = 1;
export const ITEM_MINT_STATUS_FAILED = 2;

// item mint status
export const ITEM_IS_MINTED_FALSE = 0;
export const ITEM_IS_MINTED_TRUE = 1;

// Exchange Type
export const EXCHANGE_BUY_NOW = 1;
export const EXCHANGE_ACCEPT_OFFER = 2;

// Offer Type
export const OFFER_TYPE_SELL = 1;
export const OFFER_TYPE_BUY = 2;

// Sell Offer Type
export const SELL_OFFER_TYPE_DEFAULT = 1;
export const SELL_OFFER_TYPE_ACUTION = 2;

// Buy offer type
export const BUY_OFFER_TYPE_DEFAULT = 1;
export const BUY_OFFER_TYPE_BID = 2;

// Buy sell offer status
export const BUY_SELL_STATUS_IN_PROGRESS = 0;
export const BUY_SELL_STATUS_ACTIVE = 1;
export const BUY_SELL_STATUS_EXPIRED = 2;
export const BUY_SELL_STATUS_COMPLETED = 3;

// Exchange offer status
export const EXCHANGE_STATUS_IN_PROGRESS = 0;
export const EXCHANGE_STATUS_DONE = 1;
export const EXCHANGE_STATUS_FAILED = 2;

//payment token types
export const PAYMENT_TOKEN_TYPE_NATIVE_COIN = 1;
export const PAYMENT_TOKEN_TYPE_TOKEN = 2;

// Token is wrappable
export const PAYMENT_TOKEN_IS_WRAPPABLE_FALSE = 0;
export const PAYMENT_TOKEN_IS_WRAPPABLE_TRUE = 1;

// http response code
export const CODE_UNAUTHORIZED = 401;

// custom response code
export const CODE_VERIFY_EMAIL = 901;
export const CODE_VERIFY_DEVICE = 902;
export const CODE_VERIFY_GAUTH = 903;
export const CODE_USER_SUSPENDED = 904;
export const CODE_ACCOUNT_NOT_ACTIVE = 905;

// collection details - blockchain status
export const BLOCKCHAIN_STATUS_INACTIVE = 0;
export const BLOCKCHAIN_STATUS_ACTIVE = 1;

// item details unlockable content
export const ITEM_UNLOCKABLE_TRUE = 1;
export const ITEM_UNLOCKABLE_FALSE = 0;

export const HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

// Active Modal
export const ACTIVE_MODAL_BUY_NOW = 1;
export const ACTIVE_MODAL_MAKE_OFFER = 2;
export const ACTIVE_MODAL_PLACE_BID = 3;
export const ACTIVE_MODAL_ACCEPT_OFFER = 4;
export const ACTIVE_MODAL_CANCEL_OFFER = 5;

// Filter Status
export const ITEM_FILTER_STATUS_BUY_NOW = 1;
export const ITEM_FILTER_STATUS_ON_AUCTION = 2;
export const ITEM_FILTER_STATUS_NEW = 3;
export const ITEM_FILTER_STATUS_HAS_OFFERS = 4;

// sorting values
export const SORTING_VALUE_NEWEST = 1;
export const SORTING_VALUE_OLDEST = 2;
export const SORTING_VALUE_PRICE_L2H = 3;
export const SORTING_VALUE_PRICE_H2L = 4;
export const SORTING_VALUE_MOST_FAVOURITE = 5;
export const SORTING_VALUE_MOST_VIEWED = 6;

// notification settings event
export const NOTIFICATION_EVENTS_ITEM_SOLD = 1;
export const NOTIFICATION_EVENTS_BID_ACTIVITY = 2;
export const NOTIFICATION_EVENTS_PRICE_CHANGE = 3;
export const NOTIFICATION_EVENTS_AUCTION_EXPIRATION = 4;
export const NOTIFICATION_EVENTS_OUTBID = 5;
export const NOTIFICATION_EVENTS_OWNED_ITEM_UPDATES = 6;
export const NOTIFICATION_EVENTS_SUCCESSFULLY_PURCHASED = 7;
export const NOTIFICATION_EVENTS_OPENSEA_NEWSLETTER = 8;

export const DAYS_ONE_DAY = 1;
export const DAYS_SEVEN_DAYS = 7;
export const DAYS_FIFTEEN_DAYS = 15;
export const DAYS_THIRTY_DAYS = 30;

export enum RANKING_LIST_LIMIT_FOR_HOMEPAGE {
  ITEMS_FIFTEEN = 15,
  ITEMS_SIXTEEN,
}

export const PAGINATE_NUMBER_ASSETS = 20;

export const MIN_COIN_INPUT_AMOUNT = 0.000001;
export const COMMON_COIN_DECIMAL_VISUAL = 6;

export enum SEARCH {
  GLOBAL_SEARCH,
  HOMEPAGE_SEARCH,
}

export enum DEFAULT_IMAGE {
  ITEM = "/assets/images/star.svg",
  USER = "/assets/images/default-user.svg",
  HERO = "/assets/images/hero-banner-bg.jpg",
}
