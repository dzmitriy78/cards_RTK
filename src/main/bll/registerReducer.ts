import {registerAPI, RegisterParamsType} from "../dal/authAPI";
import {authMe} from "./loginReducer";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, Status} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const registerTC = createAsyncThunk("register/register", async (arg: { data: RegisterParamsType }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        const res = await registerAPI.register(arg.data)
        thunkAPI.dispatch(authMe())
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {email: res.data.addedUser.email, name: res.data.addedUser.name}
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "register",
    initialState: {
        name: "",
        email: "",
    } as RegisterInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerTC.fulfilled, (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
        })
    }
})

export const registerReducer = slice.reducer

export type RegisterInitialStateType = {
    name: string
    email: string
}