import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import cl from "../../styles/Packs.module.scss"
import {createCardTC} from "../../main/bll/cardsReducer";
import CardsList from "./CardsList";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {PACKS_PATH} from "../../main/ui/Routing";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import Loader from "../../utils/Loader";
import UploadFileWithBase64 from "../../utils/UploadFileWithBase64";
import defaultCover from "../../assets/defaultCover.png";
import {Status} from "../../main/bll/appReducer";

const Cards = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    const currentPack = useAppSelector(state => state.cards.currentCardsPack)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const cards = useAppSelector(state => state.cards.cards)
    const myName = useAppSelector(state => state.login.userData.name)

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const createCard = () => {
        if (question)
            dispatch(createCardTC({data: {card: {cardsPack_id: currentPack._id, question, answer}}}))
        setQuestion("")
        setAnswer("")
    }
    const [isCoverBroken, setIsCoverBroken] = useState<boolean>(false)
    const errorCoverHandler = () => {
        setIsCoverBroken(true)
    }
    return (
        <>
            {isLoading === Status.LOADING && <Loader/>}
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PACKS_PATH)}
                >Back to packs</Button>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {currentPack.deckCover && <img style={{maxWidth: "200px", maxHeight: "200px"}}
                                                   onError={errorCoverHandler}
                                                   src={isCoverBroken ? defaultCover : currentPack.deckCover}
                                                   alt={"cover"}/>}
                </div>
                <div className={cl.title}>{`Pack name: ${currentPack.name}`}</div>
                {
                    myName === currentPack.user_name
                        ? <Modal callback={createCard}
                                 titleBtn={"Add new card"}
                                 title={"Add new card"}
                                 icon={"pi pi-plus-circle"}
                                 className={""}
                                 disabled={isLoading === Status.LOADING}>
                            <form>
                                <label htmlFor="question">Question</label>
                                <span>
                                        <InputText style={{width: "95%", margin: "5px"}}
                                                   id="question"
                                                   value={question.includes("data:image")
                                                       ? ""
                                                       : question}
                                                   onChange={(e) => setQuestion(e.target.value)}/>
                                    <span>Upload an image?</span><UploadFileWithBase64 cb={setQuestion}/>
                                </span>
                                <label htmlFor="answer">Answer</label>

                                <InputTextarea style={{width: "95%", margin: "5px"}}
                                               value={answer.includes("data:image")
                                                   ? ""
                                                   : answer}
                                               onChange={(e) => setAnswer(e.target.value)}
                                               rows={5}
                                               cols={30}
                                               autoResize/>
                                <span>Upload an image?</span><UploadFileWithBase64 cb={setAnswer}/>
                            </form>
                        </Modal>
                        : ""
                }
            </div>
            {cards.length
                ? <CardsList/>
                : <div className={cl.title}>This pack is empty</div>}
        </>
    )
}

export default Cards;