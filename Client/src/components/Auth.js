import React from 'react';
import { auth , firestore } from '../firebase/firebase';
import firebase from 'firebase/app';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Button from 'react-bootstrap/Button'

function Auth() {
    const [loggedIn, setLoggedIn] = useState("start");
    
    const onAuthChange = () => {
        if (auth.currentUser != null) {
            signOutUser();
        } else {
            signInUser();
            setLoggedIn("true");
        }
    }
    
    const signOutUser = () => {
        auth.signOut();
        setLoggedIn("false");
        console.log("logged out");
    }

    const setupUser = async () => {
        const { uid, email, photoURL, displayName } = auth.currentUser;
        await firestore.collection('users').doc(uid).set({
            uid,
            email,
            photoURL,
            displayName,
            skills: [],
            courses: [],
            organization: '',
            industry: '',
            gitHub: '',
            linkedIn: '',
            twitter: ''
        }, {merge: true}).then(function() {
        }).catch(function(error) {
            console.log("there was an error", error);
        });
    }

    const signInUser = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        const { uid } = auth.currentUser;
        await firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("returning user");
            } else {
                console.log("no such user");
                setupUser();
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
        console.log("signed in");
    }
  
    if (loggedIn === "start"){
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLoggedIn("true");
            } else {
                setLoggedIn("false");

            }
        });
    }

    if (loggedIn === "start") {
        return (
            <div className="spinner-grow">
            </div>
        );
    } else {
        return (
            <Button variant="light" onClick={(e) => {onAuthChange()}}><FcGoogle size={20} style={{paddingBottom: '3px'}}/> {loggedIn === "true" ? "Sign Out" : "Sign In With Google"}</Button>
        );
    }
}

export default Auth;