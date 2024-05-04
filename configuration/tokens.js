import jwt from "jsonwebtoken";

export const retrieveToken = async (req, res, next) => {
  try {
    const cookie = req.cookies._c;
    let callCookie, country;
    if (!cookie) callCookie = true;
    const data = await verifyToken(cookie);
    if (data.error) {
      callCookie = true;
    } else {
      country = data.country;
    }
    if (callCookie) res.locals.callCookie = callCookie;
    if (country) res.locals.country = country;
    next();
  } catch (error) {
    console.error(error.message);
  }
};

export const verifyToken = async (cookie) => {
  try {
    const decoded = jwt.decode(cookie, process.env.COOKIE_KEY);
    if (decoded) {
      const country = decoded.country;
      return { country: country };
    } else {
      return { error: true };
    }
  } catch (error) {
    console.error(error.message);
  }
};
