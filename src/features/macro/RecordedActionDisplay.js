import React, { useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { record, save, selectHistory } from "./macroSlice";
import styles from "./Macro.module.css";

const mapSeries = async (iterable, action) => {
  for (const x of iterable) {
    await action(x);
  }
};

const RecordedActionDisplay = () => {
  const history = useSelector(selectHistory);
  console.log(history);

  const windowUrl = window.location.href;

  const getName = (action) => {
    let name = "";
    if (!action.type.includes("fetchCount/pending")) {
      name = name.concat(action.type + "  " + action.payload + " ");
    }
    return name;
  };

  return (
    <div>
      <table className={styles.table}>
        <tr>
          <th className={styles.th}>Action</th>
        </tr>
        {history
          .filter((hist) => hist.url === windowUrl)
          .map((hist, index) => {
            const name = getName(hist.action);
            return (
              <tr>
                <td className={styles.th}>{name}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default RecordedActionDisplay;
