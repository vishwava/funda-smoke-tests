export const BASE_URL = "https://www.funda.nl";
export const USER_AGENT = "Enter user agent here!";

export const SITE_NAME = "funda";
export const CITY = "amsterdam";
export const BUY_IN_CITY = `/koop/${CITY}/`;
export const RENT_IN_CITY = `/huur/${CITY}/`;
export const NEWBUILD_IN_CITY = `/nieuwbouw/${CITY}/`;
export const RECREATIONAL_IN_CITY = `/recreatie/${CITY}/`;
export const SELL_KNOW_MORE = `/meer-weten/verkopen/`;
export const SELL_PRODUCTS_AND_SERVICES = `/meer-weten/producten-en-diensten/`;

export const SELL_KNOW_MORE_TITLE = "Verkopen: zo pak je het goed aan";
export const SELL_PRODUCTS_AND_SERVICES_TITLE =
  "Haal meer uit je verkoop met Funda";

export const COMPARE_AGENTS_LINK_TEXT = "Vergelijk NVM-makelaars in de buurt";
export const VIEW_STEPS_LINK_TEXT = "Bekijk de stappen";
export const CONTACT_US_LINK_TEXT = "Vertel me meer";
export const APPRAISAL_LINK_TEXT = "Doe de Waardecheck";

// Matches Dutch phone values in local and international formats
export const isValidDutchPhoneNumber = (phone: string): boolean =>
  /^tel:(\(\+\d+\)\s?)?\d[\d\s-]{8,}$/.test(phone);
