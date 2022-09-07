const addUserToDb = async (actor, principalId, principalIdStr, accountId, signInMethod) => {
  const timestamp = Date.now();
  const profile = await actor.getProfile().catch((err) => console.log(err));

  if (profile.length === 0) {
    const newProfile = {
      principalIdStr,
      accountId,
      firstSignIn: timestamp,
      lastSignIn: timestamp,
      signInMethod,
    };
    await actor.updateProfiles(principalId, newProfile).catch((err) => console.log(err));
  } else {
    await actor
      .updateProfiles(principalId, { ...profile[0], lastSignIn: timestamp }) // profile is an array [{…}]
      .catch((err) => console.log(err));
  }
};

export { addUserToDb };
