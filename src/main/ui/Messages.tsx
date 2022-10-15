import React, {useEffect, useRef} from 'react';
import {Toast} from "primereact/toast";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../bll/store";
import {RequestLoadingType, setError} from "../bll/appReducer";

const Message: React.FC<MessagesPropsType> = ({message}) => {

    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
    const mes: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        if (isLoading === "failed")
            mes.current.show(
                {life: 4000, severity: 'error', summary: 'Error: ', detail: `${message}`})
        setTimeout(() => dispatch(setError({error: null})), 2000)
        if (isLoading === "succeeded")
            mes.current?.show(
                {life: 4000, severity: 'success', summary: 'Success: ', detail: `${message}`})
    }, [])

    return (
        <div>
            <div className="card">
                <Toast ref={mes} position="bottom-right"/>
            </div>
        </div>
    )
}

export default Message

type MessagesPropsType = {
    message: string
}