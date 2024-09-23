import { ApplianceModel } from "../models/ApplianceModel.mjs";


export class ApplianceController {
    
  static getApplianceListJSON(req, res) {
    const appliance = ApplianceModel.getAll()
    res.status(200).json(appliance)
} 
}