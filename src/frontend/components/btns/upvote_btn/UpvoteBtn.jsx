import React from "react";

// auth
import { useAuth } from "@/context/AuthContext";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";

// components
import { Active, NotActive } from "./index";

const UpvoteBtn = ({ id, upvotedBy, location }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

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

  const check = (userId) => {
    return upvotedBy && upvotedBy.length > 0 && upvotedBy.includes(userId);
  };

  const num = upvotedBy ? upvotedBy.length : "0";

  return userId !== "" ? (
    check(userId) ? (
      <Active num={num} location={location} click={() => unUpvote(id, userId)} />
    ) : (
      <NotActive num={num} location={location} click={() => upvote(id, userId)} />
    )
  ) : (
    <NotActive num={num} click={() => dispatch(setSignInModal(true))} />
  );
};

export default UpvoteBtn;
