import {setIsLoadingAC, Status} from "./appReducer";
import {
    CardPacksType,
    cardsAPI,
    CardsType,
    ChangeCardGradeResponseType,
    ChangeGradeType,
    CreateCardsType,
    GetCardsParamsType,
    UpdateCardParamsType
} from "../dal/packsAPI";
import {errorHandler} from "../../utils/errorHandler";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const getCardsTC = createAsyncThunk("card/getCards",
    async (arg: { data: GetCardsParamsType }, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
        try {
            const res = await cardsAPI.getCards(arg.data)
            thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
            return res.data
        } catch (e) {
            errorHandler(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
export const createCardTC = createAsyncThunk("cards/createCard",
    async (arg: { data: CreateCardsType }, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
        try {
            const res = await cardsAPI.createCard(arg.data)
            thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
            return res.data
        } catch (e) {
            errorHandler(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
export const deleteCardTC = createAsyncThunk("cards/deleteCard",
    async (arg: { id: string }, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
        try {
            await cardsAPI.deleteCard(arg.id)
            thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
            return arg.id
        } catch (e) {
            errorHandler(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
export const updateCardTC = createAsyncThunk("cards/updateCard",
    async (arg: { data: UpdateCardParamsType }, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
        try {
            const res = await cardsAPI.updateCard(arg.data)
            thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
            return res.data.updatedCard
        } catch (e) {
            errorHandler(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })
export const changeGradeTC = createAsyncThunk("cards/changeGrade",
    async (arg: { data: ChangeGradeType }, thunkAPI) => {
        thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.LOADING}))
        try {
            const res = await cardsAPI.changeGradeCard(arg.data)
            thunkAPI.dispatch(setIsLoadingAC({isLoading: Status.SUCCESS}))
            return res.data
        } catch (e) {
            errorHandler(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: "card",
    initialState: {
        getCardParams: {
            cardAnswer: "",
            cardQuestion: "",
            cardsPack_id: /*"630b326c08095407487d7a75"*/"",
            min: 0,
            max: 0,
            sortCards: "1grade",
            page: 1,
            pageCount: 120
        },
        cards: [],
        currentCardsPack: {} as CardPacksType,
        updatedGrade: {} as ChangeCardGradeResponseType,
        packUserId: "",
        page: 0,
        pageCount: 0,
        cardsTotalCount: 0,
        minGrade: 0,
        maxGrade: 0,
        token: "",
        tokenDeathTime: 0
    } as CardsInitialStateType,
    reducers: {
        setCardsPack(state, action: PayloadAction<{ data: CardPacksType }>) {
            state.currentCardsPack = action.payload.data
        }
    },
    extraReducers: builder => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.cards = action.payload.cards
        })
        builder.addCase(createCardTC.fulfilled, (state, action) => {
            state.cards = [action.payload.newCard, ...state.cards]
        })
        builder.addCase(deleteCardTC.fulfilled, (state, action) => {
            state.cards = state.cards.filter(c => c._id !== action.payload)
        })
        builder.addCase(updateCardTC.fulfilled, (state, action) => {
            state.cards = state.cards.map(c => c._id === action.payload._id
                ? {...c, question: action.payload.question, answer: action.payload.answer}
                : c)
        })
    }
})

export const cardsReducer = slice.reducer
export const {setCardsPack} = slice.actions

type CardsInitialStateType = {
    getCardParams: GetCardsParamsType
    cards: CardsType[] | []
    currentCardsPack: CardPacksType
    updatedGrade: ChangeCardGradeResponseType
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
