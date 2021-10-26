import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSessions from 'expo-auth-session'
import { api } from '../services/api'

const CLIENT_ID = '684c4434db91d4cf0cc1'
const SCOPE = 'read:user'
const USER_STORAGE = '@mobile:user'
const TOKEN_STORAGE = '@mobile:token'

type User = {
    id: string
    avatar_url: string
    name: string
    login: string
}

type AuthContextData = {
    user: User | null
    isSigningIn: boolean
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthResponse = {
    token: string
    user: User
}

type AuthorizationResponse = {
    params: {
        code?: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [isSigningIn, setIsSigningIn] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    async function signIn() {
        try {
            setIsSigningIn(true)
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

            const { params } = (await AuthSessions.startAsync({
                authUrl,
            })) as AuthorizationResponse

            if (params && params.code) {
                const authResponse = await api.post('/authenticate', {
                    code: params.code,
                })

                const { user, token } = authResponse.data as AuthResponse

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
                await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))

                setUser(user)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSigningIn(false)
        }
    }

    async function signOut() {}

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE)
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

            if (userStorage && tokenStorage) {
                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${tokenStorage}`
                setUser(JSON.parse(userStorage))
            }
            setIsSigningIn(false)
        }
        loadUserStorageData()
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, isSigningIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
