import React from "react";
import { Provider } from "react-redux";
import Minesweeper from "./Minesweeper";
import { LOAD_GAME } from "../actions/boardActions";
import { HashRouter as Router } from "react-router-dom";
import createStore from "../store/store";

const initAction = {
  type: LOAD_GAME
};

const store = createStore;
store.dispatch(initAction);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Minesweeper />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;