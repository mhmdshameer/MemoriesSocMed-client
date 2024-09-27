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
   console.log("Attempting to make API call with post:", post); 
      try {
         const {data} = await api.createPost(post);
         console.log("api response:",data);
         dispatch({type:'CREATE', payload:data})
      } catch (error) {
         console.log("Error during api calls",error)
      }
}

export const updatePost = (id, post)=> async (dispatch) => {
   try {
      const {data} = await api.updatePost(id, post);

      dispatch({type:"UPDATE", payload: data });
   } catch (error) {
      console.log(error.message);
   }
}