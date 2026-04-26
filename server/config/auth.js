import passport from "passport"
import GitHubStategy from "passport-github2"

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
}

const verify = (accessToken, refreshToken, profile, callback) => {
    return callback(null, profile)
}

p