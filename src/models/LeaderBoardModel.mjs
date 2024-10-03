import { DataModel } from "./DataModel.mjs";

export class LeaderBoardModel extends DataModel {
  constructor(id, state, energyPerSourceArray) {
    super(); // 부모 클래스의 생성자를 호출
    this.id = id;
    this.state = state;
    this.energyPerSourceArray = energyPerSourceArray; // energyPerSourceArray를 저장
  }


  static async deleteById(id) {
    const deletedCount = this.delete(entry => entry.id === id);
    return deletedCount; // 삭제된 항목의 수를 반환
  }

}

LeaderBoardModel.setDataSource([]);




//static 만들어진 계산한 함수의 값을 모델로 가져와서 리더보드모델에 저장.
//id, state 이미 만들어져 있으니까 static에서 가져다 쓰고
// total watts는 static에서 각각 source로 합산된 걸 불러다 쓰는거