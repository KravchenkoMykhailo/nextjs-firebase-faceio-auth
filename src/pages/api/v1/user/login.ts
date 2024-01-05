import { withNextCorsSessionRoute } from "../../../../withSession";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";

// $curl -X POST -H 'Content-Type: application/json' -d '{"facialId":"test"}'  http://localhost:3000/api/v1/user/login
export default withNextCorsSessionRoute(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("");
    return;
  }

  const { facialId } = req.body;
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("facialId", "==", facialId));
  getDocs(q).then(async (querySnapshot) => {
    if (!querySnapshot.empty) {
      console.log("User found:", querySnapshot.docs[0].data());
      const user = { facialId, ...querySnapshot.docs[0].data() };
      req.session.user = user;
      await req.session.save();

      res.json({
        user,
      });
    } else {
      res.status(400).send({
        error: "Sign Up first",
      });
    }
  });
});
