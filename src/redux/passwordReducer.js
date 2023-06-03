import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import BasUrl from "./api/BaseUrl";

//forget password handle and sent email
export const forgetPassword = createAsyncThunk(
    "password/forgetPassword",
    async(email,thunkAPI) =>{
        const {rejectWithValue} =thunkAPI;
        try {
            const {data} =await BasUrl.post(`/auth/forgetpass`,email);
         
            toast.error(data.message)
            return data.message
        } catch (error) {
        
            toast.error(error.response.data.Error)
      
            return rejectWithValue(error.response.data)
        }
    }
)



//reset password
export const resetPassword = createAsyncThunk(
    "password/resetPassword",
    async({token,newPass} , thunkAPI) =>{
        const {rejectWithValue} =thunkAPI;
        try {
            const {data} =await BasUrl.post(`/auth/reset-password/${token}`,{newPass})
         
            return data.message
        } catch (error) {
           
            toast.error(error.response.data.Error)
      
            return rejectWithValue(error.response.data)
        }
    }
)




const initialState = {message:null,loading:null}

const passwordSlice = createSlice({
    name:'password',
    initialState,
    extraReducers:(builder) =>{
       builder.addCase(forgetPassword.pending,(state,action) =>{
        state.loading = true
       })
       builder.addCase(forgetPassword.fulfilled,(state,action) =>{
        state.message = action.payload
        state.loading = false
       })
       builder.addCase(forgetPassword.rejected,(state,action) =>{
        state.loading = false
       })
       builder.addCase(resetPassword.pending,(state,action) =>{
        state.loading = true
       })
       builder.addCase(resetPassword.fulfilled,(state,action) =>{
        state.message = action.payload
        state.loading = false
       })
       builder.addCase(resetPassword.rejected,(state,action) =>{
        state.loading = false
       })
    }

})



export const passwordReducer = passwordSlice.reducer