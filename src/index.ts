import express, { response } from "express";
import admin from "firebase-admin";

const app = express();

var serviceAccount = "serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/historys", (req, res) => {
  try {
    admin
      .firestore()
      .collection("history")
      .get()
      .then((snapshot) => {
        const history = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        res.json(history);
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
