// import {
//   DataModel
// } from "./DataModel.mjs";

// import {
//   LocationModel  } from "../public/scripts/LocationModel.mjs"


// export class LeaderBoardModel extends DataModel {
//   id = ""
//   state = ""
//   totalWatts = 0

//   constructor(LocationModel, totalWatts) {
//     super();
//     this.id = LocationModel.id;  // LocationModel의 id
//     this.state = LocationModel.state;  // LocationModel의 state
//     this.totalWatts = totalWatts;
//   }
// }




import { DataModel } from "./DataModel.mjs";
import { LocationModel } from "../public/scripts/LocationModel.mjs";  // LocationModel import

export class LeaderBoardModel extends DataModel {
  id = "";
  state = "";
  totalWatts = 0;

  constructor(locationId, totalWatts) {
    super();
    // LocationModel의 인스턴스를 생성하여 id와 state를 가져옴
    const locationModelInstance = LocationModel.getById(locationId);  // LocationModel에서 id로 가져옴

    if (locationModelInstance) {
      this.id = locationModelInstance.id;       // LocationModel의 id 할당
      this.state = locationModelInstance.state; // LocationModel의 state 할당
    }

    this.totalWatts = totalWatts;
  }
}



//가져와서 리더보드모델에 저장. 리더보드모델은 백엔드에 있다. 
//id, state 이미 만들어져 있으니까 static에서 가져다 쓰고
// total watts는 static에서 각각 source로 합산된 걸 불러다 쓰는거
