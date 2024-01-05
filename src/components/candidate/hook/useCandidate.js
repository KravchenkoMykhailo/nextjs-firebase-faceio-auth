import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  addDoc,
  collection,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { candidateSchema } from "../schema/candidateSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { db } from "../../../../firebase/firebase";

export const useCandidate = () => {
  const params = useParams();
  const router = useRouter();
  const { Success, Warn } = useToastMessages();
  const [allCandidates, setAllCandidates] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState({});

  useEffect(() => {
    console.log(params);
    handleFetch();
  }, []);

  useEffect(() => {
    if (params.candidate) {
      handleFetchCandidate(params.candidate);
    } else {
      setCurrentCandidate({});
    }
  }, [params.candidate]);

  const initialValues = {
    imageUrl: "",
    name: "",
    party: "",
    file: null,
  };

  const handleDelete = async (id) => {
    try {
      deleteDoc(doc(db, "candidates", id));
      Success("Message  Successful Deleted :)");
      await handleFetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async () => {
    try {
      const candidateCollection = collection(db, "candidates");
      const candidateSnapshot = await getDocs(candidateCollection);
      let candidateList = [];
      candidateSnapshot.forEach((doc) => {
        candidateList.push({ ...doc.data(), id: doc.id });
      });
      console.log(candidateList);
      setAllCandidates(candidateList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchCandidate = async (candidateId) => {
    try {
      const docRef = doc(db, "candidates", candidateId);

      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        const data = querySnapshot.data();

        setCurrentCandidate(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { imageUrl, name, party } = values;

    console.log(values);
    try {
      const docRef = await addDoc(collection(db, "candidates"), {
        imageUrl: imageUrl,
        name: name,
        party: party,
      });

      Success("Candidate  Successful Delivered");
      handleFetch();
    } catch (error) {
      console.error(error);
      Warn("Something Wrong");
    }

    resetForm();
  };

  const getVotedCandidate = async (votedId) => {
    try {
      console.log("getting voted User");
      // Set the "capital" field of the city 'DC'
      const docRef = doc(db, "candidates", votedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        return docSnap.data();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    initialValues,
    schema: candidateSchema,
    handleSubmit,
    handleDelete,
    getVotedCandidate,
    allCandidates,
  };
};
