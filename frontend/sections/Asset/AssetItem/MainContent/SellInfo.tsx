import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  BsArrowUpRightCircle,
  BsArrowUpRightCircleFill,
  BsWallet,
} from "react-icons/bs";
import { FiClock, FiTag } from "react-icons/fi";
import { LoadingCircles } from "../../../../components/Loader/LoadingCircles";
import {
  buyOfferConfirm,
  convertTokenAmountToInt,
  formatPriceK,
  getPercantageValue,
  processWalletErrorMessage,
  trimUnwantedZeros,
} from "../../../../src/helpers/functions";
import classes from "./MainContent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CountdownTimer } from "../../../../components/Assets/CountDown";
import { AddFundsOnPurchase } from "../../../../components/Assets/SellModals/AddFundsOnPurchase/index";
import { RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import {
  ACTIVE_MODAL_BUY_NOW,
  ACTIVE_MODAL_MAKE_OFFER,
  ACTIVE_MODAL_PLACE_BID,
  BUY_OFFER_TYPE_BID,
  BUY_OFFER_TYPE_DEFAULT,
  COMMON_COIN_DECIMAL_VISUAL,
  HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER,
  PAYMENT_TOKEN_TYPE_TOKEN,
  SELL_OFFER_TYPE_ACUTION,
  SELL_OFFER_TYPE_DEFAULT,
} from "../../../../src/helpers/coreconstants";
import { RootState } from "../../../../src/store";
import { setShowSidebar } from "../../../../src/store/slices/walletDrawerSlice";
import { MakeOfferModal } from "../../../../components/Assets/SellModals/MakeOffer";
import { Modal } from "../../../../components/Modal";
import {
  useCreateBuyOfferMutation,
  useItemDetailsForHighestBidQuery,
  useItemExchangeInProgressQuery,
} from "../../../../src/graphql/generated";
import { ethers } from "ethers";
import { useToasts } from "react-toast-notifications";
import { buyType } from "../../../../src/wallet/offerTypes";
import {
  checkOnPageAuthentication,
  getItemDetailsForActiveBuy,
  getItemsTokens,
} from "../../../../src/ssr/data";
import { AuthenticationModal } from "../../../../components/Assets/SellModals/Authentication";
import { CheckoutModal } from "../../../../components/Assets/SellModals/Checkout";
import { getEthBalance } from "../../../../src/ssr/web3";
import { erc20Abi } from "../../../../src/wallet/erc20Abi";
import { SuccessModal } from "../../../../components/Assets/SellModals/SuccessModal";
import { IoWalletOutline } from "react-icons/io5";
import { PlaceBidModal } from "../../../../components/Assets/SellModals/PlaceBid";
import { SETTINGS_BUY_SELL_FEE_PERCENTAGE } from "src/helpers/slugcontanst";
import { CHAIN_SLUG_MAPPING } from "src/helpers/corearray";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export const SellInfo = ({ item, web3Data, isRefetch, setRefetch }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { chainId } = useWeb3React();
  const { addToast } = useToasts();

  // redux
  const dispatch = useDispatch();
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );
  const isBuyOrAcceptSlice = useSelector(
    (state: RootState) => state.isBuyOrAcceptSlice
  );

  // check my item
  const myItem = item.owner.wallet_address === userData?.wallet_address;

  const [itemActiveBuy, setItemActiveBuy] = useState(item.active_buy);

  useEffect(() => {
    getItemDetailsForActiveBuy(item.slug, userData.wallet_address).then((res) =>
      setItemActiveBuy(res?.active_buy)
    );
  }, [userData.wallet_address, item]);

  const isMyOffer =
    itemActiveBuy &&
    itemActiveBuy?.user?.wallet_address === userData?.wallet_address;
  const [myOffer, setMyOffer] = useState(isMyOffer);

  useEffect(() => setMyOffer(isMyOffer), [isMyOffer]);

  // console.log("myOffer: ", isMyOffer, myOffer, itemActiveBuy);

  // web3 react & etc
  const { active, library, account } = web3Data;
  const signer = library?.getSigner();

  const sellOffer = item?.active_sell;
  const buyOffer = item?.active_buy;
  const blockchain = item?.collection?.blockchain;

  const [showBuyNowModalCloseButton, setShowBuyNowModalCloseButton] =
    useState(true);
  const [showBuyNowModal, setShowBuyNowModal] = useState<boolean>(false);
  const [buyNowModalNumber, setBuyNowModalNumber] = useState<number>(1);
  const [buyNowFinshData, setBuyNowFinshData] = useState<any>(undefined);
  const [userEthBalance, setUserEthBalance] = useState<string | null>(null);

  const [showCreateOfferFixedModal, setShowCreateOfferFixedModal] =
    useState(false);

  const [authenticateAction, setAutheticateAction] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    if (activeModal && activeModal === ACTIVE_MODAL_BUY_NOW) {
      setOpenBidModal(false);
      setShowCreateOfferFixedModal(false);
      setShowBuyNowModal(authenticateAction);
    }

    if (activeModal && activeModal === ACTIVE_MODAL_MAKE_OFFER) {
      setShowBuyNowModal(false);
      setOpenBidModal(false);
      setShowCreateOfferFixedModal(authenticateAction);
    }

    if (activeModal && activeModal === ACTIVE_MODAL_PLACE_BID) {
      setShowBuyNowModal(false);
      setShowCreateOfferFixedModal(false);
      setOpenBidModal(authenticateAction);
    }
  }, [activeModal, authenticateAction]);

  const handleBuyNowProcess = async () => {
    if (!active) {
      dispatch(setShowSidebar(true));
    } else if (blockchain.chain_id !== chainId) {
      let msg = (
        <>
          {t("Please, switch your network from your wallet to")}{" "}
          <strong
            style={{
              color: "inherit",
              textTransform: "capitalize",
            }}
          >
            {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
          </strong>
        </>
      );

      addToast(msg, { appearance: "error" });

      return;
    } else {
      const userEthBalance = await getEthBalance(library, account);
      setUserEthBalance(userEthBalance);

      const errMessage = t("You do not have enough funds to buy this asset!");

      if (Number(sellOffer?.total_amount) > Number(userEthBalance)) {
        addToast(errMessage, { appearance: "error" });
        throw errMessage;
      }

      if (Number(userEthBalance) && parseFloat(userEthBalance) > 0) {
        setBuyNowModalNumber(2);
        setLoading(true);
      } else {
        setBuyNowModalNumber(1);
      }
      setShowBuyNowModal(true);
      setActiveModal(ACTIVE_MODAL_BUY_NOW);
      setAutheticateAction(false);
      try {
        await checkOnPageAuthentication(
          userData.wallet_address,
          setAutheticateAction
        );
      } catch (err: any) {
        addToast(err.message, { appearance: "error" });
        setShowBuyNowModal(false);
        setLoading(false);
      }
    }
  };

  // hanlde make offer for fix price
  const today: any = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + 3);

  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState<any>(tokenList[0]);
  const [offerPriceFixed, setOfferPriceFixed] = useState<any>("");
  const [offerEndDateFixed, setOfferEndDateFixed] = useState<any>(nextDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // before the modal opened
    getItemsTokens(item.id).then((res) => {
      const data = res.filter(
        (item: any) => item.type === PAYMENT_TOKEN_TYPE_TOKEN
      );
      setTokenList(data);
      setSelectedToken(data[0]);
    });
  }, []);

  // console.log("p: ", selectedToken);

  const createBuyOfferMutation = useCreateBuyOfferMutation();

  const dataForBuyOfferConfirm = {
    domainDataName: blockchain.exchange_contract_name,
    domainDataVersion: blockchain.exchange_contract_version,
    chainId: blockchain.chain_id,
    verifyingContract: blockchain.exchange_contract,
    settingsFeePercent: settings
      ? parseFloat(settings[SETTINGS_BUY_SELL_FEE_PERCENTAGE])
      : 0,
    itemRoyalties: item.collection.royalties,
    royaltyPayTo: item.collection.payout_address,
    givenPrice: parseFloat(offerPriceFixed),
    startDate: today,
    endDate: offerEndDateFixed,
    nftContract: blockchain.nft_contract,
    tokenId: item.token_id,
    paymentTokenContract: selectedToken && selectedToken.contract_address,
    tokenDecimal: selectedToken && selectedToken.total_decimal,
    walletAddress: userData.wallet_address,
  };

  const handleCreateBuyOfferFixed = async () => {
    const contract = new ethers.Contract(
      selectedToken.contract_address,
      erc20Abi,
      signer
    );

    try {
      setIsSubmitting(true);

      if (blockchain.chain_id !== chainId) {
        let msg = (
          <>
            {t("Please, switch your network from your wallet to")}{" "}
            <strong
              style={{
                color: "inherit",
                textTransform: "capitalize",
              }}
            >
              {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
            </strong>
          </>
        );

        setLoading(false);
        setIsSubmitting(false);

        addToast(msg, { appearance: "error" });
        return;
      }

      const tokenAllowance = await contract.allowance(
        userData.wallet_address,
        blockchain.exchange_contract
      );
      
      const offerAmount = convertTokenAmountToInt(offerPriceFixed, selectedToken.total_decimal);
      if (parseInt(tokenAllowance) < parseInt(offerAmount)) {
        const tx = await contract.approve(
          blockchain.exchange_contract,
          HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER
        );
        await tx.wait();
        const tokenAllowance2 = await contract.allowance(
          userData.wallet_address,
          blockchain.exchange_contract
        );

        if (parseInt(tokenAllowance2) == parseInt(HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER))
          await buyOfferHelper();
        else
          throw new Error(
            t(
              "Payment token approve process is not successful. Try agian later."
            )
          );
      } else {
        await buyOfferHelper();
      }

      // submit is false & close modal
      addToast(t("Offer has been created"), { appearance: "success" });
      setLoading(false);
      setIsSubmitting(false);
      setShowCreateOfferFixedModal(false);
      setSelectedToken(tokenList[0]);
      setOfferPriceFixed(null);
      setRefetch(true);
      router.push(router.asPath);
    } catch (err: any) {
      if (err.message) {
        console.log(err.message);
        const errMsg = processWalletErrorMessage(err.message, err);
        addToast(errMsg, { appearance: "error" });
      }
      setLoading(false);
      setOfferEndDateFixed(nextDate);
      setIsSubmitting(false);
      setShowCreateOfferFixedModal(false);
      setSelectedToken(tokenList[0]);
      setOfferPriceFixed(null);
    }
  };

  const buyOfferHelper = async () => {
    const { signature, nonce } = await buyOfferConfirm(
      dataForBuyOfferConfirm,
      signer,
      buyType
    );

    const mutationData = {
      amount: parseFloat(offerPriceFixed),
      end_date: offerEndDateFixed,
      item_id: Number(item.id),
      nonce: nonce,
      payment_token_id: selectedToken.id,
      signature: signature,
      start_date: today, // "2022-04-25 05:00:00",
      type: BUY_OFFER_TYPE_DEFAULT,
    };

    // console.table(mutationData);

    // mutation
    await createBuyOfferMutation.mutateAsync(mutationData);
  };

  // exchange in progress
  const [exchangeInProgress, setExchangeInProgress] = useState(
    item?.exchange_in_progress
  );

  const { data: exchangeInProgressQuery } = useItemExchangeInProgressQuery(
    {
      slugOrTokenId: item.slug,
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const exchangeInProg =
    exchangeInProgressQuery?.ItemDetailsBySlugOrTokenId.exchange_in_progress;

  useEffect(() => {
    setExchangeInProgress(exchangeInProg);
  }, [exchangeInProg]);
  // exchange in progress end

  // highest bid
  const [highestBid, setHighestBid] = useState(item.highest_bid);
  const { data: highestBidQuery, refetch: refecthHighestBid } =
    useItemDetailsForHighestBidQuery(
      {
        slugOrTokenId: item.slug,
      },
      {
        refetchOnWindowFocus: true,
      }
    );

  const highestBidFetched =
    highestBidQuery?.ItemDetailsBySlugOrTokenId.highest_bid;

  useEffect(() => {
    refecthHighestBid();
    setHighestBid(highestBidFetched);
  }, [highestBidFetched, item.highest_bid]);
  //

  // Place bid here
  const [openBidModal, setOpenBidModal] = useState(false);
  const suggestedBidAMount = highestBid
    ? (
        Number(highestBid.total_amount) +
        getPercantageValue(highestBid.total_amount, 30)
      ).toFixed(COMMON_COIN_DECIMAL_VISUAL)
    : Number(sellOffer?.total_amount).toFixed(COMMON_COIN_DECIMAL_VISUAL);

  const [bidPrice, setBidPrice] = useState<any>(
    trimUnwantedZeros(Number(suggestedBidAMount))
  );

  useEffect(
    () => setBidPrice(trimUnwantedZeros(Number(suggestedBidAMount))),
    [suggestedBidAMount]
  );

  // console.log("bid: ", suggestedBidAMount, bidPrice);

  const auctionEndDateOne: any = new Date(
    new Date(sellOffer?.end_date).setDate(
      new Date(sellOffer?.end_date).getDate() + 1
    )
  );

  const dataForBidding = {
    domainDataName: blockchain.exchange_contract_name,
    domainDataVersion: blockchain.exchange_contract_version,
    chainId: blockchain.chain_id,
    verifyingContract: blockchain.exchange_contract,
    settingsFeePercent: settings
      ? parseFloat(settings[SETTINGS_BUY_SELL_FEE_PERCENTAGE])
      : 0,
    itemRoyalties: item.collection.royalties,
    royaltyPayTo: item.collection.payout_address,
    givenPrice: parseFloat(bidPrice),
    startDate: today,
    endDate: auctionEndDateOne,
    nftContract: blockchain.nft_contract,
    tokenId: item.token_id,
    paymentTokenContract: sellOffer && sellOffer.payment_token.contract_address,
    tokenDecimal: sellOffer && sellOffer.payment_token.total_decimal,
    walletAddress: userData.wallet_address,
  };

  const handlePlaceBid = async () => {
    const contract = new ethers.Contract(
      sellOffer.payment_token.contract_address,
      erc20Abi,
      signer
    );

    try {
      setIsSubmitting(true);

      if (blockchain.chain_id !== chainId) {
        let msg = (
          <>
            {t("Please, switch your network from your wallet to")}{" "}
            <strong
              style={{
                color: "inherit",
                textTransform: "capitalize",
              }}
            >
              {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
            </strong>
          </>
        );

        setIsSubmitting(false);
        setOpenBidModal(false);
        setActiveModal(null);
        setAutheticateAction(false);

        addToast(msg, { appearance: "error" });
        return;
      }

      const tokenAllowance = await contract.allowance(
        userData.wallet_address,
        blockchain.exchange_contract
      );

      const bidAmount = convertTokenAmountToInt(bidPrice, sellOffer.payment_token.total_decimal);
      if (parseInt(tokenAllowance) < parseInt(bidAmount)) {
        const tx = await contract.approve(
          blockchain.exchange_contract,
          HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER
        );

        await tx.wait();

        const tokenAllowance2 = await contract.allowance(
          userData.wallet_address,
          blockchain.exchange_contract
        );

        if (parseInt(tokenAllowance2) == parseInt(HIGHEST_ERC20_TOKEN_AMOUNT_INTEGER))
          await placeBidHelper();
        else
          throw new Error(
            t(
              "Payment token approve process is not successful. Try agian later."
            )
          );
      } else {
        await placeBidHelper();
      }

      // submit is false & close modal
      addToast(t("Bid has been placed"), { appearance: "success" });
      setIsSubmitting(false);
      setOpenBidModal(false);
      setActiveModal(null);
      setAutheticateAction(false);

      setTimeout(() => {
        router.push(router.asPath);
      }, 500);
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });
      setIsSubmitting(false);
      setOpenBidModal(false);
      setActiveModal(null);
      setAutheticateAction(false);
    }
  };

  const placeBidHelper = async () => {
    const { signature, nonce } = await buyOfferConfirm(
      dataForBidding,
      signer,
      buyType
    );

    const mutationData = {
      amount: parseFloat(bidPrice),
      end_date: auctionEndDateOne,
      item_id: Number(item.id),
      nonce: nonce,
      payment_token_id: sellOffer.payment_token.id,
      signature: signature,
      start_date: today,
      type: BUY_OFFER_TYPE_BID,
    };

    // console.table(mutationData);

    // mutation
    await createBuyOfferMutation.mutateAsync(mutationData);
  };

  // sell offer showing & delaying
  const [showAuctionCountdown, setShowAuctionCountdown] = useState(false);

  useEffect(() => {
    if (sellOffer) {
      // if minDiff is bigger than 0 && show coundown after minDiff
      // minDiff < 0 && show coundown

      const now = moment(new Date());
      const auctionStart = moment(sellOffer?.start_date); // another date
      const duration = moment.duration(auctionStart.diff(now));
      const minutesDiff = duration.asMinutes();
      // console.log("start: ", new Date(sellOffer?.start_date));
      // console.log("mins: ", minutesDiff);

      if (Number(minutesDiff) > 0) {
        // console.log("%cstart delay", "font-size: 2rem;");

        // const delayDebounceFn =
        setTimeout(() => {
          setShowAuctionCountdown(true);
        }, minutesDiff * 60 * 1000);
      } else {
        // console.log("%cstart init", "font-size: 2rem;");
        setShowAuctionCountdown(true);
      }
    } else {
      setShowAuctionCountdown(false);
    }
  }, [sellOffer]);

  // console.log(sellOffer);
  // console.log(item);

  return exchangeInProgress &&
    !isBuyOrAcceptSlice.isBuying &&
    !isBuyOrAcceptSlice.isAccepting ? (
    <></>
  ) : (
    <>
      <div className={classes.disclosure}>
        {sellOffer && (
          <div
            className={classes.panelButton + " " + classes.panelButtonNonTab}
          >
            <span>
              <FiClock className="mr-3" />
              {showAuctionCountdown ? (
                <>
                  {t("Sale ends at")}{" "}
                  {moment(sellOffer.end_date).format("LLLL")}
                </>
              ) : (
                <>
                  {t("Sale starts at")}{" "}
                  {moment(sellOffer.start_date).format("LLLL")}
                </>
              )}
              {sellOffer.type === SELL_OFFER_TYPE_ACUTION &&
                showAuctionCountdown && (
                  <CountdownTimer
                    endDate={showAuctionCountdown && sellOffer.end_date}
                  />
                )}
            </span>
          </div>
        )}

        <div className={classes.panelBody}>
          {sellOffer && showAuctionCountdown && (
            <>
              <p className="mb-3">
                {sellOffer.type !== SELL_OFFER_TYPE_ACUTION
                  ? t("Current Price")
                  : highestBid
                  ? t("Top Bid")
                  : t("Minimum Bid")}
              </p>

              <p className={classes.price}>
                <RcTooltip overlay={sellOffer.payment_token.token_symbol}>
                  <img
                    src={sellOffer.payment_token.logo}
                    alt={sellOffer.payment_token.name}
                    className={classes.blockchainLogo}
                  />
                </RcTooltip>

                {sellOffer.type === SELL_OFFER_TYPE_DEFAULT &&
                  formatPriceK(
                    sellOffer.total_amount,
                    COMMON_COIN_DECIMAL_VISUAL
                  )}

                {sellOffer.type === SELL_OFFER_TYPE_ACUTION && (
                  <>
                    {highestBid
                      ? formatPriceK(
                          highestBid.total_amount,
                          COMMON_COIN_DECIMAL_VISUAL
                        )
                      : formatPriceK(
                          sellOffer.total_amount,
                          COMMON_COIN_DECIMAL_VISUAL
                        )}
                  </>
                )}

                <span>
                  (${" "}
                  {sellOffer.type === SELL_OFFER_TYPE_DEFAULT &&
                    formatPriceK(
                      sellOffer.payment_token.usd_rate * sellOffer.total_amount
                    )}
                  {sellOffer.type === SELL_OFFER_TYPE_ACUTION &&
                    formatPriceK(
                      sellOffer.payment_token.usd_rate *
                        (highestBid
                          ? highestBid.total_amount
                          : sellOffer.total_amount)
                    )}
                  )
                </span>

                {/* auction icon */}
                {sellOffer.type === SELL_OFFER_TYPE_ACUTION && (
                  <RcTooltip
                    overlay={`${t(
                      "The highest bidder will win the item at the end of the auction."
                    )} ${
                      sellOffer.reserved_price > 0
                        ? t("However, if the highest bid is less than") +
                          " " +
                          sellOffer.reserved_price +
                          " " +
                          sellOffer.payment_token.token_symbol +
                          ", " +
                          t(
                            "there will be no automatic sale at the end of the auction."
                          )
                        : ""
                    }`}
                  >
                    <BsArrowUpRightCircleFill
                      aria-label="up arrow"
                      className={classes.auctionArrow}
                    />
                  </RcTooltip>
                )}
              </p>
            </>
          )}

          <div className={classes.btnsPrice}>
            {/* buy now */}
            {sellOffer &&
              sellOffer.type === SELL_OFFER_TYPE_DEFAULT &&
              showAuctionCountdown && (
                <>
                  {!myItem ? (
                    <RcTooltip overlay={t("Buy Now")}>
                      <button
                        type="button"
                        className={classes.buyBtn + " primary-btn"}
                        disabled={
                          activeModal === ACTIVE_MODAL_BUY_NOW && isLoading
                        }
                        onClick={handleBuyNowProcess}
                      >
                        {activeModal === ACTIVE_MODAL_BUY_NOW && isLoading ? (
                          <LoadingCircles />
                        ) : (
                          <>
                            {" "}
                            <BsWallet className="mr-3" />
                            {t("Buy now")}
                          </>
                        )}
                      </button>
                    </RcTooltip>
                  ) : (
                    <RcTooltip overlay={t("You own this item")}>
                      <button
                        type="button"
                        className={classes.myBuyBtn + " primary-btn"}
                        disabled={true}
                      >
                        {" "}
                        <BsWallet className="mr-3" />
                        {t("Buy now")}
                      </button>
                    </RcTooltip>
                  )}
                </>
              )}

            {/* place bids */}
            {/* not my item -> if sellOffer && type is auction && showCountdown */}
            {!myItem &&
              sellOffer &&
              sellOffer.type === SELL_OFFER_TYPE_ACUTION &&
              showAuctionCountdown && (
                <RcTooltip
                  overlay={
                    myOffer
                      ? t("Cancel your previous offer to place bid")
                      : t("Place Bid")
                  }
                >
                  <button
                    type="button"
                    disabled={
                      myOffer ||
                      (activeModal === ACTIVE_MODAL_MAKE_OFFER && isLoading)
                    }
                    className={"primary-btn "}
                    onClick={async () => {
                      if (!active) {
                        dispatch(setShowSidebar(true));
                      } else if (blockchain.chain_id !== chainId) {
                        let msg = (
                          <>
                            {t(
                              "Please, switch your network from your wallet to"
                            )}{" "}
                            <strong
                              style={{
                                color: "inherit",
                                textTransform: "capitalize",
                              }}
                            >
                              {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
                            </strong>
                          </>
                        );

                        addToast(msg, { appearance: "error" });

                        return;
                      } else {
                        setOpenBidModal(true);
                        setActiveModal(ACTIVE_MODAL_PLACE_BID);
                        setAutheticateAction(false);
                        try {
                          await checkOnPageAuthentication(
                            userData.wallet_address,
                            setAutheticateAction
                          );
                        } catch (err: any) {
                          addToast(err.message, { appearance: "error" });
                          setOpenBidModal(false);
                        }
                      }
                    }}
                  >
                    {activeModal === ACTIVE_MODAL_MAKE_OFFER && isLoading ? (
                      <LoadingCircles />
                    ) : (
                      <>
                        <IoWalletOutline className="mr-3" />
                        {t("Place Bid")}
                      </>
                    )}
                  </button>
                </RcTooltip>
              )}

            {/* make offer */}
            {/* not my item -> if sellOffer && type is auction && showCountdown is false */}
            {!myItem &&
              (sellOffer &&
              sellOffer.type === SELL_OFFER_TYPE_ACUTION ? null : (
                <RcTooltip
                  overlay={
                    myOffer
                      ? t("Cancel your previous offer to make new offer")
                      : t("Make offer")
                  }
                >
                  <button
                    type="button"
                    className={classes.saleBtn}
                    disabled={
                      myOffer ||
                      (activeModal === ACTIVE_MODAL_MAKE_OFFER && isLoading)
                    }
                    onClick={async () => {
                      if (!active) {
                        dispatch(setShowSidebar(true));
                      } else if (blockchain.chain_id !== chainId) {
                        let msg = (
                          <>
                            {t(
                              "Please, switch your network from your wallet to"
                            )}{" "}
                            <strong
                              style={{
                                color: "inherit",
                                textTransform: "capitalize",
                              }}
                            >
                              {CHAIN_SLUG_MAPPING[blockchain.chain_id]}
                            </strong>
                          </>
                        );

                        addToast(msg, { appearance: "error" });

                        return;
                      } else {
                        // open modal
                        setShowCreateOfferFixedModal(true);
                        setActiveModal(ACTIVE_MODAL_MAKE_OFFER);
                        setAutheticateAction(false);
                        setLoading(true);
                        try {
                          await checkOnPageAuthentication(
                            userData.wallet_address,
                            setAutheticateAction
                          );
                        } catch (err: any) {
                          addToast(err.message, { appearance: "error" });
                          setShowCreateOfferFixedModal(false);
                          setLoading(false);
                        }
                      }
                    }}
                  >
                    {activeModal === ACTIVE_MODAL_MAKE_OFFER && isLoading ? (
                      <LoadingCircles />
                    ) : (
                      <>
                        <FiTag className="mr-3" />
                        {t("Make offer")}
                      </>
                    )}
                  </button>
                </RcTooltip>
              ))}
          </div>
        </div>
      </div>

      {/* Modal for create offer */}
      <Modal
        show={showCreateOfferFixedModal}
        showClose={true}
        outsideClose={false}
        onClose={() => {
          setShowCreateOfferFixedModal(false);
          setSelectedToken(tokenList[0]);
          setOfferPriceFixed(null);
          setLoading(false);
        }}
      >
        {authenticateAction ? (
          <MakeOfferModal
            tokenList={tokenList}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            offerPriceFixed={offerPriceFixed}
            setOfferPriceFixed={setOfferPriceFixed}
            offerEndDateFixed={offerEndDateFixed}
            setOfferEndDateFixed={setOfferEndDateFixed}
            isSubmitting={isSubmitting}
            onClick={handleCreateBuyOfferFixed}
          />
        ) : (
          <AuthenticationModal />
        )}
      </Modal>

      {/* Modal for Buying */}
      <Modal
        show={showBuyNowModal}
        outsideClose={false}
        showClose={
          // buyNowModalNumber === 1 ||
          // buyNowModalNumber === 2 ||
          showBuyNowModalCloseButton
        }
        onClose={() => {
          setShowBuyNowModal(false);
          setLoading(false);
        }}
      >
        {authenticateAction ? (
          (buyNowModalNumber === 1 && (
            <AddFundsOnPurchase token={sellOffer?.payment_token} />
          )) ||
          (buyNowModalNumber === 2 && (
            <CheckoutModal
              item={item}
              library={library}
              account={account}
              setBuyNowModalNumber={setBuyNowModalNumber}
              setShowBuyNowModal={setShowBuyNowModal}
              setBuyNowFinshData={setBuyNowFinshData}
              setLoading={setLoading}
              setUserEthBalance={setUserEthBalance}
              setShowBuyNowModalCloseButton={setShowBuyNowModalCloseButton}
            />
          )) ||
          (buyNowModalNumber === 3 && (
            <SuccessModal
              buyNowFinshData={buyNowFinshData}
              item={item}
              setShowBuyNowModalCloseButton={setShowBuyNowModalCloseButton}
            />
          ))
        ) : (
          <AuthenticationModal />
        )}
      </Modal>

      {/* Modal to place a bid */}
      <Modal
        show={openBidModal}
        showClose={true}
        outsideClose={false}
        onClose={() => setOpenBidModal(false)}
      >
        {!authenticateAction ? (
          <AuthenticationModal />
        ) : (
          <PlaceBidModal
            sellOffer={sellOffer}
            bidPrice={bidPrice}
            setBidPrice={setBidPrice}
            minPrice={sellOffer?.total_amount}
            isSubmitting={isSubmitting}
            onClick={handlePlaceBid}
          />
        )}
      </Modal>
    </>
  );
};
