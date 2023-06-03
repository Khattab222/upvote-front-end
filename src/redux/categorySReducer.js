import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BasUrl from "./api/BaseUrl";
import { toast } from "react-toastify";


// get all categories
export const getAllCategory = createAsyncThunk(
    'category/getcategory',
    async (__,thunkAPI) =>{
        const {rejectWithValue} = thunkAPI
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
            }
        }
        try {
            const {data} = await BasUrl.get('/category',config)
       
            return data.category
        } catch (error) {

            return rejectWithValue(error.response.data.Error);
        }
    }
)

// creat category 
export const createCategory = createAsyncThunk(
    'category/createcategory',
    async (body,thunkAPI) =>{
        const {rejectWithValue} = thunkAPI;
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
            }
        }
        try {
            const {data}=await BasUrl.post(`/category`,body,config);
        
              if (data.message === 'done') {
                toast.success('category added success')
              }
                return data.newCategory
        } catch (error) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }

    }
)

// delete category
export const deleteCategory = createAsyncThunk(
    'category/deletecategory',
    async (id,thunkAPI) =>{
        const {rejectWithValue} = thunkAPI;
        let config = {
            headers:{
                authorization:`khaled__${localStorage.getItem('UserToken')}`,
            }
        }
        try {
            const {data} = await BasUrl.delete(`/category/${id}`,config );
            return data.categoryId
        } catch (error) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
    }
)






const initialState = {allCategory:[],loading:null}

const categorySlice = createSlice({
    name:'category',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getAllCategory.fulfilled,(state,action) =>{
            state.allCategory = action.payload
        });
        builder.addCase(createCategory.pending,(state,action) =>{
            state.loading = true
        })
        builder.addCase(createCategory.rejected,(state,action) =>{
            state.loading = false
        })
        builder.addCase(createCategory.fulfilled,(state,action) =>{
            state.allCategory.push(action.payload)
            state.loading = false

        })
        builder.addCase(deleteCategory.fulfilled,(state,action) =>{
            state.allCategory = state.allCategory.filter((cat) => cat._id !== action.payload)
        

        })
    }

})



export const categoryReducer = categorySlice.reducer