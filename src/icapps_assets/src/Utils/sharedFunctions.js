// shared functions

// firestore
import { projectsColRef } from "../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const upvote = async (projectIdx, userUid) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayUnion(userUid),
  });
};

const cancelUpvote = async (projectIdx, userUid) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayRemove(userUid),
  });
};

export { upvote, cancelUpvote };
