import {Dispatch} from "redux";
import {setError, setIsLoadingAC, Status} from "../main/bll/appReducer";

export const errorHandler = (e: any, dispatch: Dispatch) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
    console.log('Error: ' + {...e})
    dispatch(setError({error}))
    dispatch(setIsLoadingAC({isLoading: Status.ERROR}))
}