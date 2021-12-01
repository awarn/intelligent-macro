import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { selectMacros, stopRecording, startRecording } from "./macroSlice";
import styles from "./Macro.module.css";

const mapSeries = async (iterable, action) => {
	for (const x of iterable) {
		await action(x);
	}
};

const MacroDisplay = () => {
	const macros = useSelector(selectMacros);
	const dispatch = useDispatch();

	const replay = (macro) => {
		batch(async () => {
			dispatch(stopRecording());
			await mapSeries(
				macro.actions.map((a) => a.action),
				dispatch
			);
			dispatch(startRecording());
		});
	};

	const windowUrl = window.location.href;

	const getName = (actions) => {
		let name = "";
		actions.forEach((a) => {
			if (!a.action.type.includes("fetchCount/pending")) {
				name = name.concat(
					a.action.type + "  " + a.action.payload + " "
				);
			}
		});
		return name;
	};

	return (
		<div>
			<table className={styles.table}>
				<tr>
					<th className={styles.th}>Action</th>
					<th className={styles.th}></th>
				</tr>
				{macros
					.filter((macro) => macro.startUrl === windowUrl)
					.reverse()
					.slice(0, 10)
					.map((macro, index) => {
						const name = getName(macro.actions);
						return (
							<tr>
								<td className={styles.th}>{name}</td>
								<td className={styles.th}>
									<button onClick={() => replay(macro)} type="button">
										Replay
									</button>{" "}
								</td>
							</tr>
						);
					})}
			</table>
		</div>
	);
};

export default MacroDisplay;
