import express from "express"
import { LeaderBoardController } from "../controllers/LeaderBoardController.mjs"

const leaderBoardRoutes = express.Router()

leaderBoardRoutes.get("/leaderBoardRoutes", LeaderBoardController.getLeaderBoardListJSON)
leaderBoardRoutes.post("/leaderBoardPost", LeaderBoardController.handlePostLeaderBoard)

export default leaderBoardRoutes