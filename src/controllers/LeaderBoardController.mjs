import { LeaderBoardModel } from "../models/LeaderBoardModel.mjs";

export class LeaderBoardController {
  //get all JASON
  static getLeaderBoardListJSON(req, res) {
    const leaderBoard = LeaderBoardModel.getAll();
    res.status(200).json(leaderBoard);
  }

  //Handle post
  static handlePostLeaderBoard(req, res) {
    try {
      const locationData = req.body;
      LeaderBoardModel.insert(locationData);
      
      const leaderboardData = LeaderBoardModel.getAll();

      // 여기서 locationData를 저장하거나 처리하는 로직을 추가합니다.
      // 예를 들어, 데이터베이스에 저장하거나 특정 계산을 수행할 수 있습니다.
      console.log("!!!!!!!!");
      console.log("Received location data for leaderboard:", leaderboardData);

      // 데이터를 성공적으로 처리했다면 클라이언트에 응답
      res.status(200).json({
        message: "Location data successfully posted to the leaderboard",
        location: locationData,
      });
    } catch (error) {
      console.error("Error posting leaderboard data:", error);
      res.status(500).json({ message: "Failed to post leaderboard data" });
    }
  }

  //Delete button
  static deleteButtonLeaderBoard() {}
}
