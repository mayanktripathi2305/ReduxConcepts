const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

// Cake Shop Example where Number_of_Cakes is a state , the shopkeeper (reducer) is the reducer function ,
// and BUY_CAKE is the action.

const BUY_CAKE = "BUY_CAKE"; //action constant
const BUY_ICECREAM = "BUY_ICECREAM";

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

//Create Store and peform the 5 activities

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);
//console.log("Intitial inventory", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated inventory ", store.getState())
);
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());

unsubscribe();
