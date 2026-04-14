import express from 'express'
import cors from 'cors'

import animalRouter from './routes/animal.js'
import sanctuaryRouter from './routes/sanctuary.js'
import sponsorRouter from './routes/sponsor.js'
import volunteerRouter from './routes/volunteer.js'
import tagRouter from './routes/tag.js'

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ SafePaws API</h1>')
})

app.use("/animals", animalRouter)
app.use("/sanctuary", sanctuaryRouter)
app.use("/sponsors", sponsorRouter)
app.use("/volunteers", volunteerRouter)
app.use("/tags", tagRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})