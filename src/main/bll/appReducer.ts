import {authMe} from "./loginReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'succeeded',
    ERROR = 'failed'
}

export const initializeAppTC = createAsyncThunk("app/initialize", async (arg, thunkAPI) => {
    try {
        await thunkAPI.dispatch(authMe())
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        isLoading: Status.IDLE,
        isInitialized: false,
        error: null
    } as appInitialStateType,
    reducers: {
        setIsLoadingAC: (state, action: PayloadAction<{ isLoading:Status }>) => {
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

export type appInitialStateType = {
    isLoading: Status,
    isInitialized: boolean,
    error: null | string
}

