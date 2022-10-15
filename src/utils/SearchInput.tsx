import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../main/bll/store";
import {GetPacksParamsType} from "../main/dal/packsAPI";
import useDebounce from "../hooks/useDebounce";
import {setPacksParams} from "../main/bll/packsReducer";

const SearchInput: React.FC<any> = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const [value, setValue] = useState('');

    const debouncedValue = useDebounce<string>(value, 600)
    const searchParams = {...params, packName: value}

    useEffect(() => {
        dispatch(setPacksParams({data: searchParams}))
    }, [debouncedValue])

    return (
        <div>
            <div className="card">
              <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" value={value} onChange={(e) => setValue(e.target.value)}/>
                </span>
            </div>
        </div>
    )
}

export default SearchInput;