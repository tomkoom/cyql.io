import React from "react";
import css from "./UpvtBtn.module.css";

// toast
import { toast } from "react-toastify";

// auth
import { useAuth } from "../../../Context/AuthContext";

// icons
import { iCaretUp } from "../../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";
import { selectVerified } from "../../../State/profile";

// firestore
import { projectsColRef } from "../../../../../../firebase/firestore-collections";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const UpvoteBtn = ({ upvotedBy, isActive, onClick }) => {
  return (
    <button className={`${css.upvtBtn} ${isActive ? css.activeBtn : ""}`} onClick={onClick}>
      <span className={`${css.icon} ${isActive ? css.activeIcon : ""}`}>{iCaretUp}</span>
      <p className={css.num}>{isActive ? upvotedBy.length : upvotedBy ? upvotedBy.length : "0"}</p>
    </button>
  );
};

const UpvtBtn = ({ idx, upvotedBy }) => {
  const dispatch = useDispatch();
  const { principalIdStr: pIdStr } = useAuth();
  const isVerified = useSelector(selectVerified);

  // toast
  const notify = () =>
    toast(
      "Upvoting is currently available only through Plug sign-in. Also to upvote your wallet balance should be >= 10 ICP. Stoic support coming shortly."
    );

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

  // const upvote = async (projectIdx, principalIdStr) => {
  //   if (isVerified) {
  //     const docRef = doc(projectsColRef, projectIdx);
  //     await updateDoc(docRef, {
  //       upvotedBy: arrayUnion(principalIdStr),
  //     });
  //   } else {
  //     notify();
  //   }
  // };

  // const unUpvote = async (projectIdx, principalIdStr) => {
  //   if (isVerified) {
  //     const docRef = doc(projectsColRef, projectIdx);
  //     await updateDoc(docRef, {
  //       upvotedBy: arrayRemove(principalIdStr),
  //     });
  //   } else {
  //     notify();
  //   }
  // };

  return (
    <div>
      {pIdStr ? (
        upvotedBy && upvotedBy.includes(pIdStr) ? (
          <UpvoteBtn upvotedBy={upvotedBy} isActive={true} onClick={() => unUpvote(idx, pIdStr)} /> // upvoted
        ) : (
          <UpvoteBtn upvotedBy={upvotedBy} isActive={false} onClick={() => upvote(idx, pIdStr)} />
        )
      ) : (
        <UpvoteBtn
          upvotedBy={upvotedBy}
          isActive={false}
          onClick={() => dispatch(setSignInModal(true))}
        />
      )}
    </div>
  );
};

export default UpvtBtn;
