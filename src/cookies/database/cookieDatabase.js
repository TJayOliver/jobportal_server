import { userLocationModel } from "../../../schema/mongoSchema.js";

export const saveUserLocation = async (location) => {
  try {
    const { ipAddress, country, city } = location;
    const details = { ipAddress, country, city };
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
