import { executeQuery } from "../../../configuration/mysql.config.js";

export const saveUserLocation = async (location) => {
  try {
    const query =
      "INSERT INTO userLocation (id, ipAddress, country, city) VALUES (?,?,?,?)";
    const parameter = [
      location.id,
      location.ipAddress,
      location.country,
      location.city,
    ];
    await executeQuery(query, parameter);
    return true;
  } catch (error) {
    throw error;
  }
};

export const checkIPExistence = async (ipAddress) => {
  try {
    const query = "SELECT ipAddress FROM userLocation WHERE ipAddress = ?";
    const parameter = [ipAddress];
    const data = await executeQuery(query, parameter);
    return data;
  } catch (error) {
    throw error;
  }
};
