import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import db from "../src/models/index.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * @param {object} payload - The decoded JWT payload.
 * @param {function} done - A callback function that Passport uses.
 */
const jwtVerify = async (payload, done) => {
  try {
    const user = await db.User.findByPk(payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
