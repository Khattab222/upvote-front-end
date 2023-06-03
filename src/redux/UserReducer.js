import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BasUrl from "./api/BaseUrl";
import { toast } from "react-toastify";
import { authAction } from "./AuthReducer";


export const getProfileData = createAsyncThunk('user/getProfileData'
, async (id,thunkApi) =>{
    const {rejectWithValue} = thunkApi;

    let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`
        }
    }

    try {
        const {data} = await BasUrl.get(`/user/profile/${id}`,config)
   
        return data.user
    } catch (error) {
   
        rejectWithValue(error.response.data.Errormsg)
    }

})





// updat profile photo of logined user
export const updateUserPhoto = createAsyncThunk('user/updateUserPhoto',
async(pic,thunkApi) =>{
    const {rejectWithValue,dispatch} = thunkApi;
    let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`,
            "content-Type":"multipart/form-data"
        }
    }
    try {
        const response= await BasUrl.post(`/user/profile`,pic,config);
        if (response.status === 200) {
       
            toast.success("photo updated :)")
        }
        dispatch(authAction.updatePhotoAuth(response.data.user.profile_pic));
        // update local storage with new photo
      let user =  JSON.parse(localStorage.getItem('UserInfo'));
      user.profile_pic = response.data.user.profile_pic
      localStorage.setItem('UserInfo',JSON.stringify(user))
  
        return response.data.user
    } catch (error) {
   
        toast.error(error.response.data.Errormsg)
        rejectWithValue(error.response.data)
        
    }

}

)

// update user profile 
export const updateUserProfile = createAsyncThunk('user/updateUserProfile',
async(body,thunkApi) => {
    const {rejectWithValue} = thunkApi;
    let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`
        }
    }
    try {
        const res =await BasUrl.patch('user/updateprofile',body,config)

if(res.status === 200)toast.success("update done successfully")
      
        return res.data.updateUser
    } catch (error) {
        toast.error(error.response.data.Errormsg)
        rejectWithValue(error.response.data)
    }
}
)


// get all users 
export const getAllUsers = createAsyncThunk('user/getAllUsers',
async (__,thunkApi) =>{
    const {rejectWithValue} = thunkApi
    let config = {
        headers:{
            authorization:`khaled__${localStorage.getItem('UserToken')}`
        }
    }
    try {
        const {data} = await BasUrl.get('user/',config);
        return data.allUsers

    } catch (error) {
         toast.error(error.response.data.message)
        rejectWithValue(error.response.data)
    }
})


// delete user 
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(id,thunkApi) =>{
        const {rejectWithValue} = thunkApi
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`
            }
        }
        try {
            const {data} = await BasUrl.delete(`user/${id}`,config);
            return data.id
        } catch (error) {
            toast.error(error.response.data.message)
            rejectWithValue(error.response.data)
        }
    }
)

let initialState = {
    userProfile:null,
   allusers:[],
    loading:false,
 
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getProfileData.pending,(state,action) =>{
            state.loading = true;  
        });
        builder.addCase(getProfileData.fulfilled,(state,action) => {
            state.loading = false;
          state.userProfile = action.payload;

        })
        builder.addCase(getProfileData.rejected,(state,action) => {
            state.loading = false;
           state.userProfile = action.payload;
        })
        builder.addCase(updateUserPhoto.pending,(state,action) =>{
            state.loading = true;  
        })
        builder.addCase(updateUserPhoto.fulfilled,(state,action) =>{
            state.loading = false;  
            state.userProfile.profile_pic = action.payload.profile_pic 
        })
        builder.addCase(updateUserPhoto.rejected,(state,action) =>{
            state.loading = false;     
        })
        builder.addCase(updateUserProfile.pending,(state,action) => {
          state.loading = true;
        })
        builder.addCase(updateUserProfile.fulfilled,(state,action) => {
            state.userProfile = action.payload
          state.loading = false;
        })
        builder.addCase(updateUserProfile.rejected,(state,action) => {
           
          state.loading = false;
        })
        builder.addCase(getAllUsers.fulfilled,(state,action) => {
          state.allusers = action.payload
        })
        builder.addCase(deleteUser.fulfilled,(state,action) =>{
            state.allusers = state.allusers.filter((user) => user._id !== action.payload)
        })
    }
})


export  let  userReducer = UserSlice.reducer