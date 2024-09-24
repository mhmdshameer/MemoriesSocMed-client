import axios from "axios"
import {provider} from "react-redux"
import {configStore} from "redux"

const url = 'http://localhost:5000/posts';  

export const fetchPosts = () => axios.get(url);