import { useEffect, useState } from "react";
import {
  collection,
  query,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { useToastMessages } from "@/components/message/useToastMessages";
import { db } from "../../../../firebase/firebase";

export const useUsers = () => {
  const { Success, Warn } = useToastMessages();
  const [allUsers, setAllusers] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      deleteDoc(doc(db, "users", id));
      Success("User Successful Deleted.");
      await handleFetch();
    } catch (error) {
      console.error(error);
      Warn("User Delete Faild.)");
    }
  };

  const handleFetch = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setAllusers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVoteId = async (user, voteId) => {
    try {
      console.log("updating voteid");
      // Set the "capital" field of the city 'DC'
      const usersCollection = collection(db, "users");
      const votedUserQuery = query(
        usersCollection,
        where("email", "==", user.email)
      );

      const querySnapshot = await getDocs(votedUserQuery);
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          voteId: voteId,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleDelete,
    allUsers,
    handleUpdateVoteId,
  };
};
