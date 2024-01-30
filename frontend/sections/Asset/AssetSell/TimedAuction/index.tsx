import classes from "./TimedAuction.module.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { Price } from "../../../../components/Assets/Sell/Price";
import { Fees } from "../../../../components/Assets/Sell/Fees";
import { Duration } from "../../../../components/Assets/Sell/Duration";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store";
import { SELL_OFFER_TYPE_ACUTION } from "../../../../src/helpers/coreconstants";
import {
  SETTINGS_BUY_SELL_FEE_PERCENTAGE,
  SETTINGS_MIN_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN,
  SETTINGS_MAX_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN,
} from "src/helpers/slugcontanst";
import { useWeb3React } from "@web3-react/core";
import {
  checkOwner,
  sellOfferConfirm,
} from "../../../../src/helpers/functions";
import { nftAbi } from "../../../../src/wallet/nftAbi";
import { ethers } from "ethers";
import { useToasts } from "react-toast-notifications";
import { CompleteListingModal } from "../../../../components/Assets/SellModals/CompleteListing";
import { Modal } from "../../../../components/Modal";
import { ListedForSell } from "../../../../components/Assets/SellModals/ListedForSell";
import { useCreateSellOfferMutation } from "../../../../src/graphql/generated";
import { sellType } from "../../../../src/wallet/offerTypes";
import { CHAIN_SLUG_MAPPING } from "src/helpers/corearray";
import useTranslation from "next-translate/useTranslation";
import { checkOnPageAuthentication } from "src/ssr/data";

const AUCTION_RESERVE_PRICE_DEFAULT = 1;

export const TimedAuctionSection = ({
  item,
  type,
  tokenList,
  selectedToken,
  setSelectedToken,
  itemPrice,
  setItemPrice,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // set the native token in the first element
  useEffect(() => {
    setSelectedToken(tokenList[0]);
  }, []); // no need to update

  const TokenMinAuctionPrice = () => (
    <strong>
      {` ${selectedToken.min_amount_to_execute_auction} 
    ${selectedToken.token_symbol}`}
    </strong>
  );

  // toast
  const { addToast } = useToasts();

  const settings: any = useSelector(
    (state: RootState) => state.settings.settings
  );
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  // show modals
  const [showModal, setShowModal] = useState(false);
  const [modalSerial, setModalSerial] = useState(0);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // web3 react & etc
  const blockchain = item?.collection?.blockchain;
  const { library, chainId } = useWeb3React();
  const signer = library?.getSigner();

  const [showOptions, setShowOptions] = useState(false);
  const [reserve, setReserve] = useState(false);
  const [reservePrice, setReservePrice] = useState<any>("");

  // date
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 3);

  const [startDate, setStartDate] = useState<any>(today);
  const [endDate, setEndDate] = useState<any>(nextDay);
  const [dateError, setDateError] = useState<any>(false);

  const minutesDifference = moment(endDate).diff(startDate, "minutes");
  const durationHumanize = moment
    .duration(minutesDifference, "minutes")
    .humanize();

  useEffect(() => {
    if (settings) {
      const minSellDuration =
        settings[SETTINGS_MIN_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN];
      const maxSellDuration =
        settings[SETTINGS_MAX_INTERVAL_FOR_BUY_SELL_OFFER_IN_MIN];

      if (minutesDifference <= 0) {
        setDateError(t("Invalid date selection"));
      } else if (minutesDifference < minSellDuration) {
        setDateError(
          `${t("Duration can't be less than")} ${minSellDuration} ${t(
            "minutes"
          )}`
        );
      } else if (minutesDifference > maxSellDuration) {
        setDateError(
          `${t("Duration can't be more than")} ${parseInt(
            (maxSellDuration / (30 * 24 * 60)).toString()
          )} ${t("months")}`
        );
      } else {
        setDateError(false);
      }
    }
  }, [minutesDifference, settings]);

  // form submit
  const validReservePrice = reserve
    ? reservePrice > itemPrice && reservePrice >= AUCTION_RESERVE_PRICE_DEFAULT
    : true;

  const formIsValid = itemPrice > 0 && validReservePrice;

  const sellOfferMutaion = useCreateSellOfferMutation();

  const dataForSell = {
    domainDataName: blockchain.exchange_contract_name,
    domainDataVersion: blockchain.exchange_contract_version,
    chainId: blockchain.chain_id,
    verifyingContract: blockchain.exchange_contract,
    settingsFeePercent:
      parseFloat(settings[SETTINGS_BUY_SELL_FEE_PERCENTAGE]) || 0,
    itemRoyalties: item.collection.royalties,
    royaltyPayTo: item.collection.payout_address,
    givenPrice: parseFloat(itemPrice),
    startDate: startDate,
    endDate: endDate,
    nftContract: blockchain.nft_contract,
    tokenId: item.token_id,
    paymentTokenContract: selectedToken?.contract_address,
    tokenDecimal: 18,
    walletAddress: userData.wallet_address,
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await checkOnPageAuthentication(userData.wallet_address, () => {});
    // check chain id
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

      addToast(msg, { appearance: "error" });

      return;
    }

    const contract = new ethers.Contract(
      blockchain.nft_contract,
      nftAbi,
      signer
    );
    const contractWithSigner = contract.connect(signer);

    // send data to modal initially
    setSubmittedData({
      itemPrice,
      startDate,
      endDate,
      isApproved: false,
      isConfirm: false,
    });

    // show modal
    setShowModal(true);

    try {
      if (
        !(await checkOwner(
          contract,
          item.token_id,
          item.owner.wallet_address,
          item.id
        ))
      ) {
        throw new Error(t("You are not the item's owner"));
      }

      const isApproved = await contract.isApprovedForAll(
        userData.wallet_address,
        blockchain.exchange_contract
      );

      if (!isApproved) {
        const tx = await contractWithSigner.setApprovalForAll(
          blockchain.exchange_contract,
          true
        );

        await tx.wait();

        const checkApproval = await contract.isApprovedForAll(
          userData.wallet_address,
          blockchain.exchange_contract
        );

        if (checkApproval) {
          await afterApprovalStep();
        } else {
          throw new Error(
            t("Nft approve process is not successful. Try agian later.")
          );
        }
      } else {
        await afterApprovalStep();
      }
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });

      setShowModal(false);
      setModalSerial(0);
    }
  };

  async function afterApprovalStep() {
    setSubmittedData({
      itemPrice,
      startDate,
      endDate,
      isApproved: true,
      isConfirm: false,
    });

    const { signature, nonce } = await sellOfferConfirm(
      dataForSell,
      signer,
      sellType
    );

    setSubmittedData({
      itemPrice,
      startDate,
      endDate,
      isApproved: true,
      isConfirm: true,
    });

    // run mutation
    const mutationData = {
      amount: parseFloat(itemPrice),
      end_date: endDate,
      item_id: item.id,
      nonce: nonce,
      payment_token_id: selectedToken.id,
      signature: signature,
      start_date: startDate,
      type: SELL_OFFER_TYPE_ACUTION,
    };

    // console.table(mutationData);

    await sellOfferMutaion.mutateAsync(mutationData);

    // toast notification
    addToast(t("Item is listed for auction"), { appearance: "success" });

    // change modal view
    setModalSerial(1);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {" "}
        <div className={classes.wrapper}>
          {itemPrice > 0 && selectedToken.min_amount_to_execute_auction > 0 && (
            <div className={classes.minAucAlert}>
              {t("If you do not receive any bids equal to or greater than")}
              <TokenMinAuctionPrice />
              {t(", the auction will end without a sale.")}
              {t(
                " So, you're suggested to set your starting price equal to or greater than"
              )}
              <TokenMinAuctionPrice />.
            </div>
          )}

          <Price
            type={type}
            tokenList={tokenList}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            itemPrice={itemPrice}
            setItemPrice={setItemPrice}
          />

          <p className="mt-4 mb-0"> {t("Duration")}</p>

          <Duration
            data={{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
              minutesDifference,
              durationHumanize,
              dateError,
            }}
          />

          <Fees fee={settings[SETTINGS_BUY_SELL_FEE_PERCENTAGE]} />

          <button
            type="submit"
            className={"primary-btn mt-5"}
            disabled={!formIsValid}
          >
            {t("Complete listing")}
          </button>
        </div>
      </form>

      <Modal
        outsideClose={false}
        showClose={false}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {modalSerial === 0 && (
          <CompleteListingModal
            item={item}
            data={submittedData}
            token={selectedToken}
          />
        )}

        {modalSerial === 1 && (
          <ListedForSell title={t("Item is listed for auction")} item={item} />
        )}
      </Modal>
    </>
  );
};
