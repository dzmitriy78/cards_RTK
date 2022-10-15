import {setIsLoadingAC} from "./appReducer";
import {
    CardPacksType,
    cardsAPI,
    CardsType, ChangeCardGradeResponseType, ChangeGradeType,
    CreateCardResponseType,
    CreateCardsType,
    GetCardsParamsType,
    GetCardsResponseType,
    UpdateCardParamsType
} from "../dal/packsAPI";
import {ThunkType} from "./store";
import {errorHandler} from "../../utils/errorHandler";

const SET_CARDS = "cardReducer/SET-CARDS"
const CREATE_CARD = "cardReducer/CREATE-CARD"
const DELETE_CARD = "cardReducer/DELETE-CARD"
const UPDATE_CARD = "cardReducer/UPDATE-CARD"
const SET_CARDS_PACK = "cardReducer/SET-CARDS-PACK"
const UPDATE_GRADE = "cardReducer/UPDATE-GRADE"

export const setCards = (data: GetCardsResponseType) => ({type: SET_CARDS, payload: {data}}) as const
export const addCard = (data: CreateCardResponseType) => ({type: CREATE_CARD, data}) as const
export const removeCard = (cardId: string) => ({type: DELETE_CARD, cardId}) as const
export const renovationCard = (data: CardsType) => ({type: UPDATE_CARD, data}) as const
export const setCardsPack = (data: CardPacksType) => ({type: SET_CARDS_PACK, payload: {data}}) as const
export const updateGrade = (data: ChangeCardGradeResponseType) => ({type: UPDATE_GRADE, data}) as const

const cardsInitialState: CardsInitialStateType = {
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
}

const cardsReducer = (state = cardsInitialState, action: CardsReducerAT): CardsInitialStateType => {

    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.payload.data.cards
            }
        case CREATE_CARD:
            return {
                ...state,
                cards: [action.data.newCard, ...state.cards]
            }
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(c => c._id !== action.cardId)
            }
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.data._id
                    ? {...c, question: action.data.question, answer: action.data.answer}
                    : c)
            }
        case SET_CARDS_PACK:
            return {
                ...state,
                currentCardsPack: action.payload.data
            }
        case UPDATE_GRADE:
            return {
                ...state,
                updatedGrade: action.data
            }
        default: {
            return state
        }
    }
}

export default cardsReducer;

export const getCardsTC = (data: GetCardsParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC({isLoading:'loading'}))
    try {
        const res = await cardsAPI.getCards(data)
        dispatch(setCards(res.data))
        dispatch(setIsLoadingAC({isLoading:'succeeded'}))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const createCardTC = (data: CreateCardsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC({isLoading:'loading'}))
    try {
        const res = await cardsAPI.createCard(data)
        dispatch(addCard(res.data))
        dispatch(setIsLoadingAC({isLoading:'succeeded'}))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const deleteCardTC = (id: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC({isLoading:'loading'}))
    try {
        await cardsAPI.deleteCard(id)
        dispatch(removeCard(id))
        dispatch(setIsLoadingAC({isLoading:'succeeded'}))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const updateCardTC = (data: UpdateCardParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC({isLoading:'loading'}))
    try {
        const res = await cardsAPI.updateCard(data)
        if (res.data)
            dispatch(renovationCard(res.data.updatedCard))
        dispatch(setIsLoadingAC({isLoading:'succeeded'}))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const changeGradeTC = (data: ChangeGradeType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC({isLoading:'loading'}))
    try {
        const res = await cardsAPI.changeGradeCard(data)
        if (res.data)
            dispatch(updateGrade(res.data))
        dispatch(setIsLoadingAC({isLoading:'succeeded'}))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

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
type SetCardsAT = ReturnType<typeof setCards>
type CreateCardsAT = ReturnType<typeof addCard>
type DeleteCardsAT = ReturnType<typeof removeCard>
type RenovationCardAT = ReturnType<typeof renovationCard>
type SetCardsPackAT = ReturnType<typeof setCardsPack>
type UpdateGradeAT = ReturnType<typeof updateGrade>

export type CardsReducerAT =
    SetCardsAT

    | CreateCardsAT
    | DeleteCardsAT
    | RenovationCardAT
    | SetCardsPackAT
    | UpdateGradeAT