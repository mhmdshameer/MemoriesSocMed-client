import * as api from "../api";

export const getPost = () => async(dispatch) => {
     try {
        const data = await api.fetchPosts();

        dispatch({ type: "FETCH_ALL", payload: data})
     } catch (error) {
        console.log(error.message)
     } 
}

export const createPost =(post) => async (dispatch) => {
      try {
         const {data} = await api.createPost(post);
         console.log("api response:",data);
         dispatch({type:'CREATE', payload:data})
      } catch (error) {
         console.log("here",error.message)
      }
}