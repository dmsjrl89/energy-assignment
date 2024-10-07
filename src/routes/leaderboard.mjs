import express from "express"
import { LeaderBoardController } from "../controllers/LeaderBoardController.mjs"

const leaderBoardRoutes = express.Router()

leaderBoardRoutes.get("/leaderBoardRoutes", LeaderBoardController.getLeaderBoardListJSON)
leaderBoardRoutes.post("/leaderBoardPost", LeaderBoardController.handlePostLeaderBoard)
leaderBoardRoutes.put("/leaderBoardPost", LeaderBoardController.handlePutLeaderBoard)

export default leaderBoardRoutes