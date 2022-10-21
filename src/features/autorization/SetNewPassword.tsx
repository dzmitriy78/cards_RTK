import React from 'react';
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {useFormik} from "formik";
import cl from "../../styles/Login.module.scss";
import {setNewPasswordTC} from "../../main/bll/setNewPasswordReducer";
import Loader from "../../utils/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_PATH} from "../../main/ui/Routing";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Status} from "../../main/bll/appReducer";

const SetNewPassword: React.FC = () => {
    const info = useAppSelector(state => state.setNewPassword.info)
    const isLoading = useAppSelector((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const {token} = useParams()
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.password.length < 7) {
                errors.password = 'password is short';
            }
            return errors;
        },
        initialValues: {
            password: '',
            resetPasswordToken: token as string
        },
        onSubmit: (values) => {
            dispatch(setNewPasswordTC({password: values.password, token: values.resetPasswordToken}))
            formik.resetForm()
        }
    })
    if (info) setTimeout(() => {
        navigate(LOGIN_PATH)
    }, 4000)

    return <>
        {isLoading === Status.LOADING && <Loader/>}
        <div className={cl.description}>To restore access, enter a new password</div>
        <form className={cl.form} onSubmit={formik.handleSubmit}>
            <label className={cl.description}>Password:</label>
            <Password className={cl.input}
                      toggleMask
                      {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <InputText className={cl.input}
                       type={"hidden"}
                       {...formik.getFieldProps("resetPasswordToken")}
            />
            <Button type={'submit'} className={cl.button} disabled={isLoading === Status.LOADING}>Send</Button>
        </form>
    </>
}

export default SetNewPassword;

type FormikErrorType = {
    password?: string
}