import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
//collection, addDoc,
import { useState, useEffect } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // const docRef = await addDoc(collection(db, "players"), {
      //   displayName: displayName,
      //   score: 0,
      // });

      await setDoc(doc(db, "players", displayName), {
        displayName: displayName,
        score: 0,
      });

      if (!response) {
        throw new Error("Could not complete auth");
      }

      // if (!docRef) {
      //   throw new Error("Could not write to collection");
      // }

      //add displayName
      await updateProfile(auth.currentUser, { displayName: displayName });

      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
