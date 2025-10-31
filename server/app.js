import express from 'express'
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import DBconnection from './DBConnection.js'
import bookingRoute from './Routes/bookingRoute.js'
import experienceRoute from './Routes/experienceRoute.js'
import promoRoute from './Routes/promoRoute.js'


dotenv.config()

const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/experiences", experienceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/promo", promoRoute);

DBconnection()

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})