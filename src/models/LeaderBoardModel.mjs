import { DataModel } from "./DataModel.mjs";

export class LeaderBoardModel extends DataModel {
  id = "";
  state = "";
  energySource = {
    wind : 0.0,
    solar : 0.0,
    gas : 0.0,
    coal : 0.0,
  }
  constructor(id, state, energySource) {
    super();
    this.id = id; // LocationModel의 id
    this.state = state; // LocationModel의 state
    this.energySource = energySource;
  }
}

LeaderBoardModel.setDataSource([
  new LeaderBoardModel("id", "state", {
    wind: 12,
    solar: 15,
    gas: 25,
    coal: 48
  }),
]);

//가져와서 리더보드모델에 저장. 리더보드모델은 백엔드에 있다.
//id, state 이미 만들어져 있으니까 static에서 가져다 쓰고
// total watts는 static에서 각각 source로 합산된 걸 불러다 쓰는거
