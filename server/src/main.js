import { config } from "dotenv";
import server from "./app.js";
import { connectDB } from "./config/mongo.config.js";
config()

const PORT = process.env.APP_PORT || 5000

await connectDB()

server.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})