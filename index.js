const redux = require("redux");
const createStore = redux.createStore;

// Cake Shop Example where Number_of_Cakes is a state , the shopkeeper (reducer) is the reducer function ,
// and BUY_CAKE is the action.

const BUY_CAKE = "BUY_CAKE"; //action constant

//Action Creator

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

//state object

const initialState = {
  Number_of_Cakes: 10,
};

//creating reducer function

const reducer = (state = initialState, action) => {
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

//Create Store and peform the 5 activities

const store = createStore(reducer);
console.log("Intitial number of cakes", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update number of Cakes", store.getState())
);
store.dispatch(buyCake());

unsubscribe();
