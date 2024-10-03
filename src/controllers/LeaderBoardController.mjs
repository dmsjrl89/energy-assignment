import {
  LeaderBoardModel
} from "../models/LeaderBoardModel.mjs";

export class LeaderBoardController {
  //get all JASON
  static getLeaderBoardListJSON(req, res) {
    const leaderBoard = LeaderBoardModel.getAll();
    res.status(200).json(leaderBoard);
  }

  //Handle post
  static handlePostLeaderBoard(req, res) {
    try {
      //receive the data from client
      const locationData = req.body;

      const {
        id,
        state,
        energyPerSourceArray
      } = locationData;

      // LeaderBoardModel instance
      const leaderboardEntry = new LeaderBoardModel(id, state, energyPerSourceArray);


      // received locationData add to leaderbaord Model
      LeaderBoardModel.insert([leaderboardEntry]);

      console.log("Received location data for leaderboard:", leaderboardEntry);

      // bring the data from the leaderboard
      const leaderboardData = LeaderBoardModel.getAll();


      res.status(200).json({
        message: "Location data successfully posted to the leaderboard",
        location: locationData,
      });
    } catch (error) {
      console.error("Error posting leaderboard data:", error);
      res.status(500).json({
        message: "Failed to post leaderboard data"
      });
    }
  }


  /*
  백엔드의 리더보드 컨트롤러에 있는 이 함수는 프론트엔드에서 전달된 데이터를 처리하고, 
  서버에 저장, 처리된 데이터를 기반으로 페이지에서 나중에 데이터를 확인할수 있게 만듬.
  리더보드에 저장하는 역할을 합니다.
  이 함수는 리더보드에 데이터를 업데이트하고, 이를 백엔드 데이터베이스나 메모리에 저장하는 중요한 역할을 합니다.
*/

  //Delete button
  static deleteButtonLeaderBoard() {}
}