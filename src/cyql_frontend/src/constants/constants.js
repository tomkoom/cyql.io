const iiAdmin1 = process.env.II_ADMIN_1;
const iiAdmin2 = process.env.II_ADMIN_2;
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const donationWallet = process.env.DONATION_WALLET;

// juno
const junoSatelliteId = process.env.JUNO_SATELLITE_ID;
const junoCollectionProjects = process.env.JUNO_COLLECTION_PROJECTS;
const junoCollectionSubmittedProjects = process.env.JUNO_COLLECTION_SUBMITTED_PROJECTS;

export {
  // admin
  iiAdmin1,
  iiAdmin2,

  // recaptcha
  recaptchaSiteKey,
  recaptchaSecretKey,

  // donations
  donationWallet,

  // juno
  junoSatelliteId,
  junoCollectionProjects,
  junoCollectionSubmittedProjects,
};
