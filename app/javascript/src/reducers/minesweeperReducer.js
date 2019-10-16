import { RESET_BOARD, OPEN_CELL, SWITCH_CELL_FLAG, LOAD_GAME } from "../actions/boardActions";
import defaultStore from "../store/defaultStore";
import {swapFlag, resetGame, loadGame, openCell} from "../actions/actions";

const minesweeperReducer = (state = defaultStore, action = { type: "" }) => {
  switch (action.type) {

    case SWITCH_CELL_FLAG: {
      const board = swapFlag(state.board, action.position);
      return { ...state, board };
    }
    
    case RESET_BOARD: {
      const board = resetGame();
      return {
        ...state, board
      };
    }

    case LOAD_GAME: {
      const board = loadGame();
      return {
        ...state, board
      };
    }

    case OPEN_CELL: {
      const board = openCell(state.board, action.position);
      return { ...state, board };
    }

    default:
      return state;
  }
};

export default minesweeperReducer;
