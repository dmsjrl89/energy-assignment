import { DataModel } from "./DataModel.mjs";

export class NationalSourceModel extends DataModel {
    state = ""; // key - should be unique
    windProportion = 0.0;
    solarProportion = 0.0;
    gasProportion = 0.0;
    coalProportion = 0.0;

    constructor(
        state, 
        windProportion, 
        solarProportion,
        gasProportion,
        coalProportion
    ) {
        super();
        this.state = state;
        this.windProportion = windProportion;
        this.solarProportion = solarProportion;
        this.gasProportion = gasProportion;
        this.coalProportion = coalProportion;
    }

    static setDataSource(data) {
        this.dataSource = data;
    }

    static getDataSource() {
        return this.dataSource;
    }

    static getTotalWatts(value) {
        return value; // Directly return the value provided
    }

    static calculateAllSourceWatts() {
      const totalWatts = this.getTotalWatts(1000); // Use static method
      // console.log(totalWatts);
      const dataSource = this.getDataSource();
      // console.log(dataSource);

      const result = dataSource.map(nationalModel => {
          const watts = {
              wind: totalWatts * (nationalModel.windProportion / 100),
              solar: totalWatts * (nationalModel.solarProportion / 100),
              gas: totalWatts * (nationalModel.gasProportion / 100),
              coal: totalWatts * (nationalModel.coalProportion / 100)
          };
          // console.log(`Watts for ${nationalModel.state}:`, watts);
          return {
              state: nationalModel.state,
              watts
          };
      });

      console.log("Calculation result:", result);
      return result;
  }
}
// Set the data source
NationalSourceModel.setDataSource([
    new NationalSourceModel("Queensland", 12, 15, 25, 48),
    new NationalSourceModel("Victoria", 20, 22, 30, 28),
    // TODO: Add remaining states
]);
