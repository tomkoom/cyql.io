const plugAdmin1 = process.env.PLUG_ADMIN_1;
const plugAdmin2 = process.env.PLUG_ADMIN_2;
const stoicAdmin1 = process.env.STOIC_ADMIN_1;
const stoicAdmin2 = process.env.STOIC_ADMIN_2;
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const donationWallet = process.env.DONATION_WALLET;
const junoSatelliteId = process.env.JUNO_SATELLITE_ID;
const junoDatastoreCollection = process.env.JUNO_DATASTORE_COLLECTION;

export {
  // admin
  plugAdmin1,
  plugAdmin2,
  stoicAdmin1,
  stoicAdmin2,

  // recaptcha
  recaptchaSiteKey,
  recaptchaSecretKey,

  // donations
  donationWallet,

  // juno
  junoSatelliteId,
  junoDatastoreCollection,
};
