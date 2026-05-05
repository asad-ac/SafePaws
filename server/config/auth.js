import "dotenv/config";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import { pool } from "./database.js";

const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
};

const createSanctuaryIfMissing = async (user) => {
  const sanctuaryCheck = await pool.query(
    "SELECT * FROM sanctuary WHERE user_id = $1",
    [user.user_id]
  );

  if (sanctuaryCheck.rows.length === 0) {
    await pool.query(
      `INSERT INTO sanctuary (name, address, phone, email, capacity, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        `${user.display_name || user.username || "User"}'s Sanctuary`,
        "Default Address",
        "000-000-0000",
        user.email || "default@gmail.com",
        50,
        user.user_id
      ]
    );
  }
};

const githubVerify = async (accessToken, refreshToken, profile, callback) => {
  try {
    const githubId = profile.id;
    const username = profile.username;
    const displayName = profile.displayName || profile.username;
    const avatarUrl = profile.photos?.[0]?.value || null;

    const existingUser = await pool.query(
      "SELECT * FROM staff_user WHERE github_id = $1",
      [githubId]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      await createSanctuaryIfMissing(user);
      return callback(null, user);
    }

    const newUser = await pool.query(
      `INSERT INTO staff_user (github_id, username, display_name, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [githubId, username, displayName, avatarUrl]
    );

    const user = newUser.rows[0];
    await createSanctuaryIfMissing(user);

    return callback(null, user);
  } catch (error) {
    return callback(error, null);
  }
};

const googleVerify = async (accessToken, refreshToken, profile, callback) => {
  try {
    const googleId = profile.id;
    const email = profile.emails?.[0]?.value || null;
    const displayName = profile.displayName || "Google User";
    const avatarUrl = profile.photos?.[0]?.value || null;

    const existingUser = await pool.query(
      "SELECT * FROM staff_user WHERE google_id = $1",
      [googleId]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      await createSanctuaryIfMissing(user);
      return callback(null, user);
    }

    const newUser = await pool.query(
      `INSERT INTO staff_user (google_id, email, display_name, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [googleId, email, displayName, avatarUrl]
    );

    const user = newUser.rows[0];
    await createSanctuaryIfMissing(user);

    return callback(null, user);
  } catch (error) {
    return callback(error, null);
  }
};

passport.use(new GitHubStrategy(githubOptions, githubVerify));
passport.use(new GoogleStrategy(googleOptions, googleVerify));

passport.serializeUser((user, callback) => {
  callback(null, user.user_id);
});

passport.deserializeUser(async (user_id, callback) => {
  try {
    const result = await pool.query(
      "SELECT * FROM staff_user WHERE user_id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return callback(null, false);
    }

    callback(null, result.rows[0]);
  } catch (error) {
    callback(error, null);
  }
});

export default passport;