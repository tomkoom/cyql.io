import React from "react";
import css from "./Profiles.module.css";

// utils
import { formatId } from "../../../Utils/format";
import { formatDate } from "../../../Utils/format";

// state
import { useSelector } from "react-redux";
import { selectProfiles } from "../../../State/profiles/profiles";

const Profiles = () => {
  const profiles = useSelector(selectProfiles);
  const profilesCopy = [...profiles];

  const sort = (a, b) => {
    return b.firstSignIn - a.firstSignIn;
  };

  return (
    <table className={css.profiles}>
      <thead>
        <tr>
          <th>id</th>
          <th>account id</th>
          <th>sign in method</th>
          <th>first sign in</th>
          <th>last visit</th>
        </tr>
      </thead>

      <tbody>
        {profilesCopy
          .sort((a, b) => sort(a, b))
          .map((profile) => (
            <tr key={profile.id}>
              <td>{formatId(profile.id)}</td>
              <td>{formatId(profile.accountId)}</td>
              <td>{profile.signInMethod}</td>
              <td>{formatDate(profile.firstSignIn)}</td>
              <td>{formatDate(profile.lastVisit)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Profiles;
