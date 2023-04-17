import React, { createContext, useEffect, useState } from "react";

import firebase from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setloadingAuth] = useState(false);

    useEffect(() => {
        const loadStorage = async () => {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            };
            setLoading(false);
        };
        loadStorage();
    }, []);



    const signIn = async (email, password) => {
        setloadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setloadingAuth(false);
            });
        })
        .catch((error)=> {
            alert(error.code);
            setloadingAuth(false);
        });
    };


    const signUp = async (email, password, nome) => {
        setloadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (v) => {
            let uid = v.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: v.user.email,
                };
                setUser(data);
                storageUser(data);
                setloadingAuth(false);
            });
        })
        .catch((error)=> {
            alert(error.code);
            setloadingAuth(false);
        });
    };

    const signOut = async () => {
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        });
    };

    const storageUser = async (data) => {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    };

    return (
        <AuthContext.Provider value={{ signed: !!user , user, signUp, signIn, loading, signOut, loadingAuth }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;