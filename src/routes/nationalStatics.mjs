import express from "express"
import { NationalStatsController } from "../controllers/NationalStatsController.mjs"

const nationalStaticsRoutes = express.Router()

nationalStaticsRoutes.get("/nationalStaticsRoutes", NationalStatsController.getNationalStaticsJSON)

export default nationalStaticsRoutes