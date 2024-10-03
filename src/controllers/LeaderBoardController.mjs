<<<<<<< HEAD
import {
  LeaderBoardModel
} from "../models/LeaderBoardModel.mjs";
=======
import { LeaderBoardModel } from "../models/LeaderBoardModel.mjs";
>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f

export class LeaderBoardController {
  //get all JASON
  static getLeaderBoardListJSON(req, res) {
    const leaderBoard = LeaderBoardModel.getAll();
    res.status(200).json(leaderBoard);
  }

  //Handle post
  static handlePostLeaderBoard(req, res) {
    try {
<<<<<<< HEAD
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


=======
      const locationData = req.body;
      LeaderBoardModel.insert(locationData);
      
      const leaderboardData = LeaderBoardModel.getAll();

      // 여기서 locationData를 저장하거나 처리하는 로직을 추가합니다.
      // 예를 들어, 데이터베이스에 저장하거나 특정 계산을 수행할 수 있습니다.
      console.log("!!!!!!!!");
      console.log("Received location data for leaderboard:", leaderboardData);

      // 데이터를 성공적으로 처리했다면 클라이언트에 응답
>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f
      res.status(200).json({
        message: "Location data successfully posted to the leaderboard",
        location: locationData,
      });
    } catch (error) {
      console.error("Error posting leaderboard data:", error);
<<<<<<< HEAD
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

=======
      res.status(500).json({ message: "Failed to post leaderboard data" });
    }
  }

>>>>>>> 7b4100066a4af4d2eaa33580ac93f6c15049325f
  //Delete button
  static deleteButtonLeaderBoard() {}
}
