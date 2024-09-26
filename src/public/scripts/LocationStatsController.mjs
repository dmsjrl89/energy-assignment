import { LocationModel } from "./LocationModel.mjs";

export class LocationStatsController {
  static locationId = "";
  static applianceLists = [];

  static {
    //Setup event listeners here
    document.getElementById("back-button").addEventListener("click", () => {
      this.backButton();
    });

    // Trigger initial load and render here
    this.renderLocationName();
    // this.renderNationalSource()
    // this.addApplianceWatts()
    console.log("Hello");
    //console.log(this.calculateEnergyPerSource("Home"));
  }

  static backButton() {
    window.location = "/views/location_list.html";
  }

  static async renderEnergyperSource(stateName) {
    try {
      const response = await fetch("/location/locationStaticsRoutes");
      const nationalSources = await response.json();
      const nationalSource = nationalSources.find((e) => e.state == stateName);
      return nationalSource;
    } catch (error) {
      console.error("Failed to load appliances:", error);
    }
  }

  static async renderLocationName() {
    // 이전 페이지에서 저장한 location ID 가져오기
    const locationId = localStorage.getItem("selectedLocationId");

    if (locationId) {
      const location = LocationModel.getById(locationId);

      if (location) {
        const locationRenderList = document.getElementById(
          "location-stats-name"
        );
        locationRenderList.innerHTML = "";

        const applianceItem = document.createElement("li");

        const locationStatsName = document.createElement("p");
        locationStatsName.innerText = location.name;
        applianceItem.appendChild(locationStatsName);

        locationRenderList.appendChild(applianceItem);

        const locationStatsWatts = document.createElement("p");
        // 에너지 정책 그냥 불러와서 우선 넣어보기
        locationStatsWatts.innerText = JSON.stringify(
          await this.calculateEnergyPerSource(locationId)
        ); //location.energyPerSource;
        applianceItem.appendChild(locationStatsWatts);

        locationRenderList.appendChild(applianceItem);
      }
    }
  }

  // static renderNationalSource() {

  //   let nationalSources = []

  //   nationalSources = fetch("/location/locationStaticsRoutes")
  //   then(response => response.json())
  //     .then(nationalSources => {

  //       const sourceSelect = document.getElementById("location-stats-name")

  //       sourceSelect.innerHTML = ""
  //       for (const nationalSource of nationalSources) {
  //         const applianceItem = document.createElement("li");

  //         const applianceWatts = document.createElement("p");
  //         applianceWatts.innerText = nationalSource.name;
  //         applianceItem.appendChild(applianceWatts);

  //         locationRenderList.appendChild(applianceItem);

  //       }
  //     })
  // }
  // example: this.calculateEnergyPerSource("Home");
  static async calculateEnergyPerSource(locationId) {
    let results = [];
    // 로컬스토리지 아이디로 가전제품 정보들 가져오기
    const locationNameArray = LocationModel.getById(locationId);
    //const locationNameArray = LocationModel.getByName(name);
    // 가전제품 배열 : 이름이 들고있는 가전제품 배열 순회하기
    let appliances = locationNameArray["appliances"];
    // 지역 이름으로 지역 에너지 정책 가져오기
    const stateName = locationNameArray.state;

    const nationalSources = await this.renderEnergyperSource(stateName);
    // watts랑 에너지 정책으로 계산
    appliances.forEach((appliance) =>
      results.push(this.nameByEnergySource(appliance.watts, nationalSources))
    );
    return results;
  }

  static nameByEnergySource(watts, nationalSource) {
    let result = {};
    let totalEnergy = 0;
    totalEnergy += parseInt(watts);
    result = {
      wind: totalEnergy * (Number(nationalSource.wind) / 100),
      solar: totalEnergy * (Number(nationalSource.solar) / 100),
      gas: totalEnergy * (Number(nationalSource.gas) / 100),
      coal: totalEnergy * (Number(nationalSource.coal) / 100),
    };

    return result;
  }
}

//totals used from each source in watt hours. -> state이름을 연결하고,
// getTotalRunningHours 끌어다 쓴다?  이게 토탈.
// static totalCalculation() {
// fetch array (getTotalRunningHours) = totalEnergy}

// render statics 창에는 location name이 나오고
//a visualization of the division of energy used from different sources
// 이게 source 각각 그래프로 나타내는거.

// location stats 페이지에서 appliances는 렌더링이 아니라
// location model에 있는 리스트 불러와서 watts값 가져와서 계산하는거.
// 계산한 값을 statics 페이지에 렌더링 하는거.
