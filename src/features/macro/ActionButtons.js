import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { selectMacros } from "./macroSlice";
import styles from "./Macro.module.css";

const mapSeries = async (iterable, action) => {
  for (const x of iterable) {
    await action(x);
  }
};

const ActionButtons = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);

  const onRadioClick = () => {
    setStart(!start);
    // if (!start) dispatch(record());
    // if (start) dispatch(save());
  };

  return (
    <div className={styles.action}>
      <input type="checkbox" checked={start} onClick={onRadioClick} />
      <label className={styles.label}>Start recording</label>
    </div>
  );
};

export default ActionButtons;
