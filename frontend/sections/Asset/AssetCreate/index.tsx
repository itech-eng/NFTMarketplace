import { CreateItemForm } from "./Form";
//import CreateItemForm from "./OldForm";
import useTranslation from "next-translate/useTranslation";
export default function CreateItemSection({ collection }: any) {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <>
      <div className="create-item-area section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title text-center mb-45">
                <h2 className="title mb-15">{t("Create Item")}</h2>
                <p className="sub-title mb-0"></p>
              </div>
            </div>
          </div>

          {/* <CreateItemForm
            collectionId={collection && collection.collection.id}
          /> */}

          <CreateItemForm />
        </div>
      </div>
    </>
  );
}
// lang ok
