import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BasUrl from "./api/BaseUrl";
import { toast } from "react-toastify";

// get all posts
export const getPosts = createAsyncThunk(
  "posts/getposts",
  async ({ page = 1, category = "" } = {}, thunpAPI) => {
    const { rejectWithValue } = thunpAPI;
    try {
      const { data } = await BasUrl.get(
        `/product?page=${page}&category=${category}`
      );
       
      return data;
    } catch (error) {
     
      return rejectWithValue(error.response.data.Errormsg);
    }
  }
);

// get one post by id
export const getOnePost = createAsyncThunk(
  "posts/getOnePost",
  async (id, thunpAPI) => {
    let config = {
      headers: {
        authorization: `khaled__${localStorage.getItem("UserToken")}`,
      },
    };
    const { rejectWithValue } = thunpAPI;
    try {
      const { data } = await BasUrl.get(`/product/${id}`, config);

      return data.post;
    } catch (error) {
      return rejectWithValue(error.response.data.Errormsg);
    }
  }
);

// create new post
export const creatPost = createAsyncThunk(
  "posts/creatPost",
  async (post, thunpAPI) => {
    const { rejectWithValue } = thunpAPI;
    let config = {
      headers: {
        authorization: `khaled__${localStorage.getItem("UserToken")}`,
        "content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await BasUrl.post("/product/add", post, config);
    
      return data;
    } catch (error) {
      toast.error(error.response.data.Error);

      return rejectWithValue(error.response.data.Error);
    }
  }
);

// like post
export const likePost = createAsyncThunk(
  "posts/likepost",
  async (prodId, thunpAPI) => {
    const { rejectWithValue } = thunpAPI;
    let config = {
      headers: {
        authorization: `khaled__${localStorage.getItem("UserToken")}`,
      },
    };

    try {
      const { data } = await BasUrl.patch(
        `/product/like/${prodId}`,
        {},
        config
      );
 
      return data.post;
    } catch (error) {
    
      toast.error(error.response.data.Error);

      return rejectWithValue(error.response.data.Error);
    }
  }
);

// update post 
export const updatePost = createAsyncThunk(
    'posts/updatepost',
    async ({id,form},thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
      let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`,
            "content-Type":"multipart/form-data"
        }
    }
    try {
     
        const {data}= await BasUrl.post(`/product/${id}`,form,config);
      if (data.message === 'succcess') {
        toast.success('update success')
      }
        return data.post
    } catch (error) {
      
        toast.error(error.response.data.Error);

        return rejectWithValue(error.response.data.Error);

    }
    }
    
)
 // delete post
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (prodId,thunkAPI) => {
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
              
            }
        }
        const {rejectWithValue} = thunkAPI;
        try {
            const res = await BasUrl.delete(`/product/delete/${prodId}`,config)
        
            return res.data.id
        } catch (error) {
         
        toast.error(error.response.data.Error);

        return rejectWithValue(error.response.data.Error);
        }
    }
)
// add comment on post
export const addComment = createAsyncThunk(
    'posts/addcomment',
    async ({id,body},thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
      let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`,
        }
    }
            try {
                const {data} = await BasUrl.post(`/comment/add/${id}`,body,config)
               
                return data.newcomment
            } catch (error) {
               
                toast.error(error.response.data.Error);
        
                return rejectWithValue(error.response.data.Error);
            }


    }
    
)

//delete comment 
export const deleteComment = createAsyncThunk(
    'posts/deletecomment',
    async (id,thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
            }
        }
        try {
            const {data} = await BasUrl.delete(`/comment/delete/${id}`,config);
            if (data.message === 'done') {
                toast.success('comment deleted')
            }
            return data.commentId;
        } catch (error) {
         
            toast.error(error.response.data.Error);
    
            return rejectWithValue(error.response.data.Error);
        }
    }
)
//update comment 
export const updateComment = createAsyncThunk(
    'posts/updatecomment',
    async ({id,body},thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
            }
        }
        try {
            const {data} = await BasUrl.put(`/comment/${id}`,body,config);
            if (data.message === 'done') {
                toast.success('comment updated')
            }
  
            return data.updatedComment;
        } catch (error) {
       
            toast.error(error.response.data.Error);
    
            return rejectWithValue(error.response.data.Error);
        }
    }
)

// get all posts for admin
export const getALLPostsFOrAdmin = createAsyncThunk(
  "posts/getallposts",
  async (__, thunpAPI) => {
    const { rejectWithValue } = thunpAPI;
    try {
      const { data } = await BasUrl.get(
        `/product/allposts`
      );
       
      return data.posts;
    } catch (error) {
  
      return rejectWithValue(error.response.data.Errormsg);
    }
  }
);

// get all comments 
export const getAllComments = createAsyncThunk(
  'posts/allcomments',
  async(__,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    let config = {
      headers:{
          authorization:`khaled__${localStorage.getItem('UserToken')}`,
      }
  }
  try {
    const {data} = await BasUrl.get(`/comment`,config);
    return data.comments
  } catch (error) {
  
    return rejectWithValue(error.response.data.Errormsg);
  }
  }
)


// admin delete comment 
export const admindeleteComment = createAsyncThunk(
  'posts/admindeletecomment',
  async (id,thunkAPI)=>{
      const {rejectWithValue} = thunkAPI;
      let config = {
          headers:{
              authorization:`khaled__${localStorage.getItem('UserToken')}`,
          }
      }
      try {
          const {data} = await BasUrl.delete(`/comment/delete/${id}`,config);
        
          return data.commentId;
      } catch (error) {
    
          toast.error(error.response.data.Error);
  
          return rejectWithValue(error.response.data.Error);
      }
  }
)

let initialState = {
  posts: [],
  post: null,
  newpost: null,
  loading: null,
  like: null,
  meta:null,
  allcomments:[]
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data.posts;
      state.meta = action.payload.meta;
      state.loading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getOnePost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOnePost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(getOnePost.rejected, (state, action) => {
      state.post = action.payload;
      state.loading = false;
    });
    builder.addCase(creatPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(creatPost.fulfilled, (state, action) => {
      state.newpost = action.payload;
      state.loading = false;
    });
    builder.addCase(creatPost.rejected, (state, action) => {
      state.newpost = action.payload;

      state.loading = false;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.post.likes = action.payload.likes;
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.like = action.payload;
    });
    builder.addCase(updatePost.pending,(state,action) => {
  
      state.loading = true
    })
    builder.addCase(updatePost.fulfilled,(state,action) => {
      state.post = action.payload
      state.loading = false
    })
    builder.addCase(updatePost.rejected,(state,action) => {
      state.post = action.payload
      state.loading = false
    })
    builder.addCase(deletePost.fulfilled,(state,action) => {
      state.posts =state.posts.filter(p=>p._id !==action.payload) 
      
    })
    builder.addCase(deletePost.rejected,(state,action) => {
      state.deletepost = action.payload
      
    });
    builder.addCase(addComment.pending,(state,action) => {
      state.loading = true
    })
    builder.addCase(addComment.fulfilled,(state,action) => {
     state.post.comments.push(action.payload)
      state.loading = false

    })
    builder.addCase(addComment.rejected,(state,action) => {
      state.loading = false
    })
    builder.addCase(deleteComment.pending,(state,action) => {
        state.loading = true
    })
    builder.addCase(deleteComment.fulfilled,(state,action) => {
     
        state.post.comments = state.post.comments.filter(c=> c._id !== action.payload) ;
    })
    builder.addCase(deleteComment.rejected,(state,action) => {
        state.loading = false
    })
    builder.addCase(admindeleteComment.fulfilled,(state,action) => {
      state.allcomments = state.allcomments.filter((c) => c._id !== action.payload)
    })
    builder.addCase(updateComment.fulfilled,(state,action) => {
        state.post.comments = state.post.comments.map(comment => comment._id === action.payload._id? action.payload:comment)
    })
    builder.addCase(updateComment.rejected,(state,action) => {
        state.loading = false
    })
    builder.addCase(getAllComments.fulfilled,(state,action) => {
        state.allcomments = action.payload
    })
    builder.addCase(getALLPostsFOrAdmin.fulfilled,(state,action) =>{
      state.posts = action.payload
    })
  },
});

export const postsReducer = postsSlice.reducer;
