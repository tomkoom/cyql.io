const addUserToDb = async (actor, principalIdStr, accountId, signInMethod) => {
  const timestamp = Date.now();
  const profile = await actor.getProfile().catch((err) => console.log(err));

  if (profile.length === 0) {
    const newProfile = {
      principalIdStr,
      accountId,
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

export { addUserToDb };
