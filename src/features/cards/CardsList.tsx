import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {CardsType} from "../../main/dal/packsAPI";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {deleteCardTC, updateCardTC} from "../../main/bll/cardsReducer";
import moment from "moment";
import {Rating} from "primereact/rating";
import Confirm from "../../utils/ConfirmDialog";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import UploadFileWithBase64 from "../../utils/UploadFileWithBase64";

const CardsList = () => {
    const dispatch = useDispatch<DispatchType>()
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const cards = useSelector<AppStoreType, CardsType[] | []>(state => state.cards.cards)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)

    const [newQuestion, setNewQuestion] = useState("")
    const [newAnswer, setNewAnswer] = useState("")

    const onDeleteCard = (id: string) => {
        dispatch(deleteCardTC({id}))
    }
    const onUpdateCard = (id: string) => {
        if (newQuestion || newAnswer)
            dispatch(updateCardTC({data: {card: {_id: id, question: newQuestion, answer: newAnswer}}}))
    }

    const actionBodyTemplate = (rowData: any) => {

        const currentCard = cards.filter((c) => c._id === rowData._id)

        return (
            <div style={{width: '14vw', overflow: 'hidden', textAlign: "center", display: "inline-flex"}}>
                {myId === currentCard[0].more_id
                    ? <Modal icon={"pi pi-pencil"}
                             className="p-button-rounded p-button-success mr-2"
                             title={"Edit card"}
                             disabled={isLoading === "loading"}
                             callback={() => onUpdateCard(rowData._id)}>
                        <form>
                            <span style={{color: "teal", fontWeight: "bold", margin: "5px"}}>Question:</span>
                            <InputText style={{width: "95%", margin: "5px"}}
                                       defaultValue={currentCard[0].question.includes("data:image")
                                           ? ""
                                           : currentCard[0].question}
                                       onChange={(e) => setNewQuestion(e.target.value)}/>
                            <span>Upload an image?</span><UploadFileWithBase64 cb={setNewQuestion}/>

                            <span style={{color: "teal", fontWeight: "bold", margin: "5px"}}>Answer:</span>
                            <InputTextarea style={{width: "95%", margin: "5px"}}
                                           defaultValue={currentCard[0].answer.includes("data:image")
                                               ? ""
                                               : currentCard[0].answer}
                                           onChange={(e) => setNewAnswer(e.target.value)}
                                           rows={5}
                                           cols={30}
                                           autoResize/>
                            <span>Upload an image?</span><UploadFileWithBase64 cb={setNewAnswer}/>
                        </form>
                    </Modal>
                    : ""
                }
                {myId === currentCard[0].more_id
                    ? <Confirm icon="pi pi-trash"
                               className="p-button-rounded p-button-warning"
                               title={""}
                               message={"Are you sure you want to remove this card?"}
                               disabled={isLoading === "loading"}
                               callback={() => onDeleteCard(rowData._id)}
                    />
                    : ""
                }
            </div>
        )
    }

    const questionTemplate = (rowData: any) => {
        if (rowData.question.includes("data:image")) {
            return (
                <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                    <img style={{maxWidth: "80px", maxHeight: "60px"}}
                         alt={"question1"}
                         src={rowData.question}
                    />
                </div>)
        } else {
            return (
                <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                    {rowData.question}
                </div>
            )
        }
    }

    const answerTemplate = (rowData: any) => {
        return rowData.answer.includes("data:image")
            ? <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                <img style={{maxWidth: "80px", maxHeight: "60px"}}
                     alt={"answer1"}
                     src={rowData.answer}
                />
            </div>
            : <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.answer}
            </div>
    }
    const updatedTemplate = (rowData: any) => {
        return (
            <div style={{width: '12vw', overflow: 'hidden', textAlign: "center"}}>
                {moment(rowData.updated).format("DD.MM.YYYY  HH:mm ")}
            </div>
        )
    }
    const gradeTemplate = (rowData: any) => {
        return (
            <div style={{width: '12vw', overflow: 'hidden', textAlign: "center"}}>
                <Rating value={rowData.grade} readOnly stars={5} cancel={false}/>
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <DataTable value={cards} paginator responsiveLayout="scroll"
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                           rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="question" header="question" body={questionTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="answer" body={answerTemplate} headerStyle={{width: '20vw'}}
                            header="Answer" sortable={true}></Column>
                    <Column field="updated" header="Last updated" body={updatedTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="grade" header="Grade" body={gradeTemplate}
                            headerStyle={{width: '8vw'}} sortable={true}></Column>
                    <Column field="Actions" header="Actions" headerStyle={{width: '14vw'}}
                            body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default CardsList;