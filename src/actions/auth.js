

export const signin = (formData, navigate) => async (dispatch) =>{
    try {
        // sign in the user
        
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) =>{
    try {
        // sign up the user
        
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}