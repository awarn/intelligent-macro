import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { record, save, selectMacros } from './macroSlice';

const mapSeries = async (iterable, action) => {
  for (const x of iterable) {
    await action(x);
  }
};

const MacroDisplay = () => {
	const macros = useSelector(selectMacros);
  const dispatch = useDispatch();

	const replay = (macro) => {
		batch(() => {
			mapSeries(macro.actions.map((a) => a.action), dispatch)
		});
	};

	const windowUrl = window.location.href;

	return <div>
		<div>
			<button onClick={() => dispatch(record())}>Record</button>
			<button onClick={() => dispatch(save())}>Save</button>
		</div>
		<div>
			{macros.filter((macro) => macro.startUrl === windowUrl).map((macro) => {
				return <button onClick={() => replay(macro)}>{macro.actions.length}</button>
			})}
		</div>
	</div>;
}

export default MacroDisplay;
