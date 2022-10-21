import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../features/autorization/Login";
import Register from "../../features/autorization/Register";
import Forgot from "../../features/autorization/Forgot";
import SetNewPassword from "../../features/autorization/SetNewPassword";
import Profile from "../../features/autorization/Profile";
import Packs from "../../features/packs/Packs";
import Cards from "../../features/cards/Cards";
import LearnPage from "../../features/learn/Learn";

export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const FORGOT_PATH = '/forgot'
export const NEW_PASSWORD_PATH = '/setNewPassword/:token'
export const PROFILE_PATH = '/profile'
export const PACKS_PATH = '/packs'
export const CARDS_PATH = '/cards'
export const LEARN_PATH = '/learn'

const Routing: React.FC = () => {

    return (
            <Routes>
                <Route path={'/'} element={<Navigate to={LOGIN_PATH}/>}/>
                <Route path={LOGIN_PATH} element={<Login/>}/>
                <Route path={REGISTER_PATH} element={<Register/>}/>
                <Route path={FORGOT_PATH} element={<Forgot/>}/>
                <Route path={NEW_PASSWORD_PATH} element={<SetNewPassword/>}/>
                <Route path={PROFILE_PATH} element={<Profile/>}/>
                <Route path={PACKS_PATH} element={<Packs/>}/>
                <Route path={CARDS_PATH} element={<Cards/>}/>
                <Route path={LEARN_PATH} element={<LearnPage/>}/>
                <Route path="*" element={
                    <div style={{fontSize: 100, color: "teal"}}>
                        Упс! Страница не найдена!
                    </div>}/>
            </Routes>
    )
}

export default Routing;