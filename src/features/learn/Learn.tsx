import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import cl from "./../../styles/Learn.module.scss"
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {CardsType} from "../../main/dal/packsAPI";
import {changeGradeTC} from "../../main/bll/cardsReducer";
import {CARDS_PATH} from "../../main/ui/Routing";
import Loader from "../../utils/Loader";
import {Status} from "../../main/bll/appReducer";

const grades = ['did not know', 'forgot', 'long thought', 'confused', 'knew'];

const getCard = (cards: CardsType[]) => {

    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1})

    return cards[res.id + 1]
}

const LearnPage: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()

    const cards = useAppSelector(state => state.cards.cards)
    const _id = useAppSelector(state => state.cards.currentCardsPack._id)
    const isLoading = useAppSelector(state => state.app.isLoading)

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardsType>({
        _id: 'fake',
        cardsPack_id: '',
        user_id: "",
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        questionImg: "",
        answerImg: "",
        answerVideo: "",
        questionVideo: "",
        type: '',
        rating: 0,
        more_id: '',
        comments: "",
        created: '',
        updated: '',
        __v: 0
    })

    useEffect(() => {
        if (first)
            setFirst(false)
        if (cards.length > 0)
            setCard(getCard(cards))
    }, [dispatch, _id, cards, first])

    const onNext = () => {
        setIsChecked(false)
        if (cards.length > 0)
            setCard(getCard(cards))
    }

    return (
        <>
            {isLoading === Status.LOADING && <Loader/>}
            <div className={cl.header}>
                <Button type="button"
                        icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(CARDS_PATH)}>
                    To cards pack
                </Button>
                <div className={cl.title}>Learn Page</div>
            </div>
            <div className={cl.attempts}>
                <span>number of attempts: </span>
                {card.shots}
            </div>
            <div className={cl.quTitle}>
                <span className={cl.qu}> Question: </span>
                {card.question.includes("data:image")
                    ? <img style={{maxWidth: "100px", maxHeight: "100px"}}
                           alt={"question"}
                           src={card.question}
                    />
                    : <span className={cl.ans}>{card.question}</span>
                }
            </div>
            <div>
                <Button style={{fontSize: "30px"}}
                        onClick={() => setIsChecked(true)}>
                    check
                </Button>
            </div>

            {isChecked && (
                <>
                    <div className={cl.quTitle}>
                        <span className={cl.qu}>  Answer: </span>
                        {card.answer.includes("data:image")
                            ? <img style={{maxWidth: "100px", maxHeight: "100px"}}
                                   alt={"answer"}
                                   src={card.answer}
                            />
                            : <span className={cl.ans}>{card.answer}</span>
                        }
                    </div>
                    <div className={cl.grade}>
                        {grades.map((g, i) => (
                            <Button key={'grade-' + i} disabled={isLoading === Status.LOADING}
                                    onClick={() => {
                                        dispatch(changeGradeTC({data: {grade: i + 1, card_id: card._id}}))
                                        onNext()
                                    }}>
                                {g}
                            </Button>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default LearnPage