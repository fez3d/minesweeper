import { createStore, applyMiddleware } from "redux"
import minesweeperReducer from "../reducers/minesweeperReducer";
import thunk from 'redux-thunk';

export default createStore (
  minesweeperReducer,
  applyMiddleware(thunk)
)