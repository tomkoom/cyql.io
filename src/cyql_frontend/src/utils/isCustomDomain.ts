import { APP_ALTERNATIVE_ORIGIN } from "@/constants/constants";
export const isCustomDomain = (): boolean => {
  console.log(
    "location.origin === APP_ALTERNATIVE_ORIGIN",
    location.origin === APP_ALTERNATIVE_ORIGIN
  );
  return location.origin === APP_ALTERNATIVE_ORIGIN;
};
