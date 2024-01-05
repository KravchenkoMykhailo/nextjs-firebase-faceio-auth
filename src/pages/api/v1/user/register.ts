import { withNextCorsSessionRoute } from "../../../../withSession";
import validateUser, { UserValidationResult } from "../../../../validateUser";
import { CreateUserRequest } from "../../../../../schemas/user";
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
import { db } from "../../../../../firebase/firebase";

export default withNextCorsSessionRoute(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send(""); // Incorrect request method
    return;
  }

  const { facialId, name, email } = req.body as CreateUserRequest;

  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("facialId", "==", facialId));
  getDocs(q).then(async (querySnapshot) => {
    if (!querySnapshot.empty) {
      console.log("User found:", querySnapshot.docs[0].data());
      res.status(400).send(UserValidationResult.TakenFacialId);
    } else {
      console.log("User not found");
      let userValidationResult = validateUser(name, email);
      if (userValidationResult === UserValidationResult.None) {
        const dbUserByEmail = query(
          usersCollection,
          where("email", "==", email)
        );
        getDocs(dbUserByEmail).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            userValidationResult = UserValidationResult.TakenEmail;
          }
        });
      }

      if (userValidationResult !== UserValidationResult.None) {
        res.status(400).send(userValidationResult);
        return;
      }

      const docRef = await addDoc(collection(db, "users"), {
        facialId: facialId,
        name: name,
        email: email,
        voteId: "",
      });
      console.log("user successfully added.");

      res.status(200).send(userValidationResult);
    }
  });
});
