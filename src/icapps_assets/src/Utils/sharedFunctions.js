// shared functions

// firestore
import { projectsColRef } from "../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const upvote = async (projectIdx) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayUnion(user.uid),
  });
};

const cancelUpvote = async (projectIdx) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayRemove(user.uid),
  });
};

export { upvote, cancelUpvote };