import axios from "axios";

const BasUrl = axios.create({baseURL:'https://upvote-back-end.vercel.app/BlogApp/api'});

export default BasUrl