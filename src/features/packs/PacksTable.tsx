import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {deletePackTC, updatePackTC} from "../../main/bll/packsReducer";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {Button} from "primereact/button";
import {setIsLoadingAC, Status} from "../../main/bll/appReducer";
import {useNavigate} from "react-router-dom";
import {CARDS_PATH, LEARN_PATH} from "../../main/ui/Routing";
import {getCardsTC, setCardsPack} from "../../main/bll/cardsReducer";
import moment from "moment";
import Confirm from "../../utils/ConfirmDialog";
import {InputText} from "primereact/inputtext";
import Modal from "../../utils/Modal";
import defaultCover from "../../assets/defaultCover.png";
import noCover from "../../assets/No_Cover.png";
import UploadFileWithBase64 from "../../utils/UploadFileWithBase64";

const PacksTable: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const params = useAppSelector(state => state.cards.getCardParams)
    const myName = useAppSelector(state => state.login.userData.name)
    const navigate = useNavigate()

    const [newName, setNewName] = useState("")
    const [newDeckCover, setNewDeckCover] = useState("")


    const onDeletePack = (id: string) => {
        dispatch(deletePackTC({id}))
    }
    const onUpdatePack = (id: string) => {
        if (newName || newDeckCover)
            dispatch(updatePackTC({id, newName, newDeckCover}))
        setNewName("")
        setNewDeckCover("")
    }

    const actionBodyTemplate = (rowData: any) => {
        const currentPack = cardPacks.filter((c) => c._id === rowData._id)
        const [isCoverBroken, setIsCoverBroken] = useState<boolean>(false)

        const errorImgHandler = () => {
            dispatch(setIsLoadingAC({isLoading: Status.ERROR}))
            setIsCoverBroken(true)
        }
        return (
            <div style={{overflow: 'hidden', textAlign: "center", display: "inline-flex"}}>
                <Button icon="pi pi-book"
                        className="p-button-rounded p-button-success mr-2"
                        title={"learn"}
                        disabled={isLoading === Status.LOADING || rowData.cardsCount === 0}
                        onClick={() => {
                            dispatch(getCardsTC({data: {...params, cardsPack_id: rowData._id}}))
                            dispatch(setCardsPack({data: currentPack[0]}))
                            navigate(LEARN_PATH)
                        }}
                />
                {
                    myName === rowData.user_name
                    && <Modal icon={"pi pi-pencil"}
                              className="p-button-rounded p-button-success mr-2"
                              title={`Edit pack "${currentPack[0].name}"`}
                              disabled={isLoading === Status.LOADING}
                              callback={() => onUpdatePack(rowData._id)}>
                        <form>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                {rowData.deckCover && <img style={{maxWidth: "200px", maxHeight: "200px"}}
                                                           onError={errorImgHandler}
                                                           src={isCoverBroken ? defaultCover : rowData.deckCover}
                                                           alt={"cover"}/>}
                            </div>
                            <span style={{color: "teal", fontWeight: "bold", margin: "5px"}}>Select new cover:</span>
                            <UploadFileWithBase64 cb={setNewDeckCover}/>
                            <span style={{color: "teal", fontWeight: "bold", margin: "5px"}}>New pack name:</span>
                            <InputText style={{width: "95%"}}
                                       id="newName"
                                       defaultValue={currentPack[0].name}
                                       onChange={(e) => setNewName(e.target.value)}/>

                        </form>
                    </Modal>
                }
                {
                    myName === rowData.user_name
                    && <Confirm icon="pi pi-trash"
                                className="p-button-rounded p-button-warning"
                                title={""}
                                message={
                                    <>
                                        <span>Are you sure you want to remove package </span>
                                        {rowData.deckCover && <img style={{maxWidth: "80px", maxHeight: "60px"}}
                                                                   onError={errorImgHandler}
                                                                   src={isCoverBroken ? defaultCover : rowData.deckCover}
                                                                   alt={"cover1"}/>}
                                        <span style={{fontWeight: "bold"}}>
                                           {currentPack[0].name}.
                                       </span>
                                        <div> All card will be deleted.</div>
                                    </>
                                }
                                disabled={isLoading === Status.LOADING}
                                callback={() => onDeletePack(rowData._id)}
                    />
                }
            </div>
        )
    }
    const nameTemplate = (rowData: any) => {
        const currentPack = cardPacks.filter((c) => c._id === rowData._id)
        return (
            <div style={{width: '25vw', overflow: 'hidden', cursor: "pointer"}} onClick={() => {
                if (isLoading !== Status.LOADING) {
                    dispatch(getCardsTC({data: {...params, cardsPack_id: rowData._id}}))
                    dispatch(setCardsPack({data: currentPack[0]}))
                    navigate(CARDS_PATH)
                }
            }
            }>
                {rowData.name}
            </div>
        )
    }
    const cardsCountTemplate = (rowData: any) => {
        return (
            <div style={{width: '5vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.cardsCount}
            </div>
        )
    }
    const updatedTemplate = (rowData: any) => {
        return (
            <div style={{width: '12vw', overflow: 'hidden', textAlign: "center"}}>
                {moment(rowData.updated).format("DD.MM.YYYY  HH:mm ")}
            </div>
        )
    }
    const userNameTemplate = (rowData: any) => {
        return (
            <div style={{width: '15vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.user_name}
            </div>
        )
    }
    const coverTemplate = (rowData: any) => {
        const [isCoverBroken, setIsCoverBroken] = useState<boolean>(false)
        const errorCoverHandler = () => {
            setIsCoverBroken(true)
        }
        return (
            <div style={{width: '10vw', height: "60px", overflow: 'hidden', textAlign: "center"}}>
                {rowData.deckCover
                    ? <img style={{maxWidth: "80px", maxHeight: "60px"}}
                           alt={"cover"}
                           onError={errorCoverHandler}
                           src={isCoverBroken ? defaultCover : rowData.deckCover}
                    />
                    : <img style={{maxWidth: "80px", maxHeight: "60px"}}
                           alt={"no cover"}
                           src={noCover}
                    />
                }
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <DataTable value={cardPacks} paginator responsiveLayout="scroll"
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                           rowsPerPageOptions={[5, 10, 20, 50]}
                           totalRecords={totalCount}>
                    <Column field="deckCover" header="Cover" body={coverTemplate}
                            headerStyle={{width: '10w'}}></Column>
                    <Column field="name" header="Name" body={nameTemplate}
                            headerStyle={{width: '25vw'}} sortable={true}></Column>
                    <Column field="cardsCount" body={cardsCountTemplate} headerStyle={{width: '5vw'}}
                            header="Cards" sortable={true}></Column>
                    <Column field="updated" header="Last updated" body={updatedTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="user_name" header="Created by" body={userNameTemplate}
                            headerStyle={{width: '15vw'}} sortable={true}></Column>
                    <Column field="Actions" header="Actions" headerStyle={{width: '14vw'}}
                            body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default PacksTable