import express from "express"
import { LocationStatsController } from "../public/scripts/LocationStatsController.mjs"


console.log("server")
const locationStaticsRoutes = express.Router()

// locationStaticsRoutes.get("/locationStaticsRoutes", LocationStatsController.getStateListJSON)

export default locationStaticsRoutes