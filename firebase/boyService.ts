import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getFirebaseFirestoreDB } from ".";
import { nameRecommendation } from "@/types/nameRecommendation";

const COLLECTION = "yakshu-app/sonNameRecommendation/names";

export const addBoyRecommendation = async (
  name: string,
  givenBy: string
): Promise<void> => {
  const db = await getFirebaseFirestoreDB();
  const q = query(collection(db, COLLECTION), where("name", "==", name));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await setDoc(doc(db, COLLECTION, name), { name, givenBy, voteCount: 1 });
  } else {
    const existing = snapshot.docs[0].data() as nameRecommendation;
    await setDoc(doc(db, COLLECTION, name), {
      name: existing.name,
      givenBy: existing.givenBy,
      voteCount: existing.voteCount + 1,
    });
  }
};

export const updateBoyVoteCount = async (
  name: string,
  voteCount: number
): Promise<void> => {
  const db = await getFirebaseFirestoreDB();
  await updateDoc(doc(db, COLLECTION, name), { voteCount });
};

export const listenBoyRecommendations = (
  callback: (names: nameRecommendation[]) => void
): (() => void) => {
  let unsubscribeSnapshot: (() => void) | null = null;

  getFirebaseFirestoreDB().then((db) => {
    const q = query(collection(db, COLLECTION), where("voteCount", ">", 0));
    unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const names = snapshot.docs.map((d) => d.data()) as nameRecommendation[];
      names.sort((a, b) => b.voteCount - a.voteCount);
      callback(names);
    });
  });

  return () => {
    if (unsubscribeSnapshot) unsubscribeSnapshot();
  };
};
