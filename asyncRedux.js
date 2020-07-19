const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

const initialState = {
  loading: "false",
  users: [],
  error: "",
};

const FETCH_USERS = "FETCH_USERS";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: "true",
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: "false",
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: "false",
        users: [],
        error: action.payload,
      };
  }
};

const asynchFetch = () => {
  return function (dispatch) {
    dispatch(fetchUsers());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.name);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleWare(reduxThunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(asynchFetch());
