import React from "react";

// firestore
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { pColRef } from "@firestore/firestore-collections";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

// components
import { Active, NotActive } from "./index";

const UpvtBtn = ({ id, upvotedBy }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, principalIdStr: p } = useAuth();

  const upvote = async (id, p) => {
    const docRef = doc(pColRef, id);
    await updateDoc(docRef, {
      upvotedBy: arrayUnion(p),
    });
  };

  const unUpvote = async (id, p) => {
    const docRef = doc(pColRef, id);
    await updateDoc(docRef, {
      upvotedBy: arrayRemove(p),
    });
  };

  const check = (p) => {
    return upvotedBy && upvotedBy.length > 0 && upvotedBy.includes(p);
  };

  const num = upvotedBy ? upvotedBy.length : "0";

  return isAuthenticated ? (
    check(p) ? (
      <Active num={num} click={() => unUpvote(id, p)} />
    ) : (
      <NotActive num={num} click={() => upvote(id, p)} />
    )
  ) : (
    <NotActive num={num} click={() => dispatch(setSignInModal(true))} />
  );
};

export default UpvtBtn;
