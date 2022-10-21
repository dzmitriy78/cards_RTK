import React from 'react';
import {DispatchType, useAppSelector} from "../../main/bll/store";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import cl from "../../styles/Login.module.scss";
import {registerTC} from "../../main/bll/registerReducer";
import Loader from "../../utils/Loader";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import {Status} from "../../main/bll/appReducer";

const Register: React.FC = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const isLoading = useAppSelector((state) => state.app.isLoading)

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
            password: ''
        },
        onSubmit: (values) => {
            dispatch(registerTC({data: values}))
            navigate("/profile")
        }
    })

    return <div>
        {isLoading === Status.LOADING && <Loader/>}
        <div className={cl.description}>To register, enter your e-mail
            <br/>and create a password <br/>(at least 7 characters)
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
            <Button type={'submit'} className={cl.button} disabled={isLoading === Status.LOADING}>Register</Button>
        </form>
    </div>
}

export default Register;

type FormikErrorType = {
    email?: string
    password?: string
}