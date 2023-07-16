import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseFirestoreDB } from ".";
import { nameRecommendation } from "@/types/nameRecommendation";

// export const getRecommendations = async () => {
//   const db = await getFirebaseFirestoreDB();
//   const q = query(collection(db, "yakshu-app/nameRecommendation/names"));
//   const querySnapShot = await getDocs(q);
//   if (querySnapShot.empty) {
//     console.log("empty response");
//     return [] as nameRecommendation[];
//   }
//   const nameRecommendations = querySnapShot.docs.map((doc) =>
//     doc.data()
//   ) as nameRecommendation[];
//   console.log("response", nameRecommendations);
//   return nameRecommendations;
// };

export const addRecommendations = async (name: string, givenBy: string) => {
  const db = await getFirebaseFirestoreDB();
  const constraints = [where("name", "==", name)];
  const q = query(
    collection(db, "yakshu-app/nameRecommendation/names"),
    ...constraints
  );
  const querySnapShot = await getDocs(q);
  if (querySnapShot.empty) {
    // add new doc
    setDoc(doc(db, "yakshu-app/nameRecommendation/names", name), {
      name,
      givenBy,
      voteCount: 1,
    });
    return { isSuccess: true, message: "Recommended name saved successfully" };
  } else {
    const [nameRecommendations] = querySnapShot.docs.map((doc) =>
      doc.data()
    ) as nameRecommendation[];
    setDoc(doc(db, "yakshu-app/nameRecommendation/names", name), {
      name: nameRecommendations.name,
      givenBy: nameRecommendations.givenBy,
      voteCount: nameRecommendations.voteCount + 1,
    });
    return {
      isSuccess: true,
      message:
        "Your recommendation already exists, we have increased the likes of your suggested name ",
    };
  }
};

export const updateVoteCount = async (name: string, voteCount: number) => {
  const db = await getFirebaseFirestoreDB();

  const nameDocRef = doc(db, "yakshu-app/nameRecommendation/names", name);
  await updateDoc(nameDocRef, { voteCount });
};
