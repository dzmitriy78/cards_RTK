import React, {useEffect, useState} from 'react';
import {SelectButton} from 'primereact/selectbutton';
import {SelectItemOptionsType} from "primereact/selectitem";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../main/bll/store";
import {setPacksParams} from "../main/bll/packsReducer";

const SelectButt = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useAppSelector(state => state.packs.getPacksParams)
    const myId = useAppSelector(state => state.login.userData._id)
    const userId = useAppSelector(state => state.packs.getPacksParams.user_id)
    const isLoading = useAppSelector(state => state.app.isLoading)

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