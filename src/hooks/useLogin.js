import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState, useEffect } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response) {
        throw new Error("Could not complete auth");
      }

      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
        console.log("Here :" + isCancelled);
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

  return { login, error, isPending };
};
