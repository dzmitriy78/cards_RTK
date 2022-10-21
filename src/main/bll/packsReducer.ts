import {setIsLoadingAC, Status} from "./appReducer";
import {CardPacksType, CreatePacksParamsType, GetPacksParamsType, packsAPI} from "../dal/packsAPI";
import {errorHandler} from "../../utils/errorHandler";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const getPacksTC = createAsyncThunk("packs/getPacks",
    async (arg: { params: GetPacksParamsType }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        const res = await packsAPI.getPacks(arg.params)
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return res.data
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const addPackTC = createAsyncThunk("packs/addPack",
    async (arg: { data: CreatePacksParamsType }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        const res = await packsAPI.createPacks(arg.data)
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return res.data
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const deletePackTC = createAsyncThunk("packs/deletePack",
    async (arg: { id: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    try {
        await packsAPI.deletePack(arg.id)
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return arg.id
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const updatePackTC = createAsyncThunk("packs/updatePack",
    async (arg: { id: string, newName: string, newDeckCover: string }, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
    const res = await packsAPI.updatePack({
        cardsPack: {
            _id: arg.id,
            name: arg.newName,
            deckCover: arg.newDeckCover
        }
    })
    try {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
        return {
            id: res.data.updatedCardsPack._id,
            name: res.data.updatedCardsPack.name,
            deckCover: res.data.updatedCardsPack.deckCover
        }
    } catch (e: any) {
        errorHandler(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
const slice = createSlice({
    name: "packs",
    initialState: {
        cardPacks: [],
        getPacksParams: {
            packName: "",
            min: 0,
            max: 0,
            sortPacks: "0created",
            page: 1,
            pageCount: 100,
            user_id: /*"62d013204d4a530a949a8238"*/ ""
        },
        page: 0,
        pageCount: 0,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 0,
        token: "",
        tokenDeathTime: 0
    } as packsInitialStateType,
    reducers: {
        setPacksParams(state, action: PayloadAction<{ data: GetPacksParamsType }>) {
            state.getPacksParams = action.payload.data
        }
    },
    extraReducers: builder => {
        builder.addCase(getPacksTC.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
        })
        builder.addCase(addPackTC.fulfilled, (state, action) => {
            state.cardPacks = [action.payload.newCardsPack, ...state.cardPacks]
        })
        builder.addCase(deletePackTC.fulfilled, (state, action) => {
            state.cardPacks = state.cardPacks.filter(p => p._id !== action.payload)
        })
        builder.addCase(updatePackTC.fulfilled, (state, action) => {
            state.cardPacks = state.cardPacks.map(p => p._id === action.payload.id
                ? {...p, name: action.payload.name, deckCover: action.payload.deckCover}
                : p)
        })
    }
})

export const packsReducer = slice.reducer
export const {setPacksParams} = slice.actions

export type packsInitialStateType = {
    cardPacks: CardPacksType[],
    getPacksParams: GetPacksParamsType,
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

