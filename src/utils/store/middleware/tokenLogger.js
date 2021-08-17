import { writeToken } from "../pages/users";

const tokenLogger = (parm) => (store) => (next) => (action) => {
  const payload = action.payload;

  if (!payload) return next(action);
  if (!payload.hasOwnProperty("data")) return next(action);

  const { token } = payload.data;
  store.dispatch(writeToken({ token }));

  next(action);
};

export default tokenLogger;
