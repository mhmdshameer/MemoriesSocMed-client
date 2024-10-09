import { CREATE, UPDATE, FETCH_ALL, DELETE } from "../constants/actionTypes";
import * as api from "../api";

export const getPost = () => async (dispatch) => {
  try {
    
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getSearchPosts = (searchQuery) => async (dispatch) =>{
  try {
    console.log(searchQuery)
    const {data: {data}} = await api.fetchSearchPosts(searchQuery);
     console.log(data)
  } catch (error) {
   console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    console.log("Attempting to make API call with post:", post);
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error)
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type:UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const {data} = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
