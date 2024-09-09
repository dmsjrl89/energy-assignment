import express from "express"
import { ApplianceController } from "../controllers/ApplianceController.mjs"

const applianceRoutes = express.Router()

// applianceRoutes.get("/", ApplianceController.viewApplianceList)
applianceRoutes.get("/applianceRoutes", ApplianceController.getApplianceListJSON)

export default applianceRoutes