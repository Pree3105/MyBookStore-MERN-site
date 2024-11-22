import {createContext, useContext, useEffect, useState } from "react";
import {auth } from "../firebase/firebase.config";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext =  createContext();  //create cntext

//to check if user is avaialble on context or not
export const useAuth = () => {
    return useContext(AuthContext)  //using the context alreaady created
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); //to check if user is avaialble (default-null)
    const [loading, setLoading] = useState(true);  //check if loading or not

    // registering a new user
    const registerUser = async (email,password) => {   //the async func will get recieve email & pwd, format in firebase documentation-> authentication
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sing up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if(user) {
                const {email, displayName,photoURL} = user;  
                const userData = {   //creating an object
                    email, username: displayName, photo: photoURL
                } 
            }
        })
        return () => unsubscribe();
    }, [])


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>  
            {children}
        </AuthContext.Provider>
    )
}