import { addHistory, selectIsRecording } from "./macroSlice";

const macroLogMiddleware = storeAPI => next => action => {
  const isNotMacroAction = action.type && !action.type.startsWith("macro");
  const isRecording = selectIsRecording(storeAPI.getState());

  if (isNotMacroAction && isRecording) {
    const windowUrl = window.location.href;

    storeAPI.dispatch(addHistory({
      url: windowUrl,
      action
    }));
  }

  next(action);
}

export default macroLogMiddleware;
