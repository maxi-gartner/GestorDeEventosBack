import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import authService from "../../services/authService.js";
import dotenv from "dotenv";

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const fn = async (payload, done) => {
  try {
    const user = await authService.getUserByEmail(payload.email);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

export default passport.use(new Strategy(options, fn));
