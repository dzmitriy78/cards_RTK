import {authAPI, LoginParamsType, UserDataType} from "../dal/authAPI"
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, Status} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const authMe = createAsyncThunk("login/authMe", async (arg, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
    const data = await authAPI.me()
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {isAuth: true, userData: data.data}
    } catch (e: any) {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.ERROR}))
        return thunkAPI.rejectWithValue(null)
    }
})
export const loginTC = createAsyncThunk("login/login", async (arg: { data: LoginParamsType }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        const res = await authAPI.login(arg.data)
        if (!res.data.error)
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {isAuth: true, userData: res.data}
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const logoutTC = createAsyncThunk("login/logout", async (arg, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        await authAPI.logout()
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {
            isAuth: false,
            userData: {
                avatar: "",
                created: "",
                email: "",
                isAdmin: false,
                name: "",
                publicCardPacksCount: 0,
                rememberMe: false,
                token: "",
                tokenDeathTime: 0,
                updated: "",
                verified: false,
                __v: 0,
                _id: ""
            }
        }
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "login",
    initialState: {
        isAuth: false,
        userData: {
            avatar: "",
            created: "",
            email: "",
            isAdmin: false,
            name: "",
            publicCardPacksCount: 0,
            rememberMe: false,
            token: "",
            tokenDeathTime: 0,
            updated: "",
            verified: false,
            __v: 0,
            _id: ""
        }
    } as LoginInitialStateType,
    reducers: {
        setAuthUserData(state, action: PayloadAction<{ data: LoginInitialStateType }>) {
            state.userData = action.payload.data.userData
        }
    },
    extraReducers: builder => {
        builder.addCase(authMe.fulfilled, (state, action) => {
            state.isAuth = action.payload.isAuth
            state.userData = action.payload.userData
        })
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isAuth = true
            state.userData = action.payload.userData
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isAuth = false
            state.userData = action.payload.userData
        })
    }
})

export const loginReducer = slice.reducer
export const {setAuthUserData} = slice.actions

export type LoginInitialStateType = {
    isAuth: boolean
    userData: UserDataType
}