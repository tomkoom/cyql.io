// upvotes

// firestore
import { projectsColRef } from "../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const upvote = async (projectIdx, principalIdStr) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayUnion(principalIdStr),
  });
};

const unUpvote = async (projectIdx, principalIdStr) => {
  const docRef = doc(projectsColRef, projectIdx);
  await updateDoc(docRef, {
    upvotedBy: arrayRemove(principalIdStr),
  });
};

export { upvote, unUpvote };
