import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null,
        searchType: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    searchType: "Home"
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    searchType: "Home"
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    searchType: null
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user:null,
                    loggedIn:false,
                    error: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    
    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }    
        }
        catch(err) {
            console.error(err);
        }        
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err) {
            authReducer({
                type: AuthActionType.ERROR,
                payload: {
                    errorMessage: err.response.data.errorMessage
                }
            });
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            console.log("userData.username");
            const response = await api.loginUser(userData);

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err) {
            //console.log(err.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR,
                payload: {
                    errorMessage: err.response.data.errorMessage
                }
            });
        }
    }

    auth.clearError = async function() {
        authReducer({
            type: AuthActionType.ERROR,
            payload: {
                errorMessage: null
            }
        });
    }

    auth.logoutUser = async function(userData, store) {
        //const response = await api.logoutUser(userData);

        //if (response.status === 200) {
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {
                user: null
            }
        });
        history.push("/");
        //}
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };