import express from 'express'
import passport from '../config/auth.js'

const router = express.Router();

router.get('/github', passport.authenticate("github", {scope: ["user:email"]}));

// url user goes to after they login
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL);
    }
);

// current user
router.get("/me", (req, res) => {
    if (!req.user) {
        return res.status(401).json({user: null});
    }
    res.json(req.user)
});

// logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({message: "logged out"})
    });
});

export default router