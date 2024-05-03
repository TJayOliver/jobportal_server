import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { adminModel } from "../schema/mongoSchema.js";

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const checkUsername = await adminModel.findOne({ username: username });
      if (!checkUsername) return done(null, false);
      const passwordMatch = await bcrypt.compare(
        password,
        checkUsername.password
      );
      if (!passwordMatch) return done(null, false);
      return done(null, checkUsername);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await adminModel.findOne({ id: id });
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
