import { userLocationModel } from "../../../schema/mongoSchema.js";

export const saveUserLocation = async (location) => {
  try {
    const { id, ipAddress, country, city } = location;
    const details = { id, ipAddress, country, city };
    const userLocation = await userLocationModel.create(details);
    return true;
  } catch (error) {
    throw error;
  }
};

export const checkIPExistence = async (ipAddress) => {
  try {
    const data = await userLocationModel
      .find({ ipAddress: ipAddress })
      .select({ ipAddress: 1 });
    return data;
  } catch (error) {
    throw error;
  }
};
