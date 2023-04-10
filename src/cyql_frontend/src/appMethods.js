// state
import store from "./State/_store";
import { setProfiles as setProfilesAction } from "./State/profiles/profiles";

const addUserToDb = async (actor, accountIdStr, signInMethod) => {
  const timestamp = Date.now();
  const profile = await actor.getProfile().catch((err) => console.log(err));

  if (profile === undefined || profile.length === 0) {
    const newProfile = {
      accountId: accountIdStr,
      firstSignIn: timestamp,
      lastVisit: timestamp,
      signInMethod,
    };
    await actor.updateProfiles(newProfile).catch((err) => console.log(err));
  } else {
    await actor
      .updateProfiles({ ...profile[0], lastVisit: timestamp }) // profile is an array [{…}]
      .catch((err) => console.log(err));
  }
};

// profiles
// const setProfiles = async (actor) => {
//   await actor
//     .getProfiles()
//     .then((res) => {
//       const profiles = [];
//       res.forEach((el) => {
//         let profile = {};
//         // bigint to num
//         for (const [key, value] of Object.entries(el[1])) {
//           if (typeof value === "bigint") {
//             profile = { ...profile, [key]: Number(value) };
//           } else {
//             profile = { ...profile, [key]: value };
//           }
//         }
//         profiles.push({ id: el[0].toText(), ...profile });
//       });
//       store.dispatch(setProfilesAction(profiles));
//     })
//     .catch((err) => console.log(err));
// };

export { addUserToDb /* setProfiles */ };
