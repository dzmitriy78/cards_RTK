import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {LOGIN_PATH, REGISTER_PATH} from "../../main/ui/Routing";
import {NavLink} from "react-router-dom";
import {updateUserTC} from "../../main/bll/profileReducer";
import Loader from "../../utils/Loader";
import {setIsLoadingAC, Status} from "../../main/bll/appReducer";
import cl from "./../../styles/Profile.module.scss"
import moment from "moment";
import {InputText} from "primereact/inputtext";
import defaultAva from "../../assets/user.png"
import Message from "../../main/ui/Messages";
import UploadFileWithBase64 from "../../utils/UploadFileWithBase64";
import {Button} from "primereact/button";


const Profile: React.FC = () => {
    const isAuth = useAppSelector((state) => state.login.isAuth)
    const userData = useAppSelector((state) => state.login.userData)
    const isLoading = useAppSelector((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()

    const [editName, setEditName] = useState(false)
    const [editAva, setEditAva] = useState(false)
    const [newName, setNewName] = useState<string>(userData.name)
    const [ava, setAva] = useState<string>(userData.avatar)

    const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewName(e.currentTarget.value)
    }
    const setUpdateUser = () => {
        setEditName(false)
        if (newName && newName !== userData.name)
            dispatch(updateUserTC({name: newName, avatar: ""}))
    }

    const dispatchHandler = (file64: string) => {
        dispatch(updateUserTC({name: "", avatar: file64}))
        setEditAva(false)
    }

    const errorImgHandler = () => {
        dispatch(setIsLoadingAC({isLoading: Status.ERROR}))
        setAva(defaultAva)
    }

    return (
        <>
            {ava === defaultAva && <Message message={'Image is corrupted, choose another'}/>}
            {isLoading === Status.LOADING && <Loader/>}
            {isAuth
                ? <div className={cl.rootProfile}>
                    <div>
                        <img className={cl.avatar}
                             onError={errorImgHandler}
                             src={ava}
                             alt={"avatar"}/>
                        <Button icon={"pi pi-pencil"}
                                title={"change avatar"}
                                style={{marginLeft: 10, maxWidth: 27, maxHeight: 27}}
                                className="p-button-rounded p-button-outlined"
                                onClick={() => setEditAva(!editAva)}/>
                        {editAva && <UploadFileWithBase64 dispatch={dispatchHandler}
                                                          cb={setAva}/>}
                    </div>
                    <div className={cl.profile}
                         title={"double click to edit"}
                         onBlur={setUpdateUser}>
                        <div className={cl.name}
                             onDoubleClick={() => setEditName(true)}>
                            {userData.name}
                        </div>
                        <div>
                            {editName && <InputText placeholder={"enter new name"}
                                                    autoFocus={true}
                                                    onChange={changeName}
                                                    defaultValue={userData.name}
                            />}
                        </div>
                        <span>E-mail: </span>
                        <div className={cl.value}>{userData.email}</div>
                        <span>Created: </span>
                        <div className={cl.value}>
                            {moment(userData.created).format("DD.MM.YYYY  HH:mm")}
                        </div>
                        <span>Packs count: </span>
                        <div className={cl.value}>{userData.publicCardPacksCount}</div>
                    </div>
                </div>
                : <div className={cl.description}>Profile is empty.<br/> <span>Please </span>
                    <NavLink to={LOGIN_PATH}>Log in</NavLink> <span>or </span>
                    <NavLink to={REGISTER_PATH}>Register</NavLink>
                </div>
            }
        </>)
}

export default Profile