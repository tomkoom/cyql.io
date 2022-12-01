import React from "react";

// firestore
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { projectsCollRef } from "@firestore/firestore-collections";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals";

// components
import { Active, NotActive } from "./index";

const UpvtBtn = ({ idx, upvotedBy }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, principalIdStr: p } = useAuth();

  const upvote = async (idx, p) => {
    const docRef = doc(projectsCollRef, idx);
    await updateDoc(docRef, {
      upvotedBy: arrayUnion(p),
    });
  };

  const unUpvote = async (idx, p) => {
    const docRef = doc(projectsCollRef, idx);
    await updateDoc(docRef, {
      upvotedBy: arrayRemove(p),
    });
  };

  const check = (p) => {
    return upvotedBy.length > 0 && upvotedBy.includes(p);
  };

  return isAuthenticated ? (
    check(p) ? (
      <Active num={upvotedBy.length} click={() => unUpvote(idx, p)} />
    ) : (
      <NotActive num={upvotedBy.length} click={() => upvote(idx, p)} />
    )
  ) : (
    <NotActive num={upvotedBy.length} click={() => dispatch(setSignInModal(true))} />
  );
};

export default UpvtBtn;
