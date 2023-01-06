import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export const useUpdateScore = () => {
  const updateScore = async (newScore, userDisplayName) => {
    try {
      const playerRef = doc(db, "players", userDisplayName);
      await updateDoc(playerRef, { score: newScore });
      console.log("FIREBASE score updated" + newScore);
    } catch (err) {
      console.log(err);
    }
  };
  return { updateScore };
};
