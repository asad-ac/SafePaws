import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from "./config/auth.js"

import animalRouter from './routes/animal.js'
import sanctuaryRouter from './routes/sanctuary.js'
import sponsorRouter from './routes/sponsor.js'
import volunteerRouter from './routes/volunteer.js'
import tagRouter from './routes/tag.js'
import authRouter from './routes/auth.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL, // use client port domain and protocol
    credentials: true // allows cookies, sessions, and login state
  }))

app.use(
  session({
    secret: process.env.SESSION_SECRET, // used to sign session cookie so can't be tampered with
    resave: false, // dont save if nothing changed
    saveUninitialized: false, // dont create empty sessions
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({error: "Unauthorized"})
  }
  next();
}

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">🐾 SafePaws API</h1>')
})

app.use("/auth", authRouter)
app.use("/animals", isAuthenticated, animalRouter)
app.use("/sanctuaries", isAuthenticated, sanctuaryRouter)
app.use("/sponsors", isAuthenticated, sponsorRouter)
app.use("/volunteers", isAuthenticated, volunteerRouter)
app.use("/tags", isAuthenticated, tagRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}) 