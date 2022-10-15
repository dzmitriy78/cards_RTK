import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {loginReducer} from "./loginReducer";
import {forgotReducer} from "./forgotReducer";
import {profileReducer} from "./profileReducer";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import cardsReducer from "./cardsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {registerReducer} from "./registerReducer";
import {setNewPasswordReducer} from "./setNewPasswordReducer";

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

export type RootReducerType = typeof rootReducer
export type AppStoreType = ReturnType<RootReducerType>

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, any>
export type DispatchType = ThunkDispatch<AppStoreType, unknown, AnyAction>