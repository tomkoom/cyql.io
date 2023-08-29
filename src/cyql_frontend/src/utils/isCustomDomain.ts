import { APP_ALTERNATIVE_ORIGIN } from "@/constants/constants";
export const isCustomDomain = () => {
  console.log(location.origin);
  console.log(APP_ALTERNATIVE_ORIGIN);
  location.origin === APP_ALTERNATIVE_ORIGIN;
};
