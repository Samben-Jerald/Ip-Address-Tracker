import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import reducers from "../Reducers";

const persitConfig = {
  key: "root",
  storage,
};

const rootReducers = persistReducer(persitConfig, reducers);

const store = createStore(rootReducers, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
