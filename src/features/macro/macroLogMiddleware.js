import { addHistory, selectIsActive } from "./macroSlice";

const macroLogMiddleware = storeAPI => next => action => {
  const isActive = selectIsActive(storeAPI.getState());

  if (action.type && !action.type.startsWith("macro") && isActive) {
    const windowUrl = window.location.href;

    storeAPI.dispatch(addHistory({
      url: windowUrl,
      action
    }));
  }

  next(action);
}

export default macroLogMiddleware;
