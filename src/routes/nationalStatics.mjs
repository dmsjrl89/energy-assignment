import express from "express"
import { NationalStatsController } from "../controllers/NationalStatsController.mjs"

const nationalStaticsRoutes = express.Router()

nationalStaticsRoutes.get("/nationalStaticsRoutes", NationalStatsController.getNationalStaticsJSON)
// nationalStaticsRoutes.get("/nationalStaticsRoutes", NationalStatsController.renderNationalStatsPage)


export default nationalStaticsRoutes