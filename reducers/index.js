import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import books from "./books";
import settings from "./settings";

const appReducers = combineReducers({
  books,
  settings
});

const store = createStore(appReducers, applyMiddleware(thunk));
export default store;
