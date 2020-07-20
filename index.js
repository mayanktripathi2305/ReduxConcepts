// Steps
// 1 - import redux, logger , 2 - create a store, logger , 3 - use store, logger

const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const logger = reduxLogger.createLogger();
const combineReducer = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

// Cake Shop Example where Number_of_Cakes is a state , the shopkeeper (reducer) is the reducer function ,
// and BUY_CAKE is the action.

const BUY_CAKE = "BUY_CAKE"; //action constant
const BUY_ICECREAM = "BUY_ICECREAM";
const BUY_PASTRIES = "BUY_PASTRIES";

//Action Creator

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

function buyPastries() {
  return {
    type: BUY_PASTRIES,
  };
}

//combines state object

// const initialState = {
//   Number_of_Cakes: 10,
//   Number_of_IceCreams: 10,
// };

// Cake State Object

const initialCakeState = {
  Number_of_Cakes: 10,
};

// IceCream State Object

const initialIceCreamState = {
  Number_of_IceCreams: 10,
};

const initialPasteriesState = {
  Number_of_Pastries: 10,
};
//reducer function for both the states combined

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         Number_of_Cakes: state.Number_of_Cakes - 1,
//       };

//     case BUY_ICECREAM:
//       return {
//         ...state,
//         Number_of_IceCreams: state.Number_of_IceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };

// reducer function for the cake action

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        Number_of_Cakes: state.Number_of_Cakes - 1,
      };

    default:
      return state;
  }
};

// reducer function for the cake action

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        Number_of_IceCreams: state.Number_of_IceCreams - 1,
      };
    default:
      return state;
  }
};

const pastryReducer = (state = initialPasteriesState, action) => {
  switch (action.type) {
    case BUY_PASTRIES:
      return {
        ...state,
        Number_of_Pastries: state.Number_of_Pastries - 1,
      };
    default:
      return state;
  }
};

//Create Store and peform the 5 activities

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  pastries: pastryReducer,
});
const store = createStore(rootReducer, applyMiddleWare(logger));
//console.log("Intitial inventory", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyPastries());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyPastries());

unsubscribe();
