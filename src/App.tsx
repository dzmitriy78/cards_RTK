import React, {useEffect} from 'react';
import './styles/App.css';
import Main from "./main/Main";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "./main/bll/store";
import Loader from "./main/ui/Loader";
import {initializeAppTC} from "./main/bll/appReducer";
import Message from "./main/ui/Messages";

const App: React.FC = () => {
    const dispatch = useDispatch<DispatchType>()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const error = useAppSelector((state) => state.app.error)
    const email = useAppSelector(state => state.register.email)
    const info = useAppSelector(state => state.setNewPassword.info)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized)
        return (
            <div>
                Loading...
                <Loader/>
            </div>)

    return (
        <div className="App">
            <Main/>
            {error && <Message message={error}/>}
            {email && <Message message={email}/>}
            {info && <Message message={info}/>}
        </div>
    );
}

export default App;
