import {authMe} from "./loginReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initializeAppTC = createAsyncThunk("app/initialize", async (arg, thunkAPI) => {
    await thunkAPI.dispatch(authMe())
    try {
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        isLoading: 'idle',
        isInitialized: false,
        error: null
    } as appInitialStateType,
    reducers: {
        setIsLoadingAC: (state, action: PayloadAction<{ isLoading: RequestLoadingType }>) => {
            state.isLoading = action.payload.isLoading
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer

export const {setIsLoadingAC, setError} = slice.actions

export type RequestLoadingType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appInitialStateType = {
    isLoading: RequestLoadingType,
    isInitialized: boolean,
    error: null | string
}

