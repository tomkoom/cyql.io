import React from "react";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

// components
import { Active, NotActive } from "./index";

const UpvoteBtn = ({ id, upvotedBy, location }) => {
  const dispatch = useDispatch();
  const { userKey } = useAuth();

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

  const check = (userKey) => {
    return upvotedBy && upvotedBy.length > 0 && upvotedBy.includes(userKey);
  };

  const num = upvotedBy ? upvotedBy.length : "0";

  return userKey !== "" ? (
    check(userKey) ? (
      <Active num={num} location={location} click={() => unUpvote(id, userKey)} />
    ) : (
      <NotActive num={num} location={location} click={() => upvote(id, userKey)} />
    )
  ) : (
    <NotActive num={num} click={() => dispatch(setSignInModal(true))} />
  );
};

export default UpvoteBtn;
