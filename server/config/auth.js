import passport from "passport"
import GitHubStrategy from "passport-github2"

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
}

const verify = (accessToken, refreshToken, profile, callback) => {
    return callback(null, profile)
}

passport.use(new GitHubStrategy(options, verify))

// runs when user logs in
passport.serializeUser((user, callback) => {
    callback(null, user)
})

// runs on every request after login
passport.deserializeUser((user, callback) => {
    callback(null, user)
})

export default passport