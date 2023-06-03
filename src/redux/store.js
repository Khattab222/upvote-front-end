import { AuthReducer } from "./AuthReducer";
import { postsReducer } from "./PostsReducer";
import { userReducer } from "./UserReducer";
import { categoryReducer } from "./categorySReducer";
import { passwordReducer } from "./passwordReducer";

const { configureStore } = require("@reduxjs/toolkit");





const store = configureStore({
    reducer:{
        auth:AuthReducer,
        user:userReducer,
        posts:postsReducer,
        category:categoryReducer,
        password:passwordReducer
    
    }
})


export default store