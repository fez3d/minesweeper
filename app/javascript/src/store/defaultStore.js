const defaultCell = {
  hasMine: false,
  hasFlag: false,
  isOpen: false,
  count: 0,
  position: null
};

const defaultStore = {
  board: { }
};

const LEVEL = {
  size: 16,
  mines: 50
};

export { defaultStore as default, defaultCell, LEVEL };
