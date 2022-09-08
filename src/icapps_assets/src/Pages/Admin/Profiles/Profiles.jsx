import React from "react";
import css from "./Profiles.module.css";

// utils
import { formatPrincipal } from "../../../Utils/formatPrincipal";
import { formatDate } from "../../../Utils/format";

// state
import { useSelector } from "react-redux";
import { selectProfiles } from "../../../State/profiles/profiles";

const Profiles = () => {
  const profiles = useSelector(selectProfiles);

  return (
    <table className={css.profiles}>
      <thead>
        <tr>
          <th>id</th>
          <th>accountId</th>
          <th>signInMethod</th>
          <th>firstSignIn</th>
          <th>lastVisit</th>
        </tr>
      </thead>

      <tbody>
        {profiles.map((profile) => (
          <tr key={profile.id}>
            <td>{formatPrincipal(profile.id)}</td>
            <td>{formatPrincipal(profile.accountId)}</td>
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
