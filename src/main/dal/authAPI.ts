import axios, {AxiosResponse} from "axios"

const settings = {
    withCredentials: true
}
export const backendUrl = {
    local: 'http://localhost:7542/2.0/',
    heroku: 'https://neko-back.herokuapp.com/2.0/'
}
export const instance = axios.create({
    baseURL: backendUrl.heroku,
    ...settings
})

export const authAPI = {
    me() {
        return instance.post<LoginResponseType>('auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>('auth/login', data)
    },
    logout() {
        return instance.delete<AxiosResponse<{ info: string }>>('auth/me')
    }
}

export const registerAPI = {
    register(data: RegisterParamsType) {
        return instance.post<RegisterParamsType, AxiosResponse<RegisterResponseType>>("auth/register", data)

    },
    updateUser(name: string, avatar: string) {
        return instance.put<UpdatedUserType>('auth/me', {name, avatar})
    },
    forgot(email: string) {
        return instance.post<ForgotResponseType>("auth/forgot", {
            email, from: "test", message: `<div style="background-color: lime; padding: 15px"> 
            password recovery link:<a href='http://localhost:3000/setNewPassword/$token$'>link</a></div>`
        })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPasswordResponseType>("auth/set-new-password", {password, resetPasswordToken})
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type LoginResponseType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
    error?: string
    in?: string
}
type RegisterResponseType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
    }
}
export type UserDataType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}
export type UpdatedUserType = {
    updatedUser: UserDataType
    token: string
    tokenDeathTime: number
}
type ForgotResponseType = {
    info: string
    error: string
}
type SetNewPasswordResponseType = {
    info: string
    error: string
}