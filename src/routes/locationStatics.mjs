import express from "express"
import { NationalSourcesController } from "../controllers/NationalSourcesController.mjs"


const locationStaticsRoutes = express.Router()

locationStaticsRoutes.get("/locationStaticsRoutes", NationalSourcesController.getStateListJSON)

export default locationStaticsRoutes
