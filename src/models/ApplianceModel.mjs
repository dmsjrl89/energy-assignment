import {
  DataModel
} from "./DataModel.mjs";

export class ApplianceModel extends DataModel {
  name = ""; // key - should be unique
  watts = 0;

  constructor(name, watts) {
    super()
    this.name = name
    this.watts = watts
  }
}

ApplianceModel.setDataSource([
  new ApplianceModel("Refrigerator", 100),
  new ApplianceModel("Air Conditioner", 350),
  new ApplianceModel("Heater", 1500),
  new ApplianceModel("Washing Machine", 500),
  new ApplianceModel("Lamp", 60),
  new ApplianceModel("Computer", 200),
  new ApplianceModel("Dryer", 3000),
  new ApplianceModel("Oven", 2150),
  new ApplianceModel("Toaster", 800),
  new ApplianceModel("Coffee Maker", 900),
  new ApplianceModel("Television", 100),
  new ApplianceModel("Dishwasher", 1800),
  new ApplianceModel("Microwave", 1000),
])


// console.log(ApplianceModel.setDataSource());


