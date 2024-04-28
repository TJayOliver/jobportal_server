import { nanoid } from "nanoid";
import {
  saveUserLocation,
  checkIPExistence,
} from "../database/cookieRouterDatabase.js";
import geoip from "fast-geoip";

export const obtainUserLocation = async (ip) => {
  try {
    const ip = `${ip}`;
    const checkIfIPExists = await checkIPExistence(ip);
    if (checkIfIPExists.length > 0) {
      return { exits: true };
    }
    const getLocation = await geoip.lookup(ip);
    console.log("here", getLocation);
    const location = {
      id: nanoid(),
      ipAddress: ip,
      country: getLocation.country,
      city: getLocation.city,
    };
    // const location = {
    //   id: nanoid(),
    //   ipAddress: ip,
    //   country: "Ghana",
    //   city: "Sunyani",
    // };
    const data = await saveUserLocation(location);
    if (data) {
      const country = location.country;
      return { obtained: true, country };
    }
  } catch (error) {
    console.error("obtain IP", error.message);
  }
};
