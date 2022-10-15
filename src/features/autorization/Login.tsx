import React from 'react';
import {useFormik} from "formik";
import cl from "../../styles/Login.module.scss"
import {loginTC} from "../../main/bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {FORGOT_PATH, REGISTER_PATH} from "../../main/Routing";
import Loader from "../../main/ui/Loader";
import Welcome from "../../main/ui/Welcome";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Password} from "primereact/password";

const Login = () => {

    const dispatch = useDispatch<DispatchType>()
    const isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 7) {
                errors.password = 'password is short';
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(loginTC({data: values}))
        }
    })

    return <>
        {isLoading === 'loading' && <Loader/>}
        {isAuth && <Welcome/>}
        {!isAuth &&
            <div>
                <div className={cl.description}>Please enter your e-mail and password or <br/>
                    <NavLink to={REGISTER_PATH}>Register</NavLink>
                </div>
                <form className={cl.form} onSubmit={formik.handleSubmit}>
                    <label className={cl.description}>E-mail:</label>
                    <InputText className={cl.input}
                               type={"email"}
                               {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email
                        ? <div style={{color: "red"}}>{formik.errors.email}</div>
                        : null}
                    <label className={cl.description}>Password:</label>
                    <Password className={cl.input}
                              toggleMask
                              {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <div style={{color: "red"}}>{formik.errors.password}</div>
                        : null}
                    <label className={cl.description}> Remember me </label>
                    <Checkbox inputId="binary"
                              type={"checkbox"}
                              {...formik.getFieldProps("rememberMe")}
                              checked={formik.values.rememberMe}
                    />
                    <Button type={'submit'} className={cl.button} disabled={isLoading === 'loading'}>Sign in</Button>
                </form>
                <div className={cl.description}>Forgot your password? <br/>
                    <NavLink to={FORGOT_PATH}>Restore password</NavLink>
                </div>
            </div>
        }
    </>
}

export default Login;

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}