import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk"
import {loginReducer} from "./loginReducer";
import {forgotReducer} from "./forgotReducer";
import {profileReducer} from "./profileReducer";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {registerReducer} from "./registerReducer";
import {setNewPasswordReducer} from "./setNewPasswordReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    setNewPassword: setNewPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export default store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
