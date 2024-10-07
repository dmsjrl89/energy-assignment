import { DataModel } from "./DataModel.mjs";

export class LeaderBoardModel extends DataModel {
  constructor(id, state, energyPerSourceArray) {
    super(); // 부모 클래스의 생성자를 호출
    this.id = id;
    this.state = state;
    this.energyPerSourceArray = energyPerSourceArray; // energyPerSourceArray를 저장
  }

  static update(id, updateData) {
    const entryIndex = this.data.findIndex(entry => entry.id === id);
  
    if (entryIndex !== -1) {
      // 기존 데이터를 업데이트
      this.data[entryIndex] = { ...this.data[entryIndex], ...updateData };
      return 1; // 업데이트된 항목의 수
    }
    return 0; // 업데이트 실패
  }
  

static async getEnergyData() {
  // 에너지원 데이터 생성
  const energyData = this.data.map(entry => ({
      state: entry.state,
      totalEnergy: entry.energyPerSourceArray.reduce((sum, source) => sum + source.total, 0) // 각 주의 총 에너지원 계산
  }));
  return energyData; // 에너지 데이터 반환
}

}

LeaderBoardModel.setDataSource([]);




//static 만들어진 계산한 함수의 값을 모델로 가져와서 리더보드모델에 저장.
//id, state 이미 만들어져 있으니까 static에서 가져다 쓰고
// total watts는 static에서 각각 source로 합산된 걸 불러다 쓰는거