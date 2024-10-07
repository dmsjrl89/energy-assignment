import { LeaderBoardModel } from "../models/LeaderBoardModel.mjs";

export class NationalStatsController {
    
    // 기존 JSON 응답 메소드
    static getNationalStaticsJSON(req, res) {
        const nationalStats = LeaderBoardModel.getAll();
        res.status(200).json(nationalStats);
    }

    // static renderNationalStatsPage(req, res) {
    //     const nationalStats = LeaderBoardModel.getAll(); // 모델에서 데이터 가져오기
    //     res.status(200).json(nationalStats);    
    //   }

}
