export let INITIAL = [];

export const enterTheFolder = (state = INITIAL, action) => {
  if (action.type === "enterFolder") {
    let newState = [];
    for (let i = 0; i <= action.index; i++) {
      newState.push(state[i]);
    }
    newState.push(action.payload);
    return newState;
  } else if (action.type === "initializeDirectory") {
    state = [...state, action.payload];
    return state;
  } else if (action.type === "newRoute") {
    let newState = [...state];
    newState[action.index].forEach(e => {
      e.select = false;
    });
    newState[action.index][action.nestedIndex].select = true;
    return newState;
  }
  return state;
};

export const currentFolder = (state = "/", action) => {
  if (action.type === "newRoute") {
    let itr = 0,
      slashCount = -1;
    let newState = "";
    while (itr < state.length && slashCount < action.index) {
      if (state[itr] === "/") {
        slashCount += 1;
      }
      newState += state[itr];
      itr++;
    }
    newState += action.payload;
    newState += "/";
    return newState;
  } else {
    return state;
  }
};

export const currentDepth = (state = 0, action) => {
  if (action.type === "newRoute") {
    return action.index;
  }
  return state;
};
