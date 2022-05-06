// shared functions

// firestore
import { projectsColRef } from "../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// state
import {
  setProjectModal,
  setClearProject,
  setMode,
} from "../State/projectModal";

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

// modal

const closeModal = () => {
  dispatch(setMode(""));
  dispatch(setClearProject());
  dispatch(setProjectModal(false));
};


export { upvote, cancelUpvote, closeModal };