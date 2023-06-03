import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BasUrl from "./api/BaseUrl";
import { toast } from "react-toastify";





// login function
export const login = createAsyncThunk('auth/login'
,async(logindata,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
        let {data} = await BasUrl.post('/auth/login',logindata);
     

   return data
        
    } catch (error) {
     
        toast.error(error.response.data.Error)
        return rejectWithValue(error.response.data.message)

    }
})
// log out
export const logOut = createAsyncThunk('auth/logout'
,async(__,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    let config = {
        headers: {
          authorization: `khaled__${localStorage.getItem("UserToken")}`,
        },
      };
    try {
        let {data} = await BasUrl.post('/auth/logout',{},config);
     

   return data
        
    } catch (error) {
    
        toast.error(error.response.data.Errormsg)
        return rejectWithValue(error.response.data.message)

    }
})

// register function
export const register = createAsyncThunk('auth/register',async(newuser,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} =await BasUrl.post('/auth/signup',newuser);
      
        return data
    } catch (error) {
   
   
        toast.error(error.response.data.Error)
      

        return rejectWithValue(error.response.data.Error)
    }
}
)

// confirm Email
export const  confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async(token,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
      const {data} = await BasUrl.get(`auth/confirmLink/${token}`)
    
      return data.updateuser.isConfirmed
    } catch (error) {
   
      toast.error(error.response.data.Errormsg)

      return rejectWithValue(error.response.data.Errormsg)
    }
  }
)





let initialState = {loginUser: localStorage.getItem("UserInfo") != null ? JSON.parse(localStorage.getItem("UserInfo")):null
,newUser:null,errors:null,loading:null,token:'',confirm:false}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      updatePhotoAuth(state,action){
        state.loginUser.profile_pic = action.payload
   
      }
    }
    ,extraReducers:(builder) =>{
       builder.addCase(login.pending,(state,action) => {
         state.loading = true
       });
       builder.addCase(login.fulfilled,(state,action) => {
        localStorage.setItem('UserToken',action.payload.token)
        localStorage.setItem("UserInfo", JSON.stringify(action.payload.user));
         state.loginUser = action.payload.user; 
      
         state.loading = false
       })
       builder.addCase(login.rejected,(state,action) => {
           state.loading = false
       })
       builder.addCase(logOut.fulfilled,(state,action) => {
        localStorage.removeItem('UserToken')
        localStorage.removeItem('UserInfo')
         state.loginUser = null; 
       })
       builder.addCase(register.fulfilled,(state,action) => {
         state.newUser = action.payload
         state.loading = false
       })
       builder.addCase(register.pending,(state,action) => {
        state.loading = true
       })
       builder.addCase(register.rejected,(state,action) => {
        state.loading = false

       })
       builder.addCase(confirmEmail.fulfilled,(state,action) => {
        state.confirm= action.payload
       })
    }
})

export let AuthReducer = authSlice.reducer
export let authAction = authSlice.actions