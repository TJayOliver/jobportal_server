import { obtainUserLocation } from "../service/cookieService.js";
import jwt from "jsonwebtoken";

const userConsent = async (req, res) => {
  const { response } = req.body;
  const ip =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    if (response === "OK") {
      const getUserLocation = await obtainUserLocation(ip);
      if (getUserLocation && getUserLocation.exits) {
        return res.status(201).json({ status: true, message: "User Exists" });
      }
      if (getUserLocation && getUserLocation.obtained) {
        const country = getUserLocation.country;
        const token = jwt.sign({ country: country }, process.env.COOKIE_KEY, {
          expiresIn: "1yr",
        });
        res.cookie("_c", token, {
          maxAge: 31536000000,
          httpOnly: true,
          sameSite: "strict",
        });
        return res
          .status(201)
          .json({ status: true, message: "User Accepted Cookie" });
      } else {
        return res.status(201).json({ status: false });
      }
    } else {
      return res
        .status(200)
        .json({ status: false, message: "User Rejected Cookie" });
    }
  } catch (error) {
    console.error("cookie:{controller}", error.message);
  }
};

export default userConsent;
