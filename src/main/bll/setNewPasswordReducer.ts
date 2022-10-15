import {registerAPI} from "../dal/authAPI";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const setNewPasswordTC = createAsyncThunk("setNewPassword/setNewPassword", async (arg: { password: string, token: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: 'loading'}))
    const res = await registerAPI.setNewPassword(arg.password, arg.token)
    try {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: 'succeeded'}))
        return {info: res.data.info, error: res.data.error}
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({e})
    }
})

const slice = createSlice({
    name: "setNewPassword",
    initialState: {
        info: "",
        error: ""
    } as setNewPasswordInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setNewPasswordTC.fulfilled, (state, action) => {
            state.info = action.payload.info
            state.error = action.payload.error
        })
    }
})

export const setNewPasswordReducer = slice.reducer

export type setNewPasswordInitialStateType = {
    info: string
    error: string
}