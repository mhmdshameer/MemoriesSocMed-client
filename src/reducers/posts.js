import {
  CREATE,
  UPDATE,
  FETCH_ALL,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  LIKE,
  FETCH_POST
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 0,
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
      
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_POST:
      return { ...state, post: action.payload };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case CREATE:
      return {
        ...state,
        posts: [action.payload, ...state.posts ],
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};

export default reducer;
