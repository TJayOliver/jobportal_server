import { nanoid } from "nanoid";
import {
  saveUserLocation,
  checkIPExistence,
} from "../database/cookieDatabase.js";
import geoip from "fast-geoip";

export const obtainUserLocation = async (ip) => {
  try {
    const checkIfIPExists = await checkIPExistence(ip);
    if (checkIfIPExists.length > 0) {
      return { exits: true };
    }
    const getLocation = await geoip.lookup(ip);
    const location = {
      id: nanoid(),
      ipAddress: ip,
      country: getLocation.country,
      city: getLocation.city || getLocation.country,
    };
    const data = await saveUserLocation(location);
    if (data) {
      const country = location.country;
      return { obtained: true, country };
    }
  } catch (error) {
    console.error("obtain IP", error.message);
  }
};
