import {registerAPI} from "../dal/authAPI";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, Status} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const forgotPasswordTC = createAsyncThunk("forgot/forgot", async (arg: { email: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        const data = await registerAPI.forgot(arg.email)
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {info: data.data.info, error: data.data.error}
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "forgot",
    initialState: {
        info: "",
        error: ""
    } as forgotInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(forgotPasswordTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.info = action.payload.info
                state.error = action.payload.error
            }
        })
    }
})

export const forgotReducer = slice.reducer

export type forgotInitialStateType = {
    info: string
    error: string
}
