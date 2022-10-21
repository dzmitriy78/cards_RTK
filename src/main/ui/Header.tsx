import React, {useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import {FORGOT_PATH, LOGIN_PATH, PACKS_PATH, PROFILE_PATH, REGISTER_PATH} from "./Routing"
import cl from "../../styles/Header.module.scss"
import {logoutTC} from "../bll/loginReducer"
import {useDispatch} from "react-redux"
import {DispatchType, useAppSelector} from "../bll/store"
import {Button} from "primereact/button"


const Header: React.FC = () => {

    const isAuth = useAppSelector((state) => state.login.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()

    const [show, setShow] = useState(false)
    const setActive = ({isActive}: { isActive: boolean }): string => isActive ? cl.active : cl.item

    const loginHandler = () => {
        navigate(LOGIN_PATH)
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
        navigate(LOGIN_PATH)
    }

    return (
        <div className={cl.header}>
            <Button icon="pi pi-eye"
                    className={cl.btn}
                    onClick={() => setShow(!show)}>
                {show ? 'hide' : 'show'}
            </Button>

            {show && <NavLink className={setActive} to={LOGIN_PATH}>login</NavLink>}
            {show && <NavLink className={setActive} to={REGISTER_PATH}>register</NavLink>}
            {show && <NavLink className={setActive} to={FORGOT_PATH}>forgot</NavLink>}
            {show && <NavLink className={setActive} to={PROFILE_PATH}>profile</NavLink>}
            {show && <NavLink className={setActive} to={PACKS_PATH}>packs</NavLink>}
            {isAuth
                ? <Button
                    icon="pi pi-sign-out"
                    className={cl.btn}
                    onClick={logoutHandler}>Sign out
                </Button>
                : <Button
                    icon="pi pi-sign-in"
                    className={cl.btn}
                    onClick={loginHandler}>Sign in
                </Button>}
        </div>
    )
}

export default Header