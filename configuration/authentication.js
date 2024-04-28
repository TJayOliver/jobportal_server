import passport from "passport";
import { Strategy } from "passport-local";
import administratorDatabase from "../src/admin/database/administratorDatabase.js";
import bcrypt from "bcrypt";

const database = new administratorDatabase();

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const checkUsername = await database.getAdminByUsername(username);
      const user = checkUsername[0];
      if (!user) return done(null, false);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return done(null, false);
      return done(null, user);
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
    const user = await database.getAdminByID(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
