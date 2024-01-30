import { GrAlert } from "react-icons/gr";
import { useState } from "react";
import { Input, InputError, InputField } from "../../../components/InputField";
import classes from "./TransferSection.module.css";
import { ethers } from "ethers";
import useTranslation from "next-translate/useTranslation";
import { useToasts } from "react-toast-notifications";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import { useWeb3React } from "@web3-react/core";
import { nftAbi } from "../../../src/wallet/nftAbi";
import {
  checkOwner,
  processWalletErrorMessage,
} from "../../../src/helpers/functions";
import { useRouter } from "next/router";
import {
  useCancelTransferMutation,
  useCreateTransferMutation,
  useFinishTransferMutation,
} from "src/graphql/generated";
import { ImageItem, ImageProfile } from "components/Images";
import { CHAIN_SLUG_MAPPING } from "src/helpers/corearray";
import { checkOnPageAuthentication } from "src/ssr/data";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const TransferSection = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const router = useRouter();
  const { addToast } = useToasts();

  const { library, chainId } = useWeb3React();
  const signer = library?.getSigner();
  const blockchain = data.collection.blockchain;

  const [address, setAddress] = useState("");
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const isValidAddress = ethers.utils.isAddress(address);
  const self = data.owner.wallet_address === address;

  const handleAddressChange = (e: any) => {
    const value = e.target.value;
    const checkValidAddress = ethers.utils.isAddress(value);
    setAddress(value.trim());

    if (!value) {
      setError(false);
    } else if (checkValidAddress) {
      if (data.owner.wallet_address === ethers.utils.getAddress(value)) {
        setError(t("cannot be transferred to self"));
      } else {
        setError(false);
      }
    } else {
      setError(t("invalid address"));
    }
  };

  const createTransferMutation = useCreateTransferMutation();
  const finishTransferMutation = useFinishTransferMutation();
  const cancelTransferMutation = useCancelTransferMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

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

    // check owner
    if (
      !(await checkOwner(
        contract,
        data.token_id,
        data.owner.wallet_address,
        data.id
      ))
    ) {
      addToast(t("You are not the owner of this item."), {
        appearance: "error",
      });
      setTimeout(() => router.push(`/assets/${data.slug}`), 1500);
      return;
    }

    // 1st mutation before transaction
    let createData: any;
    try {
      createData = await createTransferMutation.mutateAsync({
        item_id: data.id,
        to_address: address,
      });
    } catch (e: any) {
      addToast(e.message, { appearance: "error" });
      return;
    }

    const transferId = createData?.createTransfer?.id;

    try {
      setIsLoading(true);

      const tx = await contractWithSigner.safeTransferFrom(
        data.owner.wallet_address,
        address,
        data.token_id
      );

      await tx.wait();

      // 2nd mutation after transaction
      await finishTransferMutation.mutateAsync({
        transaction_hash: tx.hash,
        transfer_id: transferId,
      });

      // redirect to the item
      router.push(`/assets/${data.slug}`);

      // others
      setIsLoading(false);
      addToast(t("Transferred successfully"), { appearance: "success" });
    } catch (err: any) {
      try {
        // cancel mutation
        if (transferId) {
          await cancelTransferMutation.mutateAsync({
            transfer_id: transferId,
          });
        }
      } catch (e) {}

      if (err.message) {
        const errMsg = processWalletErrorMessage(err.message, err);
        addToast(errMsg, { appearance: "error" });
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="text-center">
            <LoadingCircles />

            <p className="text-center p-5">
              {t("Waiting for blockchain confirmation...")}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={classes.imgWrapper}>
            <ImageProfile src={data.thumbnail_path} alt={data.name} />
          </div>

          <form className={classes.form} onSubmit={handleSubmit}>
            <InputField label="address" title={t("Wallet address")}>
              <Input
                label="address"
                placeholder="e.g. 0x1ed3 or destination.eth"
                value={address}
                onChange={(e: any) => handleAddressChange(e)}
              />
            </InputField>

            <div className={classes.errorSection}>
              {error && <InputError error={error} />}
            </div>

            {/* transferred to  */}
            <p className={classes.addressText}>
              {`'${data.name}'`} {t(" will be transferred to")}{" "}
              {!isValidAddress ? "..." : ethers.utils.getAddress(address)}
            </p>

            {/* recovery alert */}
            {isValidAddress && (
              <p>
                <GrAlert />{" "}
                <span className={classes.alertMessage}>
                  {t("Items sent to the wrong address cannot be recovered")}
                </span>
              </p>
            )}

            <div className="text-center mt-5">
              <button
                className={`primary-btn`}
                disabled={!isValidAddress || self || error}
              >
                {t("Transfer")}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default TransferSection;
//lang ok
