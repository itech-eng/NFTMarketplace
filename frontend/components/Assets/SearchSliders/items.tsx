import classes from "./SearchSliders.module.css";
import { ImageItem } from "components/Images";
import { DEFAULT_IMAGE } from "src/helpers/coreconstants";

interface ItemsType {
  items: any[];
}

export const Items = ({ items }: ItemsType) => {
  const mainLength = items.length;

  // not more than 4 items
  let newArr = Array.from(items);
  newArr.length = 4;

  const newLength = newArr.length;

  const shortage = newLength - mainLength;

  let shortageArr = Array.from({ length: shortage }, (v, k) => k);
  // console.log("short: ", shortageArr);

  return (
    <div className={classes.items}>
      {shortage < 0 ? (
        newArr.map((item: any) => (
          <div
            key={item.id + item.name}
            className={classes.item + " " + classes.itemFilled}
          >
            <ImageItem
              src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
              alt={item.name}
              layout="responsive"
              className={classes.itemImage}
            />
          </div>
        ))
      ) : shortage == 0 ? (
        newArr.map((item: any) => (
          <div key={item.id + item.name} className={classes.item}>
            <ImageItem
              src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
              alt={item.name}
              layout="responsive"
              className={classes.itemImage}
            />
          </div>
        ))
      ) : (
        <>
          {newArr.map((item: any) => (
            <div key={item.id + item.name} className={classes.item}>
              <ImageItem
                src={item.thumbnail_path || DEFAULT_IMAGE.ITEM}
                alt={item.name}
                layout="responsive"
                className={classes.itemImage}
              />
            </div>
          ))}

          {shortageArr.map((item: any, idx) => (
            <div
              key={item + idx}
              className={classes.item + " " + classes.itemEmpty}
            />
          ))}
        </>
      )}
    </div>
  );
};
