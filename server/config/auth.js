import "dotenv/config"
import passport from "passport"
import GitHubStrategy from "passport-github2"
import {pool} from './database.js'

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
}

// basically a controller for authentication but no http requests
// runs when user clicks authorize
// accessToken = to call github api (not using)
// refreshToken = token rarely used with github
// profile = github user data  
// callback =tells passport login succeeded or failed
const verify = async (accessToken, refreshToken, profile, callback) => {
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
            return callback(null, existingUser.rows[0]);
        }

        const newUser = await pool.query(
            `INSERT INTO staff_user (github_id, username, display_name, avatar_url)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [githubId, username, displayName, avatarUrl]
        );

        return callback(null, newUser.rows[0]);
    } catch (error) {
        return callback(error, null);
    }
};

passport.use(new GitHubStrategy(options, verify))

// serialize and deserialize maintain logged in user and make sure user data available on every request

// runs once at login
passport.serializeUser((user, callback) => {
    callback(null, user.user_id);
});

// runs at every request
passport.deserializeUser(async (user_id, callback) => {
    try {
        const result = await pool.query(
            "SELECT * FROM staff_user WHERE user_id = $1",
            [user_id]
        );

        callback(null, result.rows[0]);
    } catch (error) {
        callback(error, null);
    }
});

export default passport