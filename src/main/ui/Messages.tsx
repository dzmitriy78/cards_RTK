import React, {useEffect, useRef} from 'react';
import {Toast} from "primereact/toast";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../bll/store";
import {setError, Status} from "../bll/appReducer";

const Message: React.FC<{message: string}> = ({message}) => {

    const isLoading = useAppSelector(state => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
    const mes: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        if (isLoading === Status.ERROR)
            mes.current.show(
                {life: 4000, severity: 'error', summary: 'Error: ', detail: `${message}`})
        setTimeout(() => dispatch(setError({error: null})), 2000)
        if (isLoading === Status.SUCCESS)
            mes.current.show(
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