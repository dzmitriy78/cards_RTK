import React, {useEffect, useState} from 'react';
import {SelectButton} from 'primereact/selectbutton';
import {SelectItemOptionsType} from "primereact/selectitem";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../main/bll/store";
import {setPacksParams} from "../main/bll/packsReducer";
import {GetPacksParamsType} from "../main/dal/packsAPI";
import {RequestLoadingType} from "../main/bll/appReducer";

const SelectButt = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)

    const firstValue = myId === userId ? "My" : "All"
    const [value, setValue] = useState<string>(firstValue)
    const options: SelectItemOptionsType = ['My', 'All']

    const myParams = {...params, user_id: myId}
    const allParams = {...params, user_id: ""}

    useEffect(() => {
        if (value === "My")
            dispatch(setPacksParams({data: myParams}))
        if (value === "All")
            dispatch(setPacksParams({data: allParams}))
    }, [value])

    return (
        <div>
            <div className="card">
                <SelectButton value={value} disabled={isLoading === "loading"} options={options}
                              onChange={(e: { value: string }) => setValue(e.value)}/>
            </div>
        </div>
    )
}

export default SelectButt;