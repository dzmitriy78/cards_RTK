import React, {useState} from 'react';
import {Slider, SliderValueType} from 'primereact/slider';
import {setPacksParams} from "../main/bll/packsReducer";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../main/bll/store";
import useDebounce from "../hooks/useDebounce";
import "./../styles/App.css"
import {useUpdateEffect} from "ahooks/es";

const SliderFilter = () => {
    const dispatch = useDispatch<DispatchType>()
    const params = useAppSelector(state => state.packs.getPacksParams)
    const isLoading = useAppSelector(state => state.app.isLoading)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.minCardsCount)

    const [value, setValue] = useState<SliderValueType>([0, 110])


    const [first, second] = value as Array<number>
    const myParams = {...params, min: first, max: second}
    const debouncedValue = useDebounce<SliderValueType>(value, 600)

    useUpdateEffect(() => {
        dispatch(setPacksParams({data: myParams}))
    }, [debouncedValue, min, max])

    return (
        <div className="slider-demo">
            <div className="card">
                <div>Range: [{first}, {second}]</div>
                <Slider value={value} disabled={isLoading === "loading"}
                        onChange={(e) => setValue(e.value)} range/>
            </div>
        </div>
    )
}

export default SliderFilter;