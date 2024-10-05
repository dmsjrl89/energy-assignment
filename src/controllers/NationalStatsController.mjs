import { LeaderBoardModel } from "../models/LeaderBoardModel.mjs"

export class NationalStatsController {
    
  static getNationalStaticsJSON(req, res) {
    const nationalStats = LeaderBoardModel.getAll()
    res.status(200).json(nationalStats)
} }