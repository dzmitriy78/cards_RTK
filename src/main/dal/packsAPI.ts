import {AxiosResponse} from "axios"
import {instance} from "./authAPI";

export const packsAPI = {
    getPacks(params: GetPacksParamsType) {
        return instance.get<GetPacksResponseType>('cards/pack', {
            params
        })
    },
    createPacks(data: CreatePacksParamsType) {
        return instance.post<CreatePacksParamsType, AxiosResponse<CreatePacksResponseType>>('cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete<AxiosResponse<DeletePackResponseType>>(`cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePacksParamsType) {
        return instance.put<UpdatePackResponseType>(`cards/pack`, data)
    }
}

export const cardsAPI = {
    getCards(params: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>("cards/card", {
            params
        })
    },
    createCard(data: CreateCardsType) {
        return instance.post<CreateCardResponseType>('cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse<DeleteCardResponseType>>(`cards/card?id=${id}`)
    },
    updateCard(data: UpdateCardParamsType) {
        return instance.put<UpdateCardsResponseType>("cards/card", data)
    },
    changeGradeCard (data: ChangeGradeType) {
        return instance.put<ChangeCardGradeResponseType>("cards/grade", data)
    }
}

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string,
    more_id: string
    __v: number
}
export type GetPacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}
type GetPacksResponseType = {
    cardPacks: [CardPacksType]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
type CreatePacksResponseType = {
    newCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}
export type CreatePacksParamsType = {
    cardsPack: {
        name: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}
type DeletePackResponseType = {
    deletedCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}
type UpdatePacksParamsType = {
    cardsPack: {
        _id: string
        name: string
        deckCover: string
    }
}
type UpdatePackResponseType = {
    updatedCardsPack: CardPacksType,
    token: string
    tokenDeathTime: number
}

export type CardsType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    answerImg: string
    answerVideo: string
    questionVideo: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}
export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}
type GetCardsResponseType = {
    cards: [CardsType]
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
export type CreateCardsType = {
    card: {
        cardsPack_id: string
        question: string
        answer: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}
type CreateCardResponseType = {
    newCard: CardsType
    token: string
    tokenDeathTime: number
}
type DeleteCardResponseType = {
    deletedCard: CardsType
    token: string
    tokenDeathTime: number
}
export type UpdateCardParamsType = {
    card: {
        _id: string
        question: string
        answer: string
        comments?: string
    }
}
type UpdateCardsResponseType = {
    updatedCard: CardsType
    token: string
    tokenDeathTime: number
}
export type ChangeGradeType = {
    grade: number
    card_id: string
}
export type ChangeCardGradeResponseType = {
    updatedGrade: {
        _id: string,
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
        more_id: string
        created: string
        updated: string
        __v: number
    }
}