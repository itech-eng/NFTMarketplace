import classes from "./Duration.module.css";
import DatePicker from "react-datepicker";
import { InputError } from "../../../InputField";
import { FiCalendar } from "react-icons/fi";
import { Fragment, useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import useTranslation from "next-translate/useTranslation";

export const Duration = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    durationHumanize,
    dateError,
  } = data;

  return (
    <Popover as={Fragment}>
      <Popover.Button
        ref={setReferenceElement}
        className={classes.durationButton}
      >
        <FiCalendar aria-label="calendar" />{" "}
        {dateError ? (
          <span className="text-danger">{durationHumanize}</span>
        ) : (
          <span>{durationHumanize}</span>
        )}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={classes.panel}
      >
        <div className={classes.wrapper}>
          {/* <div className="mb-3">{durationHumanize} </div> */}

          <div className={classes.calendars}>
            <div>
              <h3 className={classes.calendarTitle}>{t("Start Date")}</h3>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>

            <div>
              <h3 className={classes.calendarTitle}>{t("End Date")}</h3>

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>

          {dateError && <InputError error={dateError} />}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

{
  /* <input type="date" name="" id="" /> */
}
//lang ok
