import { SyntheticEvent, useEffect, useState } from "react";
import { ImageUploader } from "../../../../components/ImageUploader";
import {
  Input,
  InputError,
  InputField,
  Textarea,
} from "../../../../components/InputField";
import { InfoIcon, RcTooltip } from "../../../../components/Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";
import {
  MAX_ITEM_FILE_SIZE_IN_MB,
  MAX_ITEM_IMAGE_SIZE_IN_MB,
} from "../../../../src/helpers/coreconstants";
import { containsSpecialChars } from "../../../../src/helpers/functions";
import { FcLock } from "react-icons/fc";
import { InputItem } from "./InputItem";
import {
  useCreateItemMutation,
  useUpdateItemMutation,
} from "../../../../src/graphql/generated";
import { useRouter } from "next/router";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import useWallet from "../../../../hooks/useWallet";
import {
  checkOnPageAuthentication,
  checkUniqueItemName,
} from "../../../../src/ssr/data";
import { LoadingCircles } from "../../../../components/Loader/LoadingCircles";
import { AnythingUploader } from "components/ImageUploader/AnythingUploader";
import {
  ACCEPTED_ASSET_EXTENSIONS_ALL,
  ACCEPTED_ASSET_TYPES_ALL,
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPES,
} from "src/helpers/corearray";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useDebounce } from "use-debounce";

const prepareCollectionsData = (collectionList: any) => {
  return (
    collectionList &&
    collectionList.map((el: any) => {
      return {
        value: el.id,
        label: (
          <>
            <img src={el.logo} alt="" width={15} className="mr-3" /> {el.name}
          </>
        ),
      };
    })
  );
};

const getSelectedCollectionData: any = (
  collectionList: any,
  collection_id: string
) => {
  let selectedCollection = null;

  collectionList &&
    collection_id &&
    collectionList.filter((option: any) => {
      if (option.id == collection_id) {
        selectedCollection = {
          value: option.id,
          label: (
            <>
              <img src={option.logo} alt="" width={15} className="mr-3" />{" "}
              {option.name}
            </>
          ),
        };
      }
    });

  return selectedCollection;
};

export const CreateItemForm = ({
  collectionId,
  itemData,
  collectionListQuery,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const router = useRouter();
  const { addToast } = useToasts();

  let optionsArr: any;
  if (itemData) {
    optionsArr = [
      {
        value: itemData.collection.id,
        label: (
          <>
            <img
              src={itemData.collection.logo}
              alt=""
              width={15}
              className="mr-3"
            />{" "}
            {itemData.collection.name}
          </>
        ),
      },
    ];
  }

  // asset media
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [previewAsset, setPreviewAsset] = useState<any>();
  const [assetError, setAssetError] = useState<boolean | string>(false);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    if (!selectedAsset) {
      setPreviewAsset(undefined);
      setMediaType(null);
      return;
    }
    const blob = URL.createObjectURL(selectedAsset);
    setPreviewAsset(blob);

    return () => URL.revokeObjectURL(blob);
  }, [selectedAsset]);

  const onAssetChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedAsset(null);

      !selectedAsset && setAssetError(t("Item Media is Required!"));
      return;
    } else {
      const file = e.target.files[0];
      const { name, type, size } = file;
      let ext = name.split(".");
      ext = ext[ext.length - 1];

      // console.table({ name, type, size });

      if (
        !ACCEPTED_ASSET_EXTENSIONS_ALL.includes(ext) ||
        !ACCEPTED_ASSET_TYPES_ALL.includes(type)
      ) {
        setSelectedAsset(null);
        setMediaType(null);
        setAssetError(t("Unsupported file!"));
      } else if (size > MAX_ITEM_FILE_SIZE_IN_MB * 1000000) {
        setSelectedAsset(null);
        setMediaType(null);
        setAssetError(t("File size is too big!"));
      } else {
        setSelectedAsset(file);
        setPreviewAsset(URL.createObjectURL(file));
        setMediaType(ext);

        setSelectedThumbnail(null);
        setAssetError(false);
      }
    }
  };

  const handleChangeAsset = () => {
    setSelectedAsset(null);
    setPreviewAsset(null);
    setMediaType(null);
    setSelectedThumbnail(null);
  };

  // asset thumbnail
  const [uploadedImgError, setUploadedImgError] = useState(false);

  const [selectedThumbnail, setSelectedThumbnail] = useState<any>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<any>();
  const [thumbnailError, setThumbnailError] = useState<boolean | string>(false);

  useEffect(() => {
    if (!selectedThumbnail) {
      setPreviewThumbnail(undefined);
      return;
    }
    setPreviewThumbnail(URL.createObjectURL(selectedThumbnail));

    return () => URL.revokeObjectURL(URL.createObjectURL(selectedThumbnail));
  }, [selectedThumbnail]);

  const onThumbnailChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedThumbnail(undefined);
      return;
    }
    setSelectedThumbnail(e.target.files[0]);
    setPreviewThumbnail(URL.createObjectURL(e.target.files[0]));
    setThumbnailError(false);
  };

  // name
  const [itemName, setItemName] = useState("");
  const [debouncedText] = useDebounce(itemName, 500);
  const [itemNameError, setItemNameError] = useState<boolean | string>(false);

  const handleItemName = async (input: any) => {
    const value = input.trim();

    try {
      if (value.length == 0) {
        setItemNameError(t("Name is required!"));
        setItemName(value);
      } else if (containsSpecialChars(value)) {
        setItemNameError(t("Name must provide without special characters."));
        setItemName(value);
      } else {
        const checked = await checkUniqueItemName(value);

        if (!checked.success) {
          setItemNameError(t(checked.message));
          setItemName(value);
        } else {
          setItemNameError(false);
          setItemName(value);
        }
      }
    } catch (err: any) {
      setItemNameError(err.message);
    }
  };
  useEffect(() => {
    if (debouncedText) handleItemName(debouncedText);
  }, [debouncedText]);
  // external link
  const [externalLink, setExternalLink] = useState(
    itemData ? itemData.external_url : ""
  );

  // description of react quill
  const [description, setDescription] = useState(
    itemData ? itemData.description : ""
  );
  const [descriptionError, setDescritionError] = useState<boolean | string>(
    false
  );

  const handleDescriptionChange = (e: any) => {
    const value = e.target.value;

    if (value.trim().length > 1000) {
      setDescription(e.target.value);
      setDescritionError(
        t("Description length should be less than 1000 characters!")
      );
    } else {
      setDescription(e.target.value);
      setDescritionError(false);
    }
  };

  // collections   | fetch the collection list from api | no options is visible if the array is empty

  const collectionList = collectionListQuery;
  // console.log("collectionListy", collectionList);

  const collectionSelectOptions = prepareCollectionsData(collectionList);

  const [collectionError, setCollectionError] = useState<boolean | string>(
    false
  );
  const [collectionOption, setCollectionOption] = useState<any>(null);
  const [collectionValue, setCollectionValue] = useState<any>(
    collectionId
      ? getSelectedCollectionData(collectionList, collectionId)
      : null
  ); // show the value here

  // console.log("collectionValue", collectionValue);

  const handleCollectionChange = (e: any) => {
    if (e.value) {
      setCollectionOption(e.value);
      setCollectionValue(e);
      setCollectionError(false);
    } else {
      // if (!collection) {
      //   setBlockchainError("Blockchain is required!");
      // } else {
      //   setBlockchainError(false);
      // }
    }
  };

  // UnlockableContent
  // console.log(itemData);
  const [showUnlockable, setShowUnlockable] = useState(
    itemData ? itemData.is_unlockable_content : false
  );
  const [unlockableText, setUnlockableText] = useState(
    itemData ? itemData.unlockable_content : ""
  );
  const [unlockableTextError, setUnlockableTextError] = useState<
    boolean | string
  >(false);

  const handleUnlockableView = () => {
    setUnlockableText("");
    setShowUnlockable(!showUnlockable);
  };

  const handleUnlockableText = (e: any) => {
    const value = e.target.value;

    if (value.trim().length > 1000) {
      setUnlockableText(e.target.value);
      setUnlockableTextError(
        t("Description length should be less than 1000 characters!")
      );
    } else if (!showUnlockable) {
      setUnlockableText("");
      setUnlockableTextError(false);
    } else {
      setUnlockableText(e.target.value);
      setUnlockableTextError(false);
    }
  };

  // validation
  const isNotPhoto =
    mediaType &&
    [
      ...ALLOWED_FILE_EXTENSIONS.video,
      ...ALLOWED_FILE_EXTENSIONS.audio,
      ...ALLOWED_FILE_EXTENSIONS._3d,
    ].includes(mediaType);

  const isNotValidCreation: any =
    !selectedAsset ||
    (isNotPhoto && !selectedThumbnail) ||
    uploadedImgError ||
    itemName === "" ||
    itemNameError ||
    descriptionError ||
    !collectionValue;

  // console.log(isNotPhoto && !selectedThumbnail);

  const isNotValidUpdate = descriptionError;

  // form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createItemMutation = useCreateItemMutation();
  const updateItemMutation = useUpdateItemMutation();
  const { disConnectWallet } = useWallet();

  // console.log(collectionId);
  // console.log(itemData);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await checkOnPageAuthentication(userData.wallet_address, () => {});
    setIsSubmitting(true);

    try {
      // update
      if (itemData) {
        const itemUpdateObj = {
          id: itemData.id,
          data: {
            description: description.trim(),
            external_url: externalLink,
            is_unlockable_content: unlockableText ? 1 : 0,
            unlockable_content: unlockableText,
          },
        };

        const res = await updateItemMutation.mutateAsync({
          id: itemUpdateObj.id,
          ...itemUpdateObj.data,
        });
        const data = res.updateItem;

        addToast("Item updated successfully", { appearance: "success" });

        router.push(`/assets/${data.slug}`);

        // console.log(itemUpdateObj);
      }

      // create
      if (!itemData) {
        const itemCreatedObj = {
          media_file: selectedAsset,
          thumbnail_file: selectedThumbnail,
          name: itemName,
          collection_id: collectionValue?.value,
          description: description.trim(),
          external_url: externalLink,
          is_unlockable_content: unlockableText ? 1 : 0,
          unlockable_content: unlockableText,
        };

        const res = await createItemMutation.mutateAsync(itemCreatedObj);
        const data = res.createItem;

        addToast(t("Item created successfully"), { appearance: "success" });

        router.push(`/assets/${data.slug}`);

        // console.log(itemCreatedObj);
        // console.log("slug: ", slug);
      }

      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);

      addToast(err.message, { appearance: "error" });
    }
  };

  return (
    <form className="row justify-content-between" onSubmit={handleFormSubmit}>
      {/* Photo or video or even 3D */}
      <div className="col-md-7 col-lg-6">
        <AnythingUploader
          selectedFile={selectedAsset}
          previewItem={itemData ? itemData.media_path : previewAsset}
          onChange={onAssetChange}
          getError={setAssetError}
          error={assetError}
          mediaType={mediaType}
          editable={!itemData}
          onClick={handleChangeAsset}
        />
      </div>

      {/* Item Thumbnail */}
      <div className="col-md-5 col-lg-4">
        {(mediaType &&
          [
            ...ALLOWED_FILE_EXTENSIONS.video,
            ...ALLOWED_FILE_EXTENSIONS.audio,
            ...ALLOWED_FILE_EXTENSIONS._3d,
          ].includes(mediaType)) ||
        itemData ? (
          <>
            <ImageUploader
              label={"itemPhoto"}
              title={t("Thumbnail Image")}
              subtitle={""}
              selectedFile={selectedThumbnail}
              previewItem={
                itemData ? itemData.thumbnail_path : previewThumbnail
              }
              onChange={onThumbnailChange}
              setUploadedImgError={setUploadedImgError}
              required
              editable={!itemData}
              // getError={setThumbnailError}
            />
          </>
        ) : null}
      </div>

      <div className="col-12">
        {/*  Name*/}
        <InputField label={t("name")} title={t("Name")} required>
          <Input
            type="text"
            label={t("name")}
            placeholder={itemData ? itemData.name : t("Item's Name")}
            value={itemName}
            onChange={(e: any) => {
              setItemName(e.target.value);
            }}
            disabled={itemData}
          />

          {itemNameError && <InputError error={itemNameError} />}
        </InputField>

        {/*  External Link */}
        <InputField
          label="externalLink"
          title={t("External link")}
          subTitle={t(
            "NFT will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
          )}
        >
          <Input
            type="url"
            label="externalLink"
            placeholder={`https://yoursite.io/item/123`}
            value={externalLink}
            onChange={(e: any) => setExternalLink(e.target.value)}
          />
        </InputField>

        {/* Description */}
        <InputField
          label={t("description")}
          title={t("Description")}
          subTitle={t(
            "The description will be included on the item's detail page underneath its image."
          )}
        >
          <Textarea
            id="description"
            placeholder={t("Write the description here...")}
            value={description}
            setValue={handleDescriptionChange}
          />

          {descriptionError && <InputError error={descriptionError} />}
        </InputField>

        {/* Collection */}
        <InputField
          label={t("collection")}
          title={t("Collection")}
          subTitle={
            <>
              {t("This is the collection where your item appear. ")}
              {itemData && (
                <RcTooltip overlay={t("You can't change the collection.")}>
                  {" "}
                  <InfoIcon />{" "}
                </RcTooltip>
              )}
            </>
          }
        >
          {itemData ? (
            <Select
              classNamePrefix="profile"
              isSearchable={false}
              placeholder={t("Select")}
              name="collection"
              id="collection"
              options={optionsArr}
              defaultValue={optionsArr[0]}
              isDisabled
            />
          ) : (
            <Select
              classNamePrefix="profile"
              isSearchable={false}
              placeholder={t("Select")}
              name="collection"
              id="collection"
              options={collectionSelectOptions}
              defaultValue={collectionOption}
              value={collectionValue}
              onChange={handleCollectionChange}
            />
          )}

          {collectionError && <InputError error={collectionError} />}
        </InputField>

        {/* Unlockable Content */}
        <InputItem
          icon={<FcLock />}
          title={t("Unlockable Content")}
          subtitle={t(
            "Include unlockable content that can only be revealed by the owner of the item."
          )}
          hasSwitch
          showSwitch={showUnlockable}
          setShowSwitch={setShowUnlockable}
        >
          {showUnlockable ? (
            <Textarea
              id="unlockable"
              placeholder={t("Write the secret description here...")}
              value={unlockableText}
              setValue={handleUnlockableText}
            />
          ) : null}

          {unlockableTextError && <InputError error={unlockableTextError} />}
        </InputItem>

        {/* gap creating */}
        <div className="my-4" />

        <button
          type="submit"
          className="primary-btn mt-5"
          disabled={
            itemData
              ? isNotValidUpdate || isSubmitting
              : isNotValidCreation || isSubmitting
          }
        >
          {itemData ? "Update" : "Create"} {t("Asset")}
        </button>

        {isSubmitting && <LoadingCircles />}
      </div>
    </form>
  );
};

// will be used later

{
  /* Properties
        <Properties />

        Levels
        <Levels />

        Stats
        <Stats /> */
}

{
  /* Explicit <ExplicitContent /> */
}

/*
  // Blockchain
  const BlockchainSelectOptions = [
    {
      value: "rinkeby",
      label: (
        <span>
          <FaEthereum className="mr-2" /> Rinkeby
        </span>
      ),
    },
    {
      value: "mumbai",
      label: (
        <span>
          <BsCurrencyBitcoin className="mr-2" /> Mumbai
        </span>
      ),
    },
    {
      value: "baobab",
      label: (
        <span>
          <FaEthereum className="mr-2" /> Baobab
        </span>
      ),
    },
  ];
  const [blockchainOption, setBlockchainOption] = useState(
    BlockchainSelectOptions[0]
  );
  const handleBlockchainOption = (e: any) => setBlockchainOption(e.value);


*/

{
  /* Supply
        <InputField label="supply" title="Supply" subTitle={<SupplySubTitle />}>
          <Input label="supply" type="number" placeholder="1" disabled />
        </InputField>

        Blockchain
        <InputField lebel="blockchain" title="Blockchain">
          <BlockchainSelect
            options={BlockchainSelectOptions}
            selectedOption={blockchainOption}
            onChange={handleBlockchainOption}
          />
        </InputField>

        Freeze Metadata
        <InputField
          label="freezeMetadata"
          title={
            <>
              Freeze metadata{" "}
              <RcTooltip
                overlay={`Once locked, your content cannot be edited or removed as it is
                permanently stored in decentralized file storage, which will be
                accessible for other clients to view and use.`}
              >
                <InfoIcon />
              </RcTooltip>
            </>
          }
          subTitle={`Freezing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.`}
        >
          <Input
            label="freezeMetadata"
            placeholder="To freeze your metadata, you must create your item first."
            disabled
          />
        </InputField> */
}
// lang ok
