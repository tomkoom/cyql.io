import React from "react";

// state
import { useSelector } from "react-redux";
import { selectProfiles } from "../../../State/profiles/profiles";

const Profiles = () => {
  const profiles = useSelector(selectProfiles);

  return (
    <div>
      {profiles.map((profile) => (
        <pre key={profile.id}>
          <code>{JSON.stringify(profile, null, 2)}</code>
        </pre>
      ))}
    </div>
  );
};

export default Profiles;
