import React, {useEffect, useState} from 'react';
import cl from "../../styles/Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {addPackTC, getPacksTC} from "../../main/bll/packsReducer";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH, PROFILE_PATH} from "../../main/ui/Routing";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import Loader from "../../utils/Loader";
import UploadFileWithBase64 from "../../utils/UploadFileWithBase64";
import noCover from "../../assets/No_Cover.png";
import {Status} from "../../main/bll/appReducer";

const Packs: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const params = useAppSelector(state => state.packs.getPacksParams)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const isAuth = useAppSelector(state => state.login.isAuth)

    const [newPackName, setNewPackName] = useState("")
    const [deckCover, setDeckCover] = useState(noCover)

    useEffect(() => {
        if (!isAuth) {
            navigate(LOGIN_PATH)
        }
        dispatch(getPacksTC({params}))
    }, [params.packName, params.max, params.min, params.user_id])

    const createPack = () => {
        if (newPackName)
            dispatch(addPackTC({data: {cardsPack: {name: newPackName, deckCover}}}))
        setNewPackName("")
        setDeckCover("")
    }

    return (
        <>
            {isLoading === Status.LOADING && <Loader/>}
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PROFILE_PATH)}
                >Back to profile</Button>
                <div className={cl.title}>Pack list</div>
                <Modal callback={createPack}
                       titleBtn={"Add new pack"}
                       title={"Add new pack"}
                       icon={"pi pi-plus-circle"}
                       className={""}
                       disabled={isLoading === Status.LOADING}>

                    <form>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            {deckCover && <img style={{maxWidth: "200px", maxHeight: "200px"}}
                                               src={deckCover}
                                               alt={"cover"}/>}
                        </div>
                        <label htmlFor="deckCover">Select cover</label>
                        <UploadFileWithBase64 cb={setDeckCover}/>
                        <label htmlFor="name pack">Name pack</label>
                        <InputText style={{width: "95%"}}
                                   id="name pack"
                                   value={newPackName}
                                   onChange={(e) => setNewPackName(e.target.value)}/>
                    </form>
                </Modal>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs