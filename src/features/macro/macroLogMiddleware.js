import { addHistory } from "./macroSlice";

const macroLogMiddleware = storeAPI => next => action => {
  const isNotMacroAction = action.type && !action.type.startsWith("macro");

  if (isNotMacroAction) {
    const windowUrl = window.location.href;

    storeAPI.dispatch(addHistory({
      url: windowUrl,
      action
    }));
  }

  next(action);
}

export default macroLogMiddleware;
