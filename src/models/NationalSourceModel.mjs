import { DataModel } from "./DataModel.mjs";

export class NationalSourceModel extends DataModel {
    state = ""; // key - should be unique
    wind = 0.0;
    solar = 0.0;
    gas = 0.0;
    coal = 0.0;

    constructor(
        state, 
        wind, 
        solar,
        gas,
        coal
    ) {
        super();
        this.state = state;
        this.wind = wind;
        this.solar = solar;
        this.gas = gas;
        this.coal = coal;
    }
}


NationalSourceModel.setDataSource([
  new NationalSourceModel("New South Wales", 12, 15, 25, 48),
  new NationalSourceModel("Victoria", 20, 22, 30, 28),
  new NationalSourceModel("Queensland", 10, 20, 25, 45),
  new NationalSourceModel("Western Australia", 15, 20, 35, 30),
  new NationalSourceModel("South Australia", 40, 30, 20, 10),
  new NationalSourceModel("Tasmania", 60, 20, 10, 10),
  new NationalSourceModel("Australian Capital Territory", 30, 40, 20, 10),
  new NationalSourceModel("Northern Territory", 20, 30, 40, 10)
]);
