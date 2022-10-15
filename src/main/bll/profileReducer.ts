import {registerAPI, UpdatedUserType} from "../dal/authAPI";
import {errorHandler} from "../../utils/errorHandler";
import {setAuthUserData} from "./loginReducer";
import {setIsLoadingAC} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const updateUserTC = createAsyncThunk("profile/profile", async (arg: { name: string, avatar: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: 'loading'}))
    const res = await registerAPI.updateUser(arg.name, arg.avatar)
    try {
        thunkAPI.dispatch(setAuthUserData({data: {isAuth: true, userData: res.data.updatedUser}}))
        thunkAPI.dispatch(setIsLoadingAC({isLoading: 'succeeded'}))
        return res.data
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
const slice = createSlice({
    name: "profile",
    initialState: {
        updatedUser: {
            _id: "",
            email: "",
            rememberMe: false,
            isAdmin: false,
            name: "",
            verified: false,
            publicCardPacksCount: 0,
            created: "",
            updated: "",
            __v: 0,
            token: "",
            tokenDeathTime: 0,
            avatar: ""
        },
        token: "",
        tokenDeathTime: 0
    } as UpdatedUserType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(updateUserTC.fulfilled, (state, action) => {
            state.updatedUser = action.payload.updatedUser
        })
    }
})

export const profileReducer = slice.reducer