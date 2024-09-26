
import { NationalSourceModel } from "../models/NationalSourceModel.mjs"

export class NationalSourcesController {
    
  static getStateListJSON(req, res) {
    const nationalSource = NationalSourceModel.getAll()
    res.status(200).json(nationalSource)
} }