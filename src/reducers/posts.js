import { CREATE, UPDATE, FETCH_ALL, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";
const reducer = (state = [], action) => {
  switch (action.type) {
    case DELETE:
      return state.filter((post) => post._id !== action.payload);

    case UPDATE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return action.payload;
    case CREATE:
      return {...state, posts:action.payload};
    default:
      return state;
  }
};

export default reducer;
